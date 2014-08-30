Template.editProfileForm.events({
  'change #request-building-select': function (e) {
    if ("_Request a Building" === e.target.value) {
      $('#request-building').show();
    } else {
      $('#request-building').hide();
    }
  },
  'click #editCreditCardButton': function (e) {
    Router.go('creditCardEntry', {signUp: 0});
  }
});

Template.editProfileForm.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    
    // Add phone UI mask
    $("#phoneNumber").mask("(999) 999-9999");
    
    // Form validation
    $("#editProfileForm").bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#editProfileForm');

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
          requestedBuilding: requestedLocation
        }
        
        Meteor.call('editProfile', profile, function(error, response) {
          if (error) {
            return;
          }
          
          // TODO: show success message
          Router.go('takeout');
        });
      },
      fields: {
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
        }
      }
    });
  }
};