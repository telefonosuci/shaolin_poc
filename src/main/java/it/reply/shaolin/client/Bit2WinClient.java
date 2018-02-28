package it.reply.shaolin.client;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;


public class Bit2WinClient {

  private String serverUrl;
  private String token;
  private String password;

  private String sessionId;


  public Bit2WinClient(final String serverUrl) {
    this.serverUrl = serverUrl;
  }

  public void generateToken(final String usertoken, final String passwordToken,
      final String password) {

    final String URI = "/bit2winapis/generateToken?json=true";

    final String url = String.format("%s%s", this.serverUrl, URI);
    final HttpClient httpclient = HttpClientBuilder.create().build();

    final HttpPost httpPost = new HttpPost(url);
    httpPost.addHeader("usertoken", usertoken);
    httpPost.addHeader("passwordToken", passwordToken);
    httpPost.addHeader("password", password);
    this.password = password;

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

          if ("token".equals(fieldName)) {
            this.token = parser.getValueAsString();
          }
        }
      }

    } catch (IOException ioException) {
      ioException.printStackTrace();
    } finally {

      httpPost.releaseConnection();
    }
  }


  public JsonNode retriveItems(final JsonNode payload) throws IOException {
    final String URI = "/bit2winapis/RetrieveItems";

    final String url = String.format("%s%s", this.serverUrl, URI);
    final HttpClient httpclient = HttpClientBuilder.create().build();

    final HttpPost httpPost = new HttpPost(url);
    httpPost.addHeader("token", this.token);
    httpPost.addHeader("password", password);
    httpPost.addHeader("Content-Type", "application/json");

    if (this.sessionId != null) {
      final JsonNode sessionInfo = payload.path("retrieveItems").get("sessionInfo");
      ((ObjectNode) sessionInfo).put("Id", this.sessionId);
    }

    httpPost.setEntity(new StringEntity(payload.toString()));

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
    final ObjectMapper objectMapper = new ObjectMapper();
    final JsonNode rootNode = objectMapper
        .readTree(EntityUtils.toString(httpResponse.getEntity()));

    this.sessionId = rootNode.path("sessionInfo").get("Id").asText();

    return rootNode;

  }

  public JsonNode upsertItems(final JsonNode payload) throws IOException {
    final String URI = "/bit2winapis/UpsertItems";

    final String url = String.format("%s%s", this.serverUrl, URI);
    final HttpClient httpclient = HttpClientBuilder.create().build();

    final HttpPost httpPost = new HttpPost(url);
    httpPost.addHeader("token", this.token);
    httpPost.addHeader("password", this.password);
    httpPost.addHeader("Content-Type", "application/json");

    //set sessionInfo
    final JsonNode sessionInfo = payload.path("upsertItems").get("sessionInfo");
    ((ObjectNode) sessionInfo).put("Id", this.sessionId);

    httpPost.setEntity(new StringEntity(payload.toString()));
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


    } catch (IOException ioException) {
      ioException.printStackTrace();
    } finally {
      httpPost.releaseConnection();
    }
    final ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.readTree(httpMessage);
  }

  public String getSessionId() {
    return sessionId;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }
}
