Template.accountCreate.events({
  'submit form': function(e) {
    e.preventDefault();
    //Template._loginButtons.toggleDropdown();
		var email = $(e.target).find('[name=email]').val();
    var password = $(e.target).find('[name=password]').val();
    
    var profile = {
      firstName: $(e.target).find('[name=firstName]').val(),
      lastName: $(e.target).find('[name=lastName]').val(),
      phoneNumber: $(e.target).find('[name=phoneNumber]').val(),
      building: $(e.target).find('[name=building]').val()
    }
    
    Accounts.createUser({
      email: email,
      password: password,
      profile: profile
    });
  },
  'click #homeButton': function(e) {
    Router.go('takeout');
  },
  'keypress #phoneNumber': function(e) {
    /*e.preventDefault();
    phoneInput = document.getElementById('phoneNumber');
    
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
   
    // Only allow numbers to be typed
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return;
    }
    
    var char = String.fromCharCode(charCode);
    
    var numbers = phoneInput.value.replace(/\D/g, '');
    numbers += char;
    alert(numbers);
    
    var phoneFormat = '(___) ___-____';
    var charPosition = phoneFormat.split('_', numbers.length).join('_').length;
    
    // doesn't work since strings are immutable
    //phoneFormat[charPosition] = numbers[numbers.length - 1];
    
    var newPhoneFormat = phoneFormat.substring(0,charPosition) + numbers[numbers.length - 1] + phoneFormat.substring(charPosition + 1, phoneFormat.length);
    //phoneInput.value = '';

    phoneInput.value = newPhoneFormat;*/
  }
});

Template.accountCreate.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    $("#phoneNumber").mask("(999) 999-9999");
  }
};