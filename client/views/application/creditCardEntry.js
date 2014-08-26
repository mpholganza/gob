Template.creditCardEntry.events({
	'submit form': function(e) {
		e.preventDefault();
    $('#payments-errors').text('');
		var $form = $('#payment-form');

		// Disable the submit button to prevent repeated clicks
		$form.find('button').prop('disabled', true);

		Stripe.setPublishableKey('pk_test_4OjrLZKlb1DucfJc77YegjIJ');
		
		var that = this;
		Stripe.card.createToken($form, function(status, response) {
			//var $form = $('#payment-form');
			if (response && response.error) {
				// Show the errors on the form
        $('#payment-errors').text(response.error.message);
				$form.find('button').prop('disabled', false);
        $('.form-control.number-only').focus();
			} else {
				// token contains id, last4, and card type
				var token = response.id;

				Meteor.call('saveStripeToken', token, function(error, response) {
					if (error) {
            $('#payment-errors').text(error.message);
						$form.find('button').prop('disabled', false);
            $('.form-control.number-only').focus();
						return;
					}

					// TODO: FIX this: 'this' is null in this context
          var signUp = Router.current().params.signUp;
          if ("1" === signUp) {
            Router.go('signUpThankYou');
          } else {
            Router.go('takeout')
          }
        });
			}
		});

		return false;
	},
  'keypress .number-only': function(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
    
    var $form = $('#payment-form');
    $form.find('button').prop('disabled', false);
  }
});