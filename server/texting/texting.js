Texting = {
  sendText: function(toNumber, textContent) {
    var fromNumber = '+16475575906';
    if (toNumber === fromNumber) {
      // Avoid text loop
      return;
    }

    var twilio = Twilio("ACcc3b2feb2b51115d6cf9e494dc222ecc", "616d7ba8f894f9a99c0048b557f2fd64");
    twilio.sendSms({
      to: toNumber, // Any number Twilio can deliver to
      from: fromNumber, // A number you bought from Twilio and can use for outbound communication
      body: textContent // Body of the SMS message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any
        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
        console.log("From: " + responseData.from + ". Body: " + responseData.body);
        return;
      }
      console.log('Error sending message "' + textContent + '" to "' + toNumber + '": ' + err.message);
    });
  },
  textDelivered: function(dealId) {
    // Find all orders for that deal and set order status to delivered
    Orders.update({"dealId": dealId}, {$set: {"status": "delivered"}}, {multi: true}, function(error, response) {
      // Send out text
      var deliveredOrders = Orders.find({"dealId": dealId}, {"status": "delivered"}).fetch();
      _.each(deliveredOrders, function(order) {
        console.log(order.userId);
        var user = Meteor.users.findOne(order.userId);
        var buildingFloor = Buildings.findOne(user.profile.buildingId);
        var text = user.profile.firstName + "... Your dish has arrived! Pickup at " + user.profile.building + " " + buildingFloor.floor + ", front desk. How was our service? Tweet us @getgob or let us know on http://facebook.com/omgob";
        Texting.sendText(user.profile.phoneNumber, text);
      });
    });
  },
  textDispatcher: function(textFrom, textBody) {
    // Check number
    var twilioNumber = '+16475575906'; // TODO: Remove Hardcode
    if (textFrom === twilioNumber) {
      // Avoid text loop!
      return;
    }

    textBody = textBody.toUpperCase();

    // Check if HELP
    if (textBody === 'HELP') {
      Texting.textHelp(textFrom);
      return;
    }

    // Check if STOP
    if (textBody === 'STOP') {
      Texting.textStop(textFrom);
      return;
    }

    // Check if START
    if (textBody === 'START') {
      Texting.textStart(textFrom);
      return;
    }

    // Check if YES
    var yesTracking = textBody.substring(0,3);
    if (yesTracking === 'YES') {
      Texting.textOrderReply(textFrom);
      return;
    }

    // Other messages
    Texting.textOther(textFrom, textBody);
  },
  // Does not work
  textHelp: function (textFrom) {
    Texting.sendText(textFrom, 'Welcome to gob! We text you a featured dish each day by 10am, simply reply YES to order by 11:15am & enjoy by 12:15pm! Reply STOP to unsubscribe');
  },
  // Does not work
  textStop: function (textFrom) {
    // TODO
  },
  // Does not work
  textStart: function (textFrom) {
    Texting.sendText(textFrom, 'You have successfully been re-subscribed to messages from this number. Reply HELP for help. Reply STOP to unsubscribe.');
  },
  textOrderReply: function (textFrom) {
    // Find ordering user
    // TODO: better query would query the actually phoneNumber directly if it's formatted properly
    var activeSubscribers = Meteor.users.find().fetch();
    var orderingUser = _.find(activeSubscribers, function(subscriber) {
      var subscriberNumber = '+1' + subscriber.profile.phoneNumber.replace(/\D+/g, '');
      return (textFrom === subscriberNumber);
    });

    // Check if activeSubscriber
    if (orderingUser == null) {
      Texting.sendText(textFrom, 'You are not signed up for gob. Sign up at http://omgob.com');
      return;
    }

    var inactiveSubscribers = Meteor.users.find({"profile.hasCreditCard": 0}).fetch();
    var nonOrderingUser = _.find(inactiveSubscribers, function(subscriber) {
      var subscriberNumber = '+1' + subscriber.profile.phoneNumber.replace(/\D+/g, '');
      return (textFrom === subscriberNumber);
    });

    if (nonOrderingUser) {
      Texting.sendText(textFrom, 'There was an issue processing your credit card. Please update your credit card information at http://omgob.com/edit_profile');
      return;
    }

    // There must be an associated deal
    var todaysDate = new Date();
    todaysDate.setHours(4,0,0,0);
    var tomorrowsDate = new Date();
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    tomorrowsDate.setHours(3,59,59,59);

    var dealInfo = Deals.findOne({"buildingId": orderingUser.profile.buildingId, date: {"$gte": todaysDate, "$lte": tomorrowsDate}});
    if (dealInfo == null) {
      Texting.sendText(textFrom, 'Sorry, there is no featured dish at your building today');
      return;
    }

    // Check if reply is within offer time
    var todaysDate10am = new Date();
    todaysDate10am.setHours(13,30,0,0); // 13:30 is actually 9:30am EST
    var todaysDate11am = new Date();
    todaysDate11am.setHours(22,15,0,0); // 15:15 is actually 11:15am EST
    var now = new Date();
    if (now < todaysDate10am) {
      Texting.sendText(textFrom, "Our featured dish today is not yet being offered. Please reply between 9:30-11:15am");
      return;
    }
    
    if (now > todaysDate11am) {
      Texting.sendText(textFrom, "Our featured dish today is now over, but don't worry we have plenty of delicious dishes featured daily!");
      return;      
    }

    // Create an order
    Meteor.call('ensureOrder', orderingUser._id, dealInfo._id, dealInfo.featuredDish, dealInfo.restaurant, dealInfo.priceInCents);

  },
  textOther: function (textFrom, textBody) {
    
  }
};