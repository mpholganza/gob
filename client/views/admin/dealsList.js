Template.dealsList.isAdmin = function () {
  return Meteor.user().profile.isAdmin;
  //return true;
};

Template.dealsList.deals = function() {
  var todaysDate = new Date();
  todaysDate.setHours(0,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setHours(23,59,59,59);
  return Deals.find({date: {"$gte": todaysDate, "$lte": tomorrowsDate}});
};

Template.dealItem.priceInDollars = function () {
  var priceInCents = this.priceInCents;
  var priceInDollars = priceInCents/100;
  return priceInDollars;
};

Template.dealItem.events({
  'click #deliveredButton': function(e) {
    this.disabled = true;
    Meteor.call('textDelivered', this._id);
  }
});