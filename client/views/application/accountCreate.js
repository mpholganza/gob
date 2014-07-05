Template.accountCreate.events({
  'submit form': function(e) {
    e.preventDefault();
    //Template._loginButtons.toggleDropdown();
		var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();
    
    var promoCodes = [];
    var promoCode = {
      code: $(e.target).find('[name=promo]').val(),
      used: 0
    }
    
    promoCodes.push(promoCode);

    var profile = {
      firstName: $(e.target).find('[name=firstName]').val(),
      lastName: $(e.target).find('[name=lastName]').val(),
      phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
      building: $(e.target).find('[name=building]').val(),
      promoCodes: promoCodes
    }
    
    Accounts.createUser({
      email: email,
      password: password,
      profile: profile
    });
  },
  'click #homeButton': function(e) {
    Router.go('takeout');
  },
  'keypress #phoneNumber': function(e) {
    /*e.preventDefault();
    phoneInput = document.getElementById('phoneNumber');
    
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
   
    // Only allow numbers to be typed
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return;
    }
    
    var char = String.fromCharCode(charCode);
    
    var numbers = phoneInput.value.replace(/\D/g, '');
    numbers += char;
    alert(numbers);
    
    var phoneFormat = '(___) ___-____';
    var charPosition = phoneFormat.split('_', numbers.length).join('_').length;
    
    // doesn't work since strings are immutable
    //phoneFormat[charPosition] = numbers[numbers.length - 1];
    
    var newPhoneFormat = phoneFormat.substring(0,charPosition) + numbers[numbers.length - 1] + phoneFormat.substring(charPosition + 1, phoneFormat.length);
    //phoneInput.value = '';

    phoneInput.value = newPhoneFormat;*/
  }
});

Template.accountCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    
    // Add phone UI mask
    $("#phoneNumber").mask("(999) 999-9999");
    
    // Form validation
    $("#extendedSignup").bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      submitButtons: '#fakeSubmit', /* Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      fields: {
        email: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'The email is required and cannot be empty'
            },
            emailAddress: {
              message: 'The input is not a valid email address'
            }
          }
        },
        firstName: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide your first name'
            }
          }
        },
        lastName: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide your last name'
            }
          }
        },
        phoneNumber: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'We need your phone number'
            }
          }
        },
        password: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Password cannot be empty'
            },
            stringLength: {
              min: 6,
              message: 'Password must be at least 6 characters'
            }
          }
        }
      }
    });
  }
};