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

  // Validate promo code
  if (user.profile.promoCodes) {
    var code = user.profile.promoCodes[0].code;
    var promo = Promos.findOne({code: code});
    if (promo) {
      if (promo.numberOfOrders < maxOrders) {
        Meteor.users.update(Meteor.userId(),
        {
          $set: {
            "profile.promoCodes.0._id": promo._id
          }
        });
      } else {
        Meteor.users.update(Meteor.userId(),
        {
          $set: {
            "profile.promoCodes.0.rejected": 1
          }
        });
      }
    }
  }

  console.log("ValidateNewUser: Account for " + email + " created.");
  return true;
});

Accounts.onCreateUser(function(options, user) {
  if (options.profile.phoneNumber) {
    var phoneNumber = toTwilioPhoneNumber(options.profile.phoneNumber);
    Meteor.call('sendText', phoneNumber, "Welcome to gob!");
  }
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
})