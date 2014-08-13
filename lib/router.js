Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('takeout', {path: '/'});
  this.route('accountCreate',{
    path:'/account_create/:email',
    data: function() {
      var templateData = {
        email: this.params.email
      };
      
      return templateData;
    }
  });
  this.route('terms', {path: '/terms'});
  this.route('privacy', {path: '/privacy'});
  this.route('editProfile', {path: 'edit_profile'});
  this.route('creditCardEntry', {
    path: 'edit_credit_card/:signUp',
    data: function() {
      var templateData = {
        signUp: this.params.signUp
      };
      
      return templateData;
    }
  });
  this.route('signUpThankYou', {path: 'greetings'});
});