Template.ordersList.isAdmin = function () {
  return Meteor.user().profile.isAdmin;
  //return true;
};

Template.ordersList.orders = function() {
  return Orders.find();
};

Template.ordersList.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});