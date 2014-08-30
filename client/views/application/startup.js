Meteor.startup(function() {
  $('body').attr('data-spy', 'scroll');
  $('body').attr('data-target', '.navbar-custom');
  $('body').attr('id', 'page-top');

  // Subscribe
  Meteor.subscribe('publicBuildings');
  Meteor.subscribe('allDeals');
  Meteor.subscribe('allPromos');
  Meteor.subscribe('allOrders');
});