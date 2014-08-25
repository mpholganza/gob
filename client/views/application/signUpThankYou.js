Template.signUpThankYou.requestedBuilding = function () {
  return Meteor.user().profile.buildingId === "Request a Building";
};

Template.signUpThankYou.promoText = function () {
  var promoText = '';
  if (Meteor.user().profile.promoCodes) {
    if (Meteor.user().profile.promoCodes[0]._id) {
      promo = Promos.findOne({_id : Meteor.user().profile.promoCodes[0]._id})
      promoCount = promo.numberOfOrders;
      promoText = "Congratulations! You are promo code # " + promoCount + ". Your promo code was successful!";
    } else if (Meteor.user().profile.promoCodes[0].rejected) {
      promoText = "Sorry, the max number of promos was reached";
    } else if (Meteor.user().profile.promoCodes[0].code == "") {
      promoText = ""
    } else {
      promoText = "Your promo code was invalid"
    }
  }
  return promoText;
}

Template.signUpThankYou.events({
  'click #homeButton': function(e) {
    Router.go('takeout');
  }
});