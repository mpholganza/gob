Template.accountCreate.events({
  'click #homeButton': function(e) {
    Router.go('takeout');
  },
  'change #request-building-select' : function (e) {
    if ("Request a Building" === e.target.value) {
      $('#request-building').show();
    } else {
      $('#request-building').hide();
    }
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
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#extendedSignup');

    		var email = $form.find('[name=email]').val();
        var password = $form.find('[name=password]').val();
    
        var promoCodes = [];
        var promoCode = {
          code: $form.find('[name=promo]').val(),
          used: 0
        }
    
        promoCodes.push(promoCode);
    
        var requestedAddress = $form.find('[name=companyAddress]').val()
        var requestedFloor = $form.find('[name=floor]').val();
    
        var requestedLocation = null;
        if (requestedAddress) {
          requestedLocation = requestedAddress + ': Floor ' + requestedFloor;
        }

        var profile = {
          firstName: $form.find('[name=firstName]').val(),
          lastName: $form.find('[name=lastName]').val(),
          phoneNumber: $form.find('[name=phoneNumber]').val(),
          building: $form.find('[name=building]').val(),
          requestedBuilding: requestedLocation,
          promoCodes: promoCodes
        }
    
        Accounts.createUser({
          email: email,
          password: password,
          profile: profile
        });   
      },
      fields: {
        email: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'The email is required and cannot be empty'
            },
            emailAddress: {
              message: 'Not a valid email address'
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