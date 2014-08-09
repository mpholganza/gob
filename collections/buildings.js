Buildings = new Meteor.Collection('buildings');

Meteor.methods({
  ensureBuilding: function(name, address) {
    var future = new Future;

    // Check for duplicate names
    var duplicateBuilding = Buildings.findOne({"name": name});
    if (duplicateBuilding != null) {
      return duplicateBuilding._id;
    }
    
    Buildings.insert({
      "name": name,
      "address": address
    }, function(error, buildingId) {
      future['return'](buildingId);
    });

    return future.wait();
  }
});

Meteor.publish("publicBuildings", function() {
  return Buildings.find();
});