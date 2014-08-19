Buildings = new Meteor.Collection('buildings');

Meteor.methods({
  ensureBuilding: function(company, address, floor) {
    var future = new Future;

    // Make case-insensitive
    var companyRegex = new RegExp('^'+company+'$','i');
    var addressRegex = new RegExp('^'+address+'$','i');
    var floorRegex = new RegExp('^'+floor+'$','i');

    // Check for duplicate names
    var duplicateBuilding = Buildings.findOne({company: companyRegex, address: addressRegex, floor: floorRegex});
    if (duplicateBuilding != null) {
      console.log(duplicateBuilding._id);
      return duplicateBuilding._id;
    }

    Buildings.insert({
      company: company,
      address: address,
      floor: floor
    }, function(error, buildingId) {
      future['return'](buildingId);
    });

    return future.wait();
  }
});

Meteor.publish("publicBuildings", function() {
  return Buildings.find();
});