Template.dealsList.isAdmin = function () {
  return true;
};

Template.dealsList.deals = function() {
  return Deals.find();
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