var Stripe = StripeAPI('sk_test_u1AsZeXmDBkFeJ3BzcFP1BSN');

var stripeCreateCustomerAsync = function(userId, email, phoneNumber, fullName,  stripeToken) {
	var future = new Future;
	
	Stripe.customers.create({
	  card: stripeToken,
	  description: phoneNumber + ' ' + email + ' ' + fullName,
    email: email
	}, function(err, customer) {
		if (err) {
			console.log('stripeCreateCustomerAsync:' + err.message);
			throw new Meteor.Error(402, "Error creating customer info.");
		}
		future['return'](customer);
	});
	
	return future.wait();
};

Meteor.methods({
	saveStripeToken: function(stripeToken) {
		var user = Meteor.user();
		if (!user) {
			throw new Meteor.Error(402, "User not logged in. User must be logged in to enter billing information.");
		}
		
		var primaryEmail = user.emails[0].address;
		if (!primaryEmail) {
			throw new Meteor.Error(402, "No email associated with this account.");
		}  

    var phoneNumber = user.profile.phoneNumber;
		if (!phoneNumber) {
			throw new Meteor.Error(402, "No phone number associated with this account.");
		} 
    
    var fullName = user.profile.firstName + ' ' + user.profile.lastName;
		/* TODO: use Meteor._wrapAsync when this is public to make this look nicer
		_wrapAsync implementation.
		doesn't work as it depends on prototype methods/properties
		
		var createCustomerSync = Meteor._wrapAsync(Stripe.customers.create);
		var customer = createCustomerSync({
		  card: stripeToken,
		  description: primaryEmail
		});

		Meteor.users.update(userId, {$set: { 'services.stripe': { id: customer.id }}});
		*/

		var customer = stripeCreateCustomerAsync(user._id, primaryEmail, phoneNumber, fullName, stripeToken);

		Meteor.users.update(user._id, {$set: { 'services.stripe': { id: customer.id }, 'profile.hasCreditCard': 1}});
	}
});