Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(buildingId, date, featuredDish, restaurant, description, priceInCents, maxOrders, shortenedUrl, fullUrl) {

    var future = new Future;
    
    // Make case-insensitive
    var buildingIdRegex = new RegExp('^'+buildingId+'$','i');
    var dateRegex = new RegExp('^'+date+'$','i');

    // Check for duplicate buildingId-date pair
    var duplicateDeal = Deals.findOne({buildingId: buildingIdRegex, date: dateRegex});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }

    // Used to find company name based off buildingId
    var buildingInfo = Buildings.findOne({_id: buildingId});
    var company = buildingInfo.company;

// What is numberOfOrders?
/*<<<<<<< HEAD
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
=======*/

    Deals.insert({
      buildingId: buildingId,
      company: company,
      date: date,
      featuredDish: featuredDish,
      restaurant: restaurant,
      description: description,
      priceInCents: priceInCents,
      maxOrders: maxOrders,
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