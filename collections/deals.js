Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(buildingId, date, featuredDish, restaurant, description, priceInCents, shortenedUrl, fullUrl) {
    var future = new Future;
    
    // Make case-insensitive
    var buildingIdRegex = new RegExp('^'+buildingId+'$','i');
    var dateRegex = new RegExp('^'+date+'$','i');

    // Check for duplicate buildingId-date pair
    var duplicateDeal = Deals.findOne({buildingId: buildingIdRegex, date: dateRegex});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }

    Deals.insert({
      buildingId: buildingId,
      date: date,
      featuredDish: featuredDish,
      restaurant: restaurant,
      description: description,
      priceInCents: priceInCents,
      shortenedUrl: shortenedUrl,
      fullUrl: fullUrl
    }, function(error, dealId) {
      future['return'](dealId);
    });

    return future.wait();
  }
});

Meteor.publish("allDeals", function() {
  return Deals.find();
});