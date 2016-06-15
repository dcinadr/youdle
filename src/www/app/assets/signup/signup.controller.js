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
        vm.initialState = true;
        vm.firstNameValid = false;
        vm.lastNameValid = false;
        vm.emailValid = false;
        vm.passwordValid = false;
        vm.passwordConfirmValid = false;
        vm.userNameValid = false;
     }

    vm.isValidValues = function () {
       
       vm.firstNameValid = (vm.first != undefined) && (vm.last.length > 0);
       vm.lastNameValid = (vm.last!=undefined) && (vm.last.length >0);
       vm.emailValid = validateEmail(vm.email);
       vm.userNameValid = ((vm.username != undefined) && (vm.username.length >=3));
       vm.passwordValid = ((vm.password !=undefined) && (vm.password.length>=6)) ;
       vm.passwordConfirmValid = ((vm.password === vm.passwordConfirm) && vm.passwordValid);
       return (vm.firstNameValid && vm.lastNameValid && vm.emailValid && vm.passwordValid && vm.passwordConfirmValid);
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    vm.submitClick = function()
    {
        vm.initialState = false;
      if (!vm.isValidValues())
            return;

      //if (!vm.first || !vm.email || !vm.password)
      //{
      //  console.log('invalid data.  will not submit registration request.');
      //  return;
      //}
      //if (vm.password != vm.passwordConfirm)
      //{
      //  console.log('passwords do not match.  will not submit registration request.');
      //  return;
      //}

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
          $state.go('home');
        },
        function(errors)
        {
          // TODO: handle specific errors (identified in backendless documentation)
          console.error('registration error', errors);
        });
    }

    vm.activate();
  }
})();
