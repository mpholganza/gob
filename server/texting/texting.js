Meteor.methods({
  sendText: function(toNumber, textContent) {
    var fromNumber = '+16475575906';
    if (toNumber === fromNumber) {
      // avoid text loop
      return;
    }

    var twilio = Twilio("ACcc3b2feb2b51115d6cf9e494dc222ecc", "616d7ba8f894f9a99c0048b557f2fd64");
    twilio.sendSms({
      to: toNumber, // Any number Twilio can deliver to
      from: fromNumber, // A number you bought from Twilio and can use for outbound communication
      body: textContent // body of the SMS message
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
    // find all orders for that deal and set order status to confirmed
    Orders.update({"dealId": dealId}, {$set: {"status": "delivered"}, {multi: true}}, function(error, response) {
      // send out text
      var deliveredOrders = Orders.find({"dealId": buildingDeal.dealId}, {"status": "delivered"}).fetch();
      _.each(deliveredOrders, function(order) {
        Meteor.call('sendText', order.phoneNumber, "Your dish has arrived! Pickup at " + order.pickupLocation + " How was our service? Tweet us @getgob or let us know on http://facebook.com/omgob");
      });
    });
  }
});