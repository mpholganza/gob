Template.dealsList.isAdmin = function () {
  return true;
};

Template.dealsList.deals = function() {
  var todaysDate = new Date();
  todaysDate.setHours(0,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  return Deals.find({date: {"$gte": todaysDate, "$lt": tomorrowsDate}});
};

/*
Template.dealItem.priceInDollars = function () {
  var activeDeals = Meteor.deals.find().fetch();
  _.each(activeDeals, function() {
    var priceInCents = deal.priceInCents;
    var priceInDollars = priceInCents/100;
  }
};
*/

Template.dealItem.events({
  'click #deliveredButton': function(e) {
    Meteor.call('textDelivered', this._id);
  }
});