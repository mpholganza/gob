Template.buildingCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
       
    // Form validation
    $("#buildingCreate").bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

/* For some reason this is not working */
/*
      fields: {
        name: {
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
      },
*/
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        alert("hello");
        var $form = $('#buildingCreate');

        var building = {
          name: $form.find('[name=name]').val(),
          address: $form.find('[name=address]').val(),
          floor: $form.find('[name=floor]').val()
        }
        
        Meteor.call('ensureBuilding', building);

        Router.go('takeout');
      }
    })
  }
};