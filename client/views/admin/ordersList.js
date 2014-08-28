Template.ordersList.isAdmin = function () {
  //return Meteor.user().profile.isAdmin;
  return true;
};

Template.ordersList.orders = function() {
  var todaysDate = new Date();
  todaysDate.setHours(4,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  tomorrowsDate.setHours(3,59,59,59);
  return Deals.find({date: {"$gte": todaysDate, "$lte": tomorrowsDate}});
};

Template.orderItem.orders = function() {
  return Orders.find();
};

Template.ordersList.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});