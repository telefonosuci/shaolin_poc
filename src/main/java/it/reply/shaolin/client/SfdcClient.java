package it.reply.shaolin.client;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class SfdcClient {

  private static final String LOGINURL = "https://fastweb01--cpqdevpro2.cs88.my.salesforce.com/";
  private static final String GRANTTYPE = "services/oauth2/token?grant_type=password";
  private static final String CLIENTID =
      "3MVG9lcxCTdG2VbtPPwuPfhAscw1yWmT8VPdsr6zfoRacbeu6GX4bsNJLyZL4VzQByYZmz1gTXWnolBOQeqgk";
  private static final String CLIENTSECRET = "5382993648004760525";
  private static final String USERID = "e.spini@reply.it.cpqdevpro2";
  private static final String PASSWORD = "elena92spini";
  private static final String ACCESSTOKEN = "access_token";

  private String token = "";

  public void login() throws IOException {

    HttpClient httpclient = HttpClientBuilder.create().build();

    String loginURL = LOGINURL + GRANTTYPE + "&client_id=" + CLIENTID + "&client_secret="
        + CLIENTSECRET + "&username=" + USERID + "&password=" + PASSWORD;

    final HttpPost httpPost = new HttpPost(loginURL);

    HttpResponse httpResponse = null;

    try {
      httpResponse = httpclient.execute(httpPost);
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    final int statusCode = httpResponse.getStatusLine().getStatusCode();
    if (statusCode != HttpStatus.SC_OK) {
      System.out.println("Error authenticating to Salesforce.com platform: " + statusCode);

    }

    String httpMessage = null;
    try {
      httpMessage = EntityUtils.toString(httpResponse.getEntity());
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode jsonNode = objectMapper.readTree(httpMessage);
      this.token = jsonNode.get(ACCESSTOKEN).asText();

    } catch (Exception jsonException) {
      jsonException.printStackTrace();
    } finally {

      httpPost.releaseConnection();
    }

  }

  public String cartCheckout(final String sessionId, JsonNode cart)
      throws IOException {
    final String URI = "services/apexrest/NE/CartCheckout";

    final String url = String.format("%s%s", LOGINURL, URI);
    final HttpClient httpclient = HttpClientBuilder.create().build();

    final HttpPost httpPost = new HttpPost(url);
    httpPost.addHeader("Authorization", "OAuth " + this.token);
    httpPost.addHeader("Content-Type", "application/json");

    final JsonNode sessionInfo = cart.path("cartCheckOut").get("sessionInfo");
    ((ObjectNode) sessionInfo).put("Id", sessionId);

    httpPost.setEntity(new StringEntity(cart.toString(), ContentType.APPLICATION_JSON));

    HttpResponse httpResponse = null;

    try {
      httpResponse = httpclient.execute(httpPost);
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    final int statusCode = httpResponse.getStatusLine().getStatusCode();
    if (statusCode != HttpStatus.SC_OK) {
      System.out.println("Error authenticating to Salesforce.com platform: " + statusCode);
    }

    String httpMessage = null;
    try {
      httpMessage = EntityUtils.toString(httpResponse.getEntity());

      final JsonFactory factory = new JsonFactory();
      final JsonParser parser = factory.createParser(httpMessage);

      while (!parser.isClosed()) {
        JsonToken jsonToken = parser.nextToken();

        if (JsonToken.FIELD_NAME.equals(jsonToken)) {
          String fieldName = parser.getCurrentName();
          jsonToken = parser.nextToken();

          if ("Id".equals(fieldName)) {
            return parser.getValueAsString();
          }
        }
      }

    } catch (IOException ioException) {
      ioException.printStackTrace();
    } finally {

      httpPost.releaseConnection();
    }

    return null;
  }

}
