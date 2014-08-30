Template.adminBuildingCreate.isAdmin = function () {
  var user = Meteor.user()
  return user && user.profile.isAdmin;
  //return true;
};

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
      /* submitButtons: '#fakeSubmit', Trick validator until https://github.com/nghuuphuoc/bootstrapvalidator/pull/244 is fixed */
      submitHandler: function(validator, form, submitButton) {
        var $form = $('#buildingCreate');

        var building = {
          company: $form.find('[name=company]').val(),
          address: $form.find('[name=address]').val(),
          floor: $form.find('[name=floor]').val()
        };

        Meteor.call('ensureBuilding', building.company, building.address, building.floor);
        
      },
      fields: {
        company: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the company name'
            }
          }
        },
        address: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the company address'
            }
          }
        },
        floor: {
          trigger: 'blur',
          validators: {
            notEmpty: {
              message: 'Please provide the floor'
            }
          }
        }
      }
    })
  }
};

Template.buildingCreate.buildings = function() {
  return Buildings.find();
};

Template.buildingCreate.events({
  'click #home': function(e) {
    Router.go('takeout');
  }
});