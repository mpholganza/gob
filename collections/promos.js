Promos = new Meteor.Collection('promos');

Meteor.methods({
  ensurePromo: function(dealId, promoCode, promoName, promoDescription, startDate, endDate, priceInCentsOff, maxOrders) {
    var future = new Future;

    // Make case-insensitive
    var dealIdRegex = new RegExp('^'+dealId+'$','i');

    // Only support one promo per deal. Could change this later.
    var duplicatePromo = Promos.findOne({dealId: dealIdRegex});
    if (duplicatePromo != null) {
      return duplicatePromo._id;
    }

    Promos.insert({
      dealId: dealId,
      promoCode: promoCode,
      promoName: promoName,
      promoDescription: promoDescription,
      startDate: startDate,
      endDate: endDate,
      priceInCentsOff: priceInCentsOff,
      maxOrders: maxOrders,
      numberOfOrders: 0
    }, function(error, promoId) {
      future['return'](promoId);
    });

    return future.wait();
  }
});

Meteor.publish("allPromos", function() {
  return Promos.find();
});