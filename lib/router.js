Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('dinein', {path: '/dinein'});
  this.route('takeout', {path: '/'});
  this.route('takeout', {path: 'takeout'});
  this.route('profileCreate',{
    path:'/profileCreate/:email',
    data: function() {
      var templateData = {
        email: this.params.email
      };
      
      return templateData;
    }
  });
});
