package it.reply.shaolin.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import it.reply.shaolin.client.Bit2WinClient;
import it.reply.shaolin.client.SfdcClient;
import it.reply.shaolin.controller.dto.Cart;
import it.reply.shaolin.controller.dto.MobileOffer;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@RestController
public class CartController {
  public static final String URL ="https://fastweb01--cpqdevpro2--ne.cs88.visual.force.com/apex/NewConfiguration?ordId=ORDER_ID";

  private static final Logger logger = LogManager.getLogger(CartController.class);

  @Value("${fixedCategoryId}")
  private String fixedCategoryId;

  @Value("${mobileCategoryId}")
  private String mobileCategoryId;

  @Value(value = "classpath:retrive_items.json")
  private Resource retriveItems;

  @Value(value = "classpath:upsert_items.json")
  private Resource upsertItems;

  @Value(value = "classpath:cart_checkout.json")
  private Resource cartCheckout;


  @RequestMapping(path = "/cart", method = RequestMethod.POST)
  public ResponseEntity<?> checkout(@RequestBody final Cart cart) throws IOException {

    logger.info("Received new request: " + cart);

    // Do first retriveItem to get sessionsId
    final Bit2WinClient client = new Bit2WinClient("https://herokudme2restservice.herokuapp.com/");
    client.generateToken("ftw_delta_cpqdev4", "ftw_delta_cpqdev4", "ftw_delta_cpqdev4");

    final JsonNode payloadFixed = buildRetriveItemRequest(fixedCategoryId);
    final JsonNode responseFixed = client.retriveItems(payloadFixed);

    // Do first upsertItem for fixed line offer
    final JsonNode req1 = buildUpsertItemRequest(fixedCategoryId, cart.getFixedOfferName(),
        responseFixed);
    final JsonNode respFix =  client.upsertItems(req1);

    final JsonNode payloadMobile = buildRetriveItemRequest(mobileCategoryId);
    final JsonNode responseMobile = client.retriveItems(payloadMobile);

    // Do second upsertItem for mobile line offer
    final JsonNode req2 = buildUpsertItemRequest(mobileCategoryId, cart.getMobileOfferList(),
        responseMobile);
    final JsonNode respMobile = client.upsertItems(req2);

    final SfdcClient sfdcClient = new SfdcClient();
    sfdcClient.login();

    final String orderId = sfdcClient.cartCheckout(responseFixed.path("sessionInfo").get("Id").asText(),
        buildCart(respMobile.path("cart")));

    final String URI_CPQ = URL.replace("ORDER_ID", orderId);

    return buildResponse(URI_CPQ);
  }
  
  
  

  private JsonNode buildCart(final JsonNode cart) throws IOException {
    final ObjectMapper objectMapper = new ObjectMapper();
    final JsonNode rootNode = objectMapper
        .readTree(cartCheckout.getInputStream());

    //set categoryId
    final JsonNode cartCheckOut = rootNode.path("cartCheckOut");
    ((ObjectNode) cartCheckOut).put("cart", cart);

    return rootNode;
  }

  private JsonNode buildUpsertItemRequest(final String categoryId,
      final List<MobileOffer> optionalMobileOfferItemCode,
      JsonNode responseMobile) throws IOException {
    final ObjectMapper objectMapper = new ObjectMapper();
    final JsonNode rootNode = objectMapper
        .readTree(upsertItems.getInputStream());

    //set categoryId
    final JsonNode upsertItems = rootNode.path("upsertItems");
    ((ObjectNode) upsertItems).put("categoryId", categoryId);

    final ArrayNode itemsToAddNodeList = JsonNodeFactory.instance.arrayNode();
    optionalMobileOfferItemCode.stream().forEach(x -> {

      final String itemCode = getItemCode(x.getOfferName(), responseMobile);

      final ObjectNode node = JsonNodeFactory.instance.objectNode();
      node.putArray("listOfAttributes");

      final ObjectNode fields = JsonNodeFactory.instance.objectNode();
      fields.put("itemCode", itemCode);
      fields.put("qty", x.getQuantity());
      fields.put("addAndConfigure", "true");
      node.put("fields", fields);

      itemsToAddNodeList.add(node);
    });
    ((ObjectNode) upsertItems).put("itemsToAdd", itemsToAddNodeList);

    return rootNode;
  }


  private JsonNode buildUpsertItemRequest(final String categoryId, String offerName,
      JsonNode responseFixed)
      throws IOException {

    final String itemCode = getItemCode(offerName, responseFixed);

    final ObjectMapper objectMapper = new ObjectMapper();
    final JsonNode rootNode = objectMapper
        .readTree(upsertItems.getInputStream());

    //set categoryId
    final JsonNode upsertItems = rootNode.path("upsertItems");
    ((ObjectNode) upsertItems).put("categoryId", categoryId);

    final JsonNode listOfItems = upsertItems.get("itemsToAdd");
    for (Iterator<JsonNode> i = listOfItems.elements(); i.hasNext(); ) {
      JsonNode e = i.next();    //Get the element
      JsonNode fields = e.get("fields");
      ((ObjectNode) fields).put("itemCode", itemCode);
    }

    return rootNode;
  }

  private String getItemCode(String offerName, JsonNode node) {
    final JsonNode cart = node.get("listOfItems");
    Iterator<JsonNode> elements = cart.elements();
    //JsonNode items = rootNode.get("items");

    while (elements.hasNext()) {
      JsonNode items = elements.next();
      JsonNode fields = items.get("fields");
      if (fields.get("cartDescription") != null) {
        if (fields.get("cartDescription").asText().equals(offerName)) {
          return fields.get("itemCode").asText();
        }
      }

    }

    return "";
  }

  private JsonNode buildRetriveItemRequest(final String categoryId) throws IOException {

    final ObjectMapper objectMapper = new ObjectMapper();
    final JsonNode rootNode = objectMapper
        .readTree(retriveItems.getInputStream());

    //set categoryId
    final JsonNode retrieveItems = rootNode.path("retrieveItems");
    ((ObjectNode) retrieveItems).put("categoryId", categoryId);

    return rootNode;
  }

  private ResponseEntity<?> buildResponse(final String url) {
    return ResponseEntity.ok(url);
  }

}
