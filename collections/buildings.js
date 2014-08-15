Buildings = new Meteor.Collection('buildings');

Meteor.methods({
  ensureBuilding: function(building) {
    var future = new Future;

    // Check for duplicate names
    var duplicateBuilding = Buildings.findOne({building: building});
    if (duplicateBuilding != null) {
      return duplicateBuilding._id;
    }
    
    Buildings.insert({
      building: building
    }, function(error, buildingId) {
      future['return'](buildingId);
    });

    return future.wait();
  }
});

Meteor.publish("publicBuildings", function() {
  return Buildings.find();
});