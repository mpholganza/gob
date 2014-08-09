Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(buildingId, date, name, restaurantName, priceInCents, description, shortenedUrl, fullUrl) {
    var future = new Future;
    
    // Check for duplicate buildingId-date pair
    var duplicateDeal = Deals.findOne({"buildingId": buildingId, "date": date});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }

    Deals.insert({
      "buildingId": buildingId,
      "name": name,
      "restaurantName": restaurantName,
      "description": description,
      "priceInCents": priceInCents,
      "date": date,
      "shortenedUrl": shortenedUrl,
      "fullUrl": fullUrl
    }, function(error, dealId) {
      future['return'](dealId);
    });

    return future.wait();
  }
});


Meteor.publish("allDeals", function() {
  return Deals.find();
});