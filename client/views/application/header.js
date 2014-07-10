UI.registerHelper('showLoginButtons', function() {
  if ('accountCreate' === Router.current().route.name) {
    return false;
  }
  
  return true;
});

UI.registerHelper('showHIW', function() {
  if ('accountCreate' === Router.current().route.name) {
    return false;
  }
  
  return true;
});

UI.registerHelper('showAbout', function() {
  if ('accountCreate' === Router.current().route.name) {
    return false;
  }
  
  return true;
});