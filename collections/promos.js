Promos = new Meteor.Collection('promos');

Meteor.methods({
  ensurePromo: function(dealId, promoCode, promoName, promoDescription, startDate, endDate, priceInCentsOff, maxPromos) {
    var future = new Future;

    // Make case-insensitive
    var dealIdRegex = new RegExp('^'+dealId+'$','i');
    var startDate = new Date(startDate+'T'+'04:00:00-04:00');
    var endDate = new Date(endDate+'T'+'03:59:59-04:00');
    endDate.setDate(endDate.getDate() + 1);

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
      maxPromos: maxPromos,
      numberOfOrders: 0
    }, function(error, promoId) {
      future['return'](promoId);
    });

    return future.wait();
  }
});
