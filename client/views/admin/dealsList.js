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

Template.dealItem.events({
  'click #deliverButton': function(e) {
    Meteor.call('textDelivered', this._id);
  }
});