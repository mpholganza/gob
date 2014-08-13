Template.signUpThankYou.requestedBuilding = function () {
  return Meteor.user().profile.building === "Request a Building";
};

Template.signUpThankYou.events({
  'click #homeButton': function(e) {
    Router.go('takeout');
  }
});
