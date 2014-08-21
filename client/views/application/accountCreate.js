Template.accountCreate.events({
  'change #requestBuildingSelect' : function (e) {
    if ("Request a Building" === e.target.value) {
      $('#requestBuilding').show();
    } else {
      $('#requestBuilding').hide();
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
        };

        promoCodes.push(promoCode);

        var requestedAddress = $form.find('[name=address]').val();
        var requestedFloor = $form.find('[name=floor]').val();

        var requestedLocation = null;
        if (requestedAddress) {
          requestedLocation = requestedAddress + ': Floor ' + requestedFloor;
        };

        var buildingInfo = $form.find('[name=building]').val().split("_"); // old schema

        var profile = {
          firstName: $form.find('[name=firstName]').val(),
          lastName: $form.find('[name=lastName]').val(),
          phoneNumber: $form.find('[name=phoneNumber]').val(),
          building: buildingInfo[1], // old schema
          buildingId: buildingInfo[0],
          requestedBuilding: requestedLocation,
          promoCodes: promoCodes,
          hasCreditCard: 0
        };

        Accounts.createUser({
          email: email,
          password: password,
          profile: profile
        });
        
        Router.go('creditCardEntry', {signUp: 1});
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
        },
        consent: {
          validators: {
            choice: {
              min: 1,
              max: 1,
              message: 'Please indicate that you accept the Terms of Service and Privacy Policy'
            }
          }
        }
      }
    })
  }
};

Template.accountCreate.buildings = function() {
  return Buildings.find();
};