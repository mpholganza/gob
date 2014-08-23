Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();

  LoadTestData();
});

function LoadTestData() {

  //Meteor.call('ensureOrder', 'MQNKzWSyLogTdpZwJ', 'ckFrQK6aRBPoyfutH', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
  //Meteor.call('ensureOrder', 'nr78uJuvPfgd8cJyc', 'zBRA8nuMGyWQDxgne', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
  //Meteor.call('textCouriersOrderInfo');
}
