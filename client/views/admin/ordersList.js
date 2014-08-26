Template.ordersList.isAdmin = function () {
  return true;
  //return Meteor.user().profile.isAdmin;
};

Template.ordersList.orders = function() {
  return Orders.find();
};

Template.ordersList.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});