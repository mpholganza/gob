Template.takeout.events({
  'submit form': function(e) {
    e.preventDefault();
    //Template._loginButtons.toggleDropdown();
		var email = $(e.target).find('[name=email]').val();
    if (email === null || email === '') {
      $('#join-now-errors').show();
    }
    Router.go('accountCreate', {email: email});
  },
  'keypress #emailInput': function(e) {
    $('#join-now-errors').hide();
  },
  'click #terms-link': function(e) {
    Router.go('terms');
  },
  'click #privacy-link': function(e) {
    Router.go('privacy');
  }
});

$('body').scrollspy({ target: '#header-nav' });