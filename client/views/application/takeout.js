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
  },
  'click #logo-top':function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#top").offset().top
    }, 600);
  },
  'click #how-it-works':function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#hiw").offset().top
    }, 600);
  },
  'click #about-us':function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#about").offset().top
    }, 600);
  },
  'click #featured-restaurants':function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#restaurants").offset().top
    }, 600);
  }
});

$('body').scrollspy({ target: '#header-nav' });