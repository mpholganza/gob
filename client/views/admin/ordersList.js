Template.ordersList.isAdmin = function () {
  return Meteor.user().profile.isAdmin;
  //return true;
};

Template.ordersList.orders = function() {
  var todaysDate = new Date();
  todaysDate.setHours(0,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setHours(23,59,59,59);
  return Orders.find({dateOrdered: {"$gte": todaysDate, "$lte": tomorrowsDate}});
};

Template.ordersList.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});