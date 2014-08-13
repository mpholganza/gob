Template.buildingCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
       
    // Form validation
    $("#buildingCreate").bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#buildingCreate');

        var building = {
          companyName: $form.find('[name=companyName]').val(),
          address: $form.find('[name=address]').val(),
          floor: $form.find('[name=floor]').val()
        }

        Buildings.createBuilding({
          building: building
        });
        
        Router.go('takeout');

      },
      fields: {
        company: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide your company name'
            }
          }
        },
        address: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide your address'
            }
          }
        },
        floor: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide your floor number'
            }
          }
        }
      }
    })
  }
};