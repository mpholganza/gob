Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();

  LoadTestData();
});

function LoadTestData() {

  Meteor.call('ensureOrder', 'iEowKTzNA6AEPX6cC', 'MnERisTdQYju9NhKk', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
/*  Meteor.call('textCouriersOrderInfo');*/
}
