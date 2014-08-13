Meteor.methods({
  textDispatcher: function(textFrom, textBody) {
    // check number
    var twilioNumber = '+16475575906'; // TODO: Remove Hardcode
    if (textFrom === twilioNumber) {
      // avoid text loop!
      return;
    }

    textBody = textBody.toUpperCase();

    // check if HELP
    if (textBody === 'HELP') {
      Meteor.call('textHelp', textFrom);
      return;
    }

    // check if STOP
    if (textBody === 'STOP') {
      Meteor.call('textStop', textFrom, textBody);
      return;
    }

    // check if START
    if (textBody === 'START') {
      Meteor.call('textStart', textFrom, textBody);
      return;
    }

    // check if YES
    if (textBody === 'YES') {
      Meteor.call('textOrderReply', textFrom, textBody);
      return;
    }

    // other messages
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
    var activeSubscribers = Meteor.users.find({"profile.hasCreditCard": 1}).fetch();
    var orderingUser = _.find(activeSubscribers, function(subscriber) {
      var subscriberNumber = '+1' + subscriber.profile.phoneNumber.replace(/\D+/g, '');
      return (textFrom === subscriberNumber);
    });

    // check if activeSubscriber
    if (orderingUser == null) {
      Meteor.call('sendText', textFrom, 'You are not signed up for gob. Sign up at http://omgob.com');
      return;
    }

    // There must be an associated deal
    var today = new Date();
    today.setHours(0,0,0,0);
    var dealInfo = Deals.findOne({"buildingId": orderingUser.profile.buildingId, "date": today});
    if (dealInfo == null) {
      Meteor.call('sendText', textFrom, 'Sorry, there is no featured dish at your building today');
      return;
    }

    // check if reply is within offer time
    var todaysDate10am = new Date();
    todaysDate10am.setHours(14,0,0,0);
    var todaysDate11am = new Date();
    todaysDate11am.setHours(15,0,0,0);
    var now = new Date();
    if (!(now > todaysDate10am && now < todaysDate11am)) {
      // Deal not offered at this time, tell user
      Meteor.call('sendText', textFrom, "Our featured dish today is now over, but don't worry we have plenty of delicious dishes featured daily!");
      return;
    }

    // Create an order
    Meteor.call('ensureOrder', orderingUser._id, dealInfo._id, dealInfo.name, dealInfo.restaurantName, dealInfo.priceInCents);
  },
  textOther: function (textFrom, textBody) {
    
  }
});