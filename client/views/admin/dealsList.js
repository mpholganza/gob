Template.dealsList.isAdmin = function () {
  return true;
};

Template.dealsList.deals = function() {
  var todaysDate = new Date();
  todaysDate.setHours(4,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  tomorrowsDate.setHours(3,59,59,59);
  return Deals.find({date: {"$gte": todaysDate, "$lte": tomorrowsDate}});
};

// TODO: Convert to dollars
Template.dealItem.priceInDollars = function () {
/*  var todaysDate = new Date();
  todaysDate.setHours(4,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  tomorrowsDate.setHours(3,59,59,59);
  var todaysDeals = Deals.find({"date": {"$gte": todaysDate, "$lte": tomorrowsDate}}).fetch();

  _.each(todaysDeals, function(deal) {
    var priceInCents = deal.priceInCents;
    var priceInDollars = priceInCents/100;
  }

  return priceInDollars;*/
};


Template.dealItem.events({
  'click #deliveredButton': function(e) {
    this.disabled = true;
    Meteor.call('textDelivered', this._id);
  }
});