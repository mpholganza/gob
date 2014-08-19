Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(buildingId, buildingName, date, name, restaurantName, priceInCents, description, shortenedUrl, fullUrl, maxOrders) {
    var future = new Future;
    
    // Check for duplicate buildingId-date pair
    var duplicateDeal = Deals.findOne({"buildingId": buildingId, "date": date});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }
    
    var deal = {
      "buildingId": buildingId,
      "buildingName": buildingName,
      "name": name,
      "restaurantName": restaurantName,
      "description": description,
      "priceInCents": priceInCents,
      "date": date,
      "shortenedUrl": shortenedUrl,
      "fullUrl": fullUrl,
      "maxOrders": maxOrders,
      "numberOfOrders": 0
    };

    Deals.insert(deal, function(error, dealId) {
      future['return'](dealId);
    });

    return future.wait();
  }
});


Meteor.publish("allDeals", function() {
  return Deals.find();
});