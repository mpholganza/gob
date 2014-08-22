Orders = new Meteor.Collection('orders');

Meteor.methods({  
  ensureOrder: function(userId, dealId, featuredDish, restaurant, priceInCents) {
    var future = new Future;

    // Check for duplicate userid-dealid pair
    var duplicateOrder = Orders.findOne({"userId": userId, "dealId": dealId});
    if (duplicateOrder != null) {
      console.log("ensureOrder: duplicate order detected.");
      return duplicateOrder._id;
    }

    var deal = Deals.findOne(dealId);
    if (!deal) {
      console.log("ensureOrder: order attempted from userId " + userId + ". dealId " + dealId + " not found.");
      return;
    }

    if (deal.numberOfOrders >= deal.maxOrders) {
      console.log("ensureOrder: order attempted from userId " + userId + ". dealId " + dealId + " max orders reached.");
      Meteor.call('sendText', user.profile.phoneNumber, 'Sorry, we are sold out for today');
      return;
    }

    // Find a promo associated with this deal. Note this only supports one promo per deal
    var promo = Promos.findOne({"dealId": dealId});
    var promoCode = null;
    
    if (promo) {
      // Check if the user has one of the promos
      if (Meteor.user().profile.promoCodes) {
        promoCode = _.find(Meteor.user().profile.promoCodes, function(promoCode) {
          return promo._id === promoCode._id; 
        });

        if (promoCode) {
          // Apply discount
          priceInCents = priceInCents - promo.priceInCentsOff;
        }
      }
    }

    var dateOrdered = moment().tz("America/Toronto").format();

    var order = {
      "userId": userId,
      "dealId": dealId,
      "featuredDish": featuredDish,
      "restaurant": restaurant,
      "priceInCents": priceInCents,
      "dateOrdered": dateOrdered,
      "status": "confirmed"
    };

    var user = Meteor.users.findOne(userId);

    var orderId = Orders.insert(order, function(error, orderId) {
      // Send order confirmation
      Meteor.call('sendText', user.profile.phoneNumber, "Thanks! Your order has been placed, we'll text you once your dish is delivered! :)");

      // Increment number of orders against deal
      Deals.update(dealId, {$inc: {"numberOfOrders":1}});
      
      // Increment number of promos used against deal
      if (promoCode) {
        Promos.update({"dealId": dealId}, {$inc: {"numberOfOrders":1}});
      }

      future['return'](orderId);
    });

    return future.wait();
  }
});

Meteor.publish("allOrders", function() {
  return Orders.find();
});