(function()
{
  'use strict';

  angular
    .module('youdle')
    .controller('signupController', signupController);

  signupController.$inject = ['signupFactory', '$state', '$ionicHistory'];

  function signupController(signupFactory, $state, $ionicHistory)
  {
    var vm = this;


    vm.activate = function()
    {
        //initial state.
        vm.initialValidation = false;
        vm.firstNameValid = true;
        vm.lastNameValid = true;
        vm.emailValid = true;
        vm.userEmailErrorMsg = "";
        vm.passwordValid = true;
        vm.passwordConfirmValid = true;
        vm.userNameValid = true;
        vm.userNameErrMsg = "";
        vm.showGeneralErrMsg = false;
     }

    vm.isValidValues = function () {
       
       vm.firstNameValid = ((vm.first != undefined) && (vm.first.length > 0)) ;
       vm.lastNameValid = (vm.last != undefined) && (vm.last.length > 0) ;
       vm.emailValid = validateEmail(vm.email);
       vm.userEmailErrorMsg = vm.emailValid ? "" : "Email is not in the correct format";

       vm.userNameValid = ((vm.username != undefined) && (vm.username.length >= 3));
       vm.passwordValid = ((vm.password != undefined) && (vm.password.length >= 6));
       vm.passwordConfirmValid = ((vm.password === vm.passwordConfirm) && vm.passwordValid );
       return (vm.firstNameValid && vm.lastNameValid && vm.emailValid && vm.passwordValid && vm.passwordConfirmValid);
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    vm.submitClick = function()
    {
      vm.initialValidation = true;
      if (!vm.isValidValues())
            return;


      signupFactory.register(
        {
          name: vm.first + ' ' + vm.last,
          password: vm.password,
          email: vm.email,
          username: vm.username
        })
        .then(function(response)
        {
          // TODO: need to actually have the user login in to the app before navigating
          $ionicHistory.nextViewOptions({
            historyRoot: true  // if successfully navigating to home page we want to make that the root page
          });
          $state.go('app.home');
        },
        function(errors)
        {
            //We should only handle 3033 code, for now, and display the message to the user.
            //All other items are internal errors or are already validated before we submit to the backend (to save round trips).
            switch (errors.data.code) {
                case 3033://Email already exists
                    vm.emailValid = false;
                    vm.userEmailErrorMsg = "This email already exists";
                    return;
                default:
                    vm.showGeneralErrMsg = true;

                    console.error('registration error', errors);
              }
        });
    }

  }
})();
