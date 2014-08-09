Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();
  
  LoadTestData();
});

function LoadTestData() {
  // Add Wattpad
  Meteor.call('ensureBuilding', 'Wattpad', '36 Wellington St E, Toronto, ON', function(error, buildingId) {
    // Add deals for Wattpad
    if (error) {
      console.log('ensureBuilding error: ' + error.message);
      return;
    }

    var dealDate = moment("2014 08 05", "YYYY MM DD")._d;
    Meteor.call('ensureDeal', buildingId, dealDate, 'Butter Chicken', 'Bindia Indian Bistro', 'Chicken with Butter', 900, function(error, dealId) {
      if (error) {
        console.log('ensureDeal error: ' + error.message);
        return;
      }
    });
  });
}