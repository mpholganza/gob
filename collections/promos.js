Promos = new Meteor.Collection('promos');

Meteor.methods({
  ensurePromo: function(dealId, promoName, promoCode, promoDescription, startDate, endDate, priceInCentsOff, maxOrders) {
    var future = new Future;

    // Only support one promo per deal. Could change this later.
    var duplicatePromo = Promos.findOne({"dealId": dealId});
    if (duplicatePromo != null) {
      return duplicatePromo._id;
    }

    var promo = {
      "dealId": dealId,
      "promoName": promoName,
      "promoCode": promoCode,
      "promoDescription": promoDescription,
      "startDate": startDate,
      "endDate": endDate,
      "priceInCentsOff": priceInCentsOff,
      "maxOrders": maxOrders,
      "numberOfOrders": 0
    };

    var promoId = Promos.insert(promo, function(error, promoId) {
      future['return'](promoId);
    });

    return future.wait();
  }
});