Template.dealCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    
    // Form validation
    $("#dealCreate").bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#dealCreate');

        var deal = {
          buildingId: $form.find('[name=buildingId]').val(),
          date: $form.find('[name=date]').val(),
          featuredDish: $form.find('[name=featuredDish]').val(),
          restaurant: $form.find('[name=restaurant]').val(),
          description: $form.find('[name=description]').val(),
          price: $form.find('[name=price]').val(),
          shortenedUrl: $form.find('[name=shortenedUrl]').val(),
          fullUrl: $form.find('[name=fullUrl]').val()
        }

        Meteor.call('ensureDeal', deal)
        
        Router.go('takeout');
      },

      fields: {
        buildingId: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the building ID'
            }
          }
        },
        date: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the date for the featured dish'
            }
          }
        },
        featuredDish: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the featured dish'
            }
          }
        },
        restaurant: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the restaurant'
            }
          }
        },
        price: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the price'
            }
          }
        },
        shortenedUrl: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the shortened URL'
            }
          }
        },
        fullUrl: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the full URL'
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