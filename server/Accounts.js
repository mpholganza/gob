// For security, client side - removed for the time being
Accounts.config({
  forbidClientAccountCreation: false
});


Accounts.validateNewUser(function(user) {
  // Validate email
  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  var email = user.emails[0].address;
  var errorMessage = "";
  if (email && !emailRegex.test(email)) {
    errorMessage += "Email address invalid.\n";
  }

  // Validate phone number
  phoneRegex = /^(\()?[2-9]{1}\d{2}(\))?(-|\s)?[2-9]{1}\d{2}(-|\s)\d{4}$/;
  var phone = user.profile.phoneNumber;
  if (phone && !phoneRegex.test(phone)) {
    errorMessage += "Invalid phone number.\n"
  }

  if (errorMessage.length > 0) {
    console.log("ValidateNewUser: " + errorMessage);
    throw new Meteor.Error(403, errorMessage);
  }

  console.log("ValidateNewUser: Account for " + email + " created.");
  return true;
});

// TODO: Take this out of the global namespace
function toTwilioPhoneNumber(phoneNumber) {
  return '+1' + phoneNumber.replace(/\D+/g, '');
}

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.profile = options.profile;
    
    if (options.profile.phoneNumber && options.profile.buildingId != "Request a Building") {

      // Validate promo code
      if (user.profile.promoCodes) {
        var code = user.profile.promoCodes[0].code;
        var building = Buildings.findOne({"_id" : user.profile.buildingId})
        var deals = Deals.find({"buildingId" : user.profile.buildingId}).fetch()
        _.each(deals, function(deal) {
          var promo = Promos.findOne({"promoCode": code, "dealId": deal._id});
          if (promo) {
            if (promo.numberOfOrders < promo.maxPromos) {
              user.profile.promoCodes[0]._id = promo._id;
              Promos.update({"_id": promo._id}, {$inc: {"numberOfOrders": 1}});
              console.log('accepted');
            } else {
              user.profile.promoCodes[0].rejected = 1;
              console.log('rejected');
            }
          }
        });
      }
    
      if (options.profile.phoneNumber) {
        var phoneNumber = toTwilioPhoneNumber(options.profile.phoneNumber);
        Texting.sendText(phoneNumber, "Welcome to gob! We text you a featured dish each day by 10am, simply reply YES to order by 11:15am & enjoy by 12:15pm!");
      }
    }
  }
  return user;
});

Meteor.methods({
  editProfile: function(profile) {
    var errorMessage = "";
    // Validate phone number
    phoneRegex = /^(\()?[2-9]{1}\d{2}(\))?(-|\s)?[2-9]{1}\d{2}(-|\s)\d{4}$/;
    var phone = profile.phoneNumber;
    if (phone && !phoneRegex.test(phone)) {
      errorMessage += "Invalid phone number.\n"
    }
  
    if (errorMessage.length > 0) {
      console.log("ValidateNewUser: " + errorMessage);
      throw new Meteor.Error(403, errorMessage);
    }
    
    Meteor.users.update(Meteor.userId(),
      { 
        $set: {
          "profile.firstName": profile.firstName,
          "profile.lastName": profile.lastName,
          "profile.phoneNumber": profile.phoneNumber
        }
      }
    );
  }
});