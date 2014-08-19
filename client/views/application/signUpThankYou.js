Template.signUpThankYou.requestedBuilding = function () {
  return Meteor.user().profile.buildingId === "Request a Building";
};

Template.signUpThankYou.promoText = function () {
  var promoText = '';
  if (Meteor.user().profile.promoCodes) {
    if (Meteor.user().profile.promoCodes._id) {
      promoText = "Congratulations your promoCode went through!";
    } else {
      promoText = "Sorry the max number of promos was reached.";
    }
  }
  return promoText;
}

Template.signUpThankYou.events({
  'click #homeButton': function(e) {
    Router.go('takeout');
  }
});