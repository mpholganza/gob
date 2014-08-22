Meteor.methods({
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
      Meteor.call('textHelp', textFrom);
      return;
    }

    // Check if STOP
    if (textBody === 'STOP') {
      Meteor.call('textStop', textFrom);
      return;
    }

    // Check if START
    if (textBody === 'START') {
      Meteor.call('textStart', textFrom);
      return;
    }

    // Check if YES
    var yesTracking = textBody.substring(0,3);
    if (yesTracking === 'YES') {
      Meteor.call('textOrderReply', textFrom);
      return;
    }

    // Other messages
    Meteor.call('textOther', textFrom, textBody);
  },
  textHelp: function (textFrom) {
    Meteor.call('sendText', textFrom, 'Welcome to gob! We text you a featured dish each day by 10am, simply reply YES to order by 11:15am & enjoy by 12:15pm! Reply STOP to unsubscribe');
  },
  textStop: function (textFrom) {
    // TODO
  },
  textStart: function (textFrom) {
    Meteor.call('sendText', textFrom, 'You have successfully been re-subscribed to messages from this number. Reply HELP for help. Reply STOP to unsubscribe.');
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
      Meteor.call('sendText', textFrom, 'You are not signed up for gob. Sign up at http://omgob.com');
      return;
    }

    // At this moment there is no profile.hasCreditCard - need to add in
    var inactiveSubscribers = Meteor.users.find({"profile.hasCreditCard": 0}).fetch();
    var nonOrderingUser = _.find(inactiveSubscribers, function(subscriber) {
      var subscriberNumber = '+1' + subscriber.profile.phoneNumber.replace(/\D+/g, '');
      return (textFrom === subscriberNumber);
    });

    if (nonOrderingUser) {
      Meteor.call('sendText', textFrom, 'There was an issue processing your credit card. Please update your credit card information at http://omgob.com/edit_profile');
      return;
    }

    // There must be an associated deal
    var todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    var tomorrowsDate = new Date();
    tomorrowsDate.setHours(23,59,59,59);

    var dealInfo = Deals.findOne({"buildingId": orderingUser.profile.buildingId, date: {"$gte": todaysDate, "$lte": tomorrowsDate}});
    if (dealInfo == null) {
      Meteor.call('sendText', textFrom, 'Sorry, there is no featured dish at your building today');
      return;
    }

    // Check if reply is within offer time
    var todaysDate10am = new Date();
    todaysDate10am.setHours(14,0,0,0); // 10am EST
    var todaysDate11am = new Date();
    todaysDate11am.setHours(15,0,0,0); // 11am EST
    var now = new Date();
    if (now < todaysDate10am) {
      Meteor.call('sendText', textFrom, "Our featured dish today is not yet being offered. Please reply between 10-11am");
      return;
    }
    
    if (now > todaysDate11am) {
      Meteor.call('sendText', textFrom, "Our featured dish today is now over, but don't worry we have plenty of delicious dishes featured daily!");
      return;      
    }

    // Create an order
    Meteor.call('ensureOrder', orderingUser._id, dealInfo._id, dealInfo.featuredDish, dealInfo.restaurant, dealInfo.priceInCents);

  },
  textOther: function (textFrom, textBody) {
    
  }
});