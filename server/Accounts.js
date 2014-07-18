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