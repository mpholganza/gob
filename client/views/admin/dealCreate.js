Template.adminDealCreate.isAdmin = function () {
  var user = Meteor.user()
  return user && user.profile.isAdmin;
  //return true;
};

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
          priceInCents: $form.find('[name=priceInCents]').val(),
          maxOrders: $form.find('[name=maxOrders]').val(),
          shortenedUrl: $form.find('[name=shortenedUrl]').val(),
          fullUrl: $form.find('[name=fullUrl]').val()
        }

        Meteor.call('ensureDeal', deal.buildingId, deal.date, deal.featuredDish, deal.restaurant, deal.description, deal.priceInCents, deal.maxOrders, deal.shortenedUrl, deal.fullUrl);
        
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
              message: 'Please provide the date'
            },
            date: {
              format: 'YYYY-MM-DD',
              message: 'The value is not a valid date'
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
        priceInCents: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the price'
            }
          }
        },
        maxOrders: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the max orders'
            }
          }
        },
        shortenedUrl: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the short URL'
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

Template.dealCreate.deals = function() {
  return Deals.find();
};

Template.dealCreate.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});