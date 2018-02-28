package it.reply.shaolin.controller.dto;

public class MobileOffer {

  private String offerName;
  private Integer quantity;

  public String getOfferName() {
    return offerName;
  }

  public void setOfferName(String offerName) {
    this.offerName = offerName;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

    @Override
    public String toString() {
        return "MobileOffer{" +
                "offerName='" + offerName + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
