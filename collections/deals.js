Deals = new Meteor.Collection('deals');

Meteor.methods({
  ensureDeal: function(deal) {
    var future = new Future;
    
    // Check for duplicate buildingId-date pair
    //Unable to specify buildingId-date pair
    //var buildingId = deal.buildingId;
    //var date = deal.date;
    var duplicateDeal = Deals.findOne({deal: deal});
    if (duplicateDeal != null) {
      return duplicateDeal._id;
    }

    Deals.insert({
      deal: deal
    }, function(error, dealId) {
      future['return'](dealId);
    });

    return future.wait();
  }
});

Meteor.publish("allDeals", function() {
  return Deals.find();
});