UI.registerHelper('showLoginButtons', function() {
  if ('accountCreate' === Router.current().route.name) {
    return false;
  }
  
  return true;
});