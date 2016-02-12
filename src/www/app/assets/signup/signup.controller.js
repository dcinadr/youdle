(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .controller('signupController', signupController);

  signupController.$inject = ['signupFactory', '$state', '$ionicHistory'];

  function signupController(signupFactory, $state, $ionicHistory)
  {
    var vm = this;

    vm.activate = function()
    {

    }

    vm.submitClick = function()
    {
      if (!vm.first || !vm.email || !vm.password)
      {
        console.log('invalid data.  will not submit registration request.');
        return;
      }
      if (vm.password != vm.passwordConfirm)
      {
        console.log('passwords do not match.  will not submit registration request.');
        return;
      }

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
