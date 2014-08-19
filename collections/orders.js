Orders = new Meteor.Collection('orders');

Meteor.methods({  
  ensureOrder: function(userId, dealId, dealName, restaurantName, priceInCents) {
    var future = new Future;
    
    // Check for duplicate userid-dealid pair
    var duplicateOrder = Orders.findOne({"userId": userId, "dealId": dealId});
    if (duplicateOrder != null) {
      console.log("ensureOrder: duplicate order detected.")
      return duplicateOrder._id;
    }

    var order = {
      "userId": userId,
      "dealId": dealId,
      "submitted": new Date(),
      "dishName": dealName,
      "restaurantName": restaurantName,
      "dishPriceInCents": priceInCents,
      "status": "confirmed"
    };

    var user = Meteor.users.findOne(userId);

    var orderId = Orders.insert(order, function(error, orderId) {
      // Send order confirmation
      Meteor.call('sendText', user.profile.phoneNumber, "Thanks! Your order has been placed, we'll text you once your dish is delivered! :)");

      future['return'](orderId);
    });

    return future.wait();
  }
});