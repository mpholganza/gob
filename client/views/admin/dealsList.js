Template.dealsList.isAdmin = function () {
  return true;
};

Template.dealsList.deals = function() {
  return Deals.find();
};

Template.dealItem.events({
  'click #deliverButton': function(e) {
    Meteor.call('textDelivered', this._id);
  }
});