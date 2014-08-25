Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();

  LoadTestData();
  
  Meteor.publish("allDeals", function() {
    return Deals.find();
  });

  Meteor.publish("allOrders", function() {
    return Orders.find();
  });

  Meteor.publish("allPromos", function() {
    return Promos.find();
  });

  Meteor.publish("publicBuildings", function() {
    return Buildings.find();
  });
});

function LoadTestData() {
	//Meteor.call('textSubscribers')
  //Meteor.call('ensureOrder', 'MQNKzWSyLogTdpZwJ', 'ckFrQK6aRBPoyfutH', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
  //Meteor.call('textCouriersOrderInfo');
}