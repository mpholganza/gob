Template.takeout.events({
  'submit form': function(e) {
    e.preventDefault();
    //Template._loginButtons.toggleDropdown();
		var email = $(e.target).find('[name=email]').val();
    Router.go('accountCreate', {email: email});
  }
});

$('body').scrollspy({ target: '#header-nav' });