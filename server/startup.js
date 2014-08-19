Meteor.startup(function () {
  Future = Npm.require('fibers/future');

  SyncedCron.start();

});