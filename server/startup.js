Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();

  LoadTestData();
});

function LoadTestData() {
	//Meteor.call('textSubscribers')
  //Meteor.call('ensureOrder', 'MQNKzWSyLogTdpZwJ', 'ckFrQK6aRBPoyfutH', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
  //Meteor.call('textCouriersOrderInfo');
}