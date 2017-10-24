package it.reply.shaolin.controller.dto;

import java.util.List;

public class Cart {

  private String fixedOfferName;
  private List<MobileOffer> mobileOfferList;

  public String getFixedOfferName() {
    return fixedOfferName;
  }

  public void setFixedOfferName(String fixedOfferName) {
    this.fixedOfferName = fixedOfferName;
  }

  public List<MobileOffer> getMobileOfferList() {
    return mobileOfferList;
  }

  public void setMobileOfferList(List<MobileOffer> mobileOfferList) {
    this.mobileOfferList = mobileOfferList;
  }
}
