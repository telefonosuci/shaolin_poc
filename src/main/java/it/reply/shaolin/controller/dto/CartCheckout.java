package it.reply.shaolin.controller.dto;

public class CartCheckout {

  private String errorCode;
  private String errorMessage;
  private Cart cart;

  public CartCheckout() {
  }

  public String getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(String errorCode) {
    this.errorCode = errorCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public Cart getCart() {
    return cart;
  }

  public void setCart(Cart cart) {
    this.cart = cart;
  }

  @Override
  public String toString() {
    return "CartCheckout{" +
        "errorCode='" + errorCode + '\'' +
        ", errorMessage='" + errorMessage + '\'' +
        ", cart=" + cart +
        '}';
  }
}
