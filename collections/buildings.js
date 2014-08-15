Buildings = new Meteor.Collection('buildings');

/*Meteor.methods({
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
})*/

Meteor.methods({
  ensureBuilding: function(building) {
    //var future = new Future;

    // Check for duplicate names
    var name = building.name;
    var duplicateBuilding = Buildings.findOne({name: name});
    if (duplicateBuilding != null) {
      return duplicateBuilding._id;
    }
    
    Buildings.insert({
      building: building
    }, function(error, buildingId) {
      future['return'](buildingId);
    });

    //return future.wait();
  }
});


Meteor.publish("publicBuildings", function() {
  return Buildings.find();
});