SyncedCron.add({
  name: 'Text daily offering to active users at 10am every weekday',
  schedule: function(parser) {
    // parser is a later.parse object
    // this 2pm is actually 10am EST
    return parser.text('at 2:00 pm on Monday, Tuesday, Wednesday, Thursday and Friday');
  }, 
  job: function() {
    Meteor.call('textSubscribers');
  }
});

SyncedCron.add({
  name: 'Text couriers confirming number of orders',
  schedule: function(parser) {
    // parser is a later.parse object
    // this 3pm is actually 11am EST
    return parser.text('at 3:00 pm on Monday, Tuesday, Wednesday, Thursday and Friday');
  }, 
  job: function() {
    Meteor.call('textCouriersOrderInfo');
  }
});

Meteor.methods({
  textSubscribers: function() {
    console.log('Texting daily offering to active users at 10am every weekday');

    // get all deals for the day
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    var tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    var todaysDeals = Deals.find({"date": {"$gte": todaysDate, "$lt": tomorrowsDate}}).fetch();

    // send text to users in buildings associated with deals
    _.each(todaysDeals, function(deal) {

      var activeSubscribers = Meteor.users.find({"profile.buildingId": deal.buildingId}, {fields: {"profile.phoneNumber": 1}}).fetch();
      _.each(activeSubscribers, function(subscriber) {
        var subscriberNumber = toTwilioPhoneNumber(subscriber.profile.phoneNumber);
        var restaurant = deal.restaurant;
        var dishName = deal.name;
        var priceInCents = deal.priceInCents;
        var priceInDollars = priceInCents/100;
        var shortenedUrl = deal.shortenedUrl;

        // Start TODO: Refactor this with the duplicate functionality in jobs.js
        // Find a promo associated with this deal. Note this only supports one promo per deal
        var promoText = '';
        var promoCode = null;
        var promo = Promos.findOne({"dealId": deal.dealId});

        if (promo) {
          // Check if the user has one of the promos
          if (subscriber.profile.promoCodes) {
            promoCode = _.find(subscriber.profile.promoCodes, function(promoCode) {
              return promo._id === promoCode._id;
            });

            if (promoCode) {
              // Apply discount
              priceInCents = priceInCents - promo.priceInCentsOff;
              priceInDollars = priceInCents/100
              promoText = '[PROMO]';
            }
          }
        }
        // Finish TODO
        var priceText = '$' + priceInDollars;
        var finishedText = "Today's featured dish is " + dishName + " from " + restaurant + " - " + priceText + " " + promoText + " - See " + shortenedUrl + " or reply YES by 11am to order";

        Meteor.call('sendText', subscriberNumber, finishedText);
      });
    });
  },
  textCouriersOrderInfo: function() {
    console.log('Texting couriers confirming number of orders');
    // get amount of confirmed orders
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    var tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    
    // var orderAmount = Orders.find({"date": {"$gte": todaysDate, "$lt": tomorrowsDate}, "status": "confirmed"}).fetch().length;
    var todaysDeals = Deals.find({date: {"$gte": todaysDate, "$lt": tomorrowsDate}}).fetch;
    var orderText = '';
    _.each(todaysDeals, function(deal) {
      orderText += deal.restaurant + ": " + deal.numberOfOrders + ".";
    });

    Meteor.call('sendText', '+16472981717', orderText); // TODO: Remove Hardcode
    // send text to couriers
  }
});