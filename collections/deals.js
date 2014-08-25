Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(buildingId, date, featuredDish, restaurant, description, priceInCents, maxOrders, shortenedUrl, fullUrl) {

    var future = new Future;
    
    // Make case-insensitive
    var buildingIdRegex = new RegExp('^'+buildingId+'$','i');
    var date = new Date(date+'T'+'04:00:00-04:00');

    // Check for duplicate buildingId-date pair
    var duplicateDeal = Deals.findOne({buildingId: buildingIdRegex, date: date});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }

    // Used to find company name based off buildingId
    var buildingInfo = Buildings.findOne({_id: buildingId});
    var company = buildingInfo.company;
    var floor = buildingInfo.floor;

    Deals.insert({
      buildingId: buildingId,
      company: company,
      floor: floor,
      date: date,
      featuredDish: featuredDish,
      restaurant: restaurant,
      description: description,
      priceInCents: priceInCents,
      maxOrders: maxOrders,
      shortenedUrl: shortenedUrl,
      fullUrl: fullUrl,
      numberOfOrders: 0
    }, function(error, dealId) {
      future['return'](dealId);
    });

    return future.wait();
  }
});

Meteor.publish("allDeals", function() {
  return Deals.find();
});