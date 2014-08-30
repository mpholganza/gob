Template.adminPromoCreate.isAdmin = function () {
  var user = Meteor.user()
  return user && user.profile.isAdmin;
  //return true;
};

Template.promoCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    
    // Form validation
    $("#promoCreate").bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#promoCreate');

        var promo = {
          dealId: $form.find('[name=dealId]').val(),
          promoCode: $form.find('[name=promoCode]').val(),
          promoName: $form.find('[name=promoName]').val(),
          promoDescription: $form.find('[name=promoDescription]').val(),
          startDate: $form.find('[name=startDate]').val(),
          endDate: $form.find('[name=endDate]').val(),
          priceInCentsOff: $form.find('[name=priceInCentsOff]').val(),
          maxPromos: $form.find('[name=maxPromos]').val()
        };

        Meteor.call('ensurePromo', 
          promo.dealId, promo.promoCode, promo.promoName, promo.promoDescription, promo.startDate, promo.endDate, 
          promo.priceInCentsOff, promo.maxPromos);

      },
      fields: {
        dealId: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the deal ID'
            }
          }
        },
        promoName: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the promo name'
            }
          }
        },
        promoCode: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the promo code'
            }
          }
        },
        startDate: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the date'
            },
            date: {
              format: 'YYYY-MM-DD',
              message: 'The value is not a valid date'
            }          
          }
        },
        endDate: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the date'
            },
            date: {
              format: 'YYYY-MM-DD',
              message: 'The value is not a valid date'
            }          
          }
        },
        priceInCentsOff: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the price off'
            }
          }
        },
        maxPromos: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the max promos'
            }
          }
        }
      }
    })
  }
};

Template.promoCreate.promos = function() {
  return Promos.find();
};

Template.promoCreate.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});