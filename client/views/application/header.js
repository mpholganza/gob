UI.registerHelper('showLoginButtons', function() {
  if ('takeout' === Router.current().route.name) {
    return true;
  }
  return false;
});

UI.registerHelper('showHIW', function() {
  if ('takeout' === Router.current().route.name) {
    return true;
  }
  return false;
});

UI.registerHelper('showAbout', function() {
  if ('takeout' === Router.current().route.name) {
    return true;
  }
  return false;
});

UI.registerHelper('showRestaurants', function() {
  if ('takeout' === Router.current().route.name) {
    return true;
  }
  return false;
});