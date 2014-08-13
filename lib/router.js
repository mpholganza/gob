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
  
  /* admin routes */
  this.route('dealsList', {path: 'admin/deals_list'});
  this.route('buildingCreate', {path: 'admin/building_create'})
  
  /* server routes */
  this.route('pathToText', {
    path: '/api/pathToText',
    where: 'server',
    action: function() {
      var requestType = this.request.method;
      var requestBody = this.request.body;
      var textFrom = requestBody.From;
      var textTo = requestBody.To;
      var textBody = requestBody.Body;
      
      var textInfo = '<p>FROM: ' + textFrom + '</p>' + '<p>TO: ' + textTo + '</p>' + '<p>BODY: ' + textBody + '</p>';
      var response = '<html><body><h1>' + requestType + ' with body: ' + requestBody + '</h1>' + textInfo + '</body></html>';

      console.log(response);
      this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.end(response);
      
      if (requestType === "POST") {
        Meteor.call('textDispatcher', textFrom, textBody);
        // Meteor.call('sendText', textFrom);
      }
    }
  });
});