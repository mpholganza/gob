Template.signUpThankYou.requestedBuilding = function () {
  return Meteor.user().profile.building === "Request a Building";
};

Template.signUpThankYou.promoTextTrue = function () {
  var promoTextTrue = '';
  if (Meteor.user().profile.promoCodes) {
    if (Meteor.user().profile.promoCodes[0]._id) {
      promo = Promos.findOne({_id : Meteor.user().profile.promoCodes[0]._id})
      promoCount = promo.numberOfOrders;
      promoTextTrue = "Congratulations! You are promo code # " + promoCount + ". Your promo code was successful!";
    } else {
      promoTextTrue = null;
    }
  }
  return promoTextTrue;
}

Template.signUpThankYou.promoTextFalse = function () {
  var promoTextFalse = '';
  if (Meteor.user().profile.promoCodes) {
    if (Meteor.user().profile.promoCodes[0].rejected) {
      promoTextFalse = "Sorry, the max number of promos was reached";
    } else if (Meteor.user().profile.promoCodes[0].code == "") {
      promoTextFalse = ""
    } else if (Meteor.user().profile.promoCodes[0]._id == null) {
      promoTextFalse = "Your promo code was invalid"
    } else {
      promoTextFalse = null;
    }
  }
  return promoTextFalse;
}

Template.signUpThankYou.events({
  'click #homeButton': function(e) {
    Router.go('takeout');
  }
});