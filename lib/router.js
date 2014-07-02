Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('dinein', {path: '/dinein'});
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
});
