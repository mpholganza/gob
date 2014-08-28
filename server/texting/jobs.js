// TODO: Take this out of the global namespace
function toTwilioPhoneNumber(phoneNumber) {
  return '+1' + phoneNumber.replace(/\D+/g, '');
}

SyncedCron.add({
  name: 'Text daily offering to active users at 10am every weekday',
  schedule: function(parser) {
    // Parser is a later.parse object
    // This 1:30pm is actually 9:30am EST
    return parser.text('at 1:30 pm on Monday, Tuesday, Wednesday, Thursday, Friday');
  }, 
  job: function() {
    textSubscribers();
  }
});

SyncedCron.add({
  name: 'Text couriers confirming number of orders',
  schedule: function(parser) {
    // Parser is a later.parse object
    // This 3:15pm is actually 11:15am EST
    return parser.text('at 3:15 pm on Monday, Tuesday, Wednesday, Thursday, Friday');
  }, 
  job: function() {
    textCouriersOrderInfo();
  }
});

function textSubscribers() {
  console.log('Texting daily offering to active users at 10am every weekday');

  // Get all deals for the day
  var todaysDate = new Date();
  todaysDate.setHours(0,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setHours(23,59,59,59);
  var todaysDeals = Deals.find({"date": {"$gte": todaysDate, "$lte": tomorrowsDate}}).fetch();

  // Send text to users in buildings associated with deals
  _.each(todaysDeals, function(deal) {
    var activeSubscribers = Meteor.users.find({"profile.buildingId": deal.buildingId}, {fields: {"profile.firstName": 1, "profile.phoneNumber": 1, "profile.promoCodes": 1}}).fetch();
    _.each(activeSubscribers, function(subscriber) {
      var subscriberNumber = toTwilioPhoneNumber(subscriber.profile.phoneNumber);
      var subscriberName = subscriber.profile.firstName;
      var restaurant = deal.restaurant;
      var featuredDish = deal.featuredDish;
      var priceInCents = deal.priceInCents;
      var priceInDollars = priceInCents/100;
      var shortenedUrl = deal.shortenedUrl;

      // Start TODO: Refactor this with the duplicate functionality in jobs.js
      // Find a promo associated with this deal. Note this only supports one promo per deal
      var promoText = '';
      var subscriberPromoCode = null;
      var promo = Promos.findOne({"dealId": deal._id});

      if (promo) {
        // Check if the user has one of the promos
        if (subscriber.profile.promoCodes) {
          subscriberPromoCode = _.find(subscriber.profile.promoCodes, function(subscriberPromoCode) {
            return promo._id === subscriberPromoCode._id;
          });

          if (subscriberPromoCode) {
            // Apply discount
            priceInCents = priceInCents - promo.priceInCentsOff;
            priceInDollars = priceInCents/100
            promoText = ' [PROMO]';
          }
        }
      }
      // Finish TODO
      var priceText = '$' + priceInDollars;
      var finishedText = subscriberName + "! Today's featured dish is " + featuredDish + " from " + restaurant + " - " + priceText + promoText + " - See " + shortenedUrl + " or reply YES by 11am to order";

      Texting.sendText(subscriberNumber, finishedText);
    });
  });
}

function textCouriersOrderInfo() {
  console.log('Texting couriers confirming number of orders');
  // Get amount of confirmed orders
  var todaysDate = new Date();
  todaysDate.setHours(0,0,0,0);
  var tomorrowsDate = new Date();
  tomorrowsDate.setHours(23,59,59,59);
  
  // var orderAmount = Orders.find({"date": {"$gte": todaysDate, "$lt": tomorrowsDate}, "status": "confirmed"}).fetch().length;
  var todaysDeals = Deals.find({date: {"$gte": todaysDate, "$lte": tomorrowsDate}}).fetch();
  var orderText = '';
  _.each(todaysDeals, function(deal) {
    console.log(deal.numberOfOrders);
    orderText += deal.restaurant + ": " + deal.numberOfOrders + ": " + deal.company + "\n";
  });

  // Send text to couriers
  Texting.sendText('+16474488843', orderText); // TODO: Remove Hardcode
}