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
  // Multi-msg test (Twilio filter)
  /*for (i = 0; i < 10; i++) {
    Texting.sendText('+16474488843', "Welcome to gob! We text you a featured dish each day by 10am, simply reply YES to order by 11:15am & enjoy by 12:15pm!");
    console.log(i);
  }*/
	//Meteor.call('textSubscribers')
  //Meteor.call('ensureOrder', 'MQNKzWSyLogTdpZwJ', 'ckFrQK6aRBPoyfutH', 'Cobb Salad w/ Chicken', 'Salad Days', '700');
 //Meteor.call('textCouriersOrderInfo');
}