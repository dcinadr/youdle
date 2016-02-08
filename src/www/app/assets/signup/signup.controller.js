(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .controller('signupController', signupController);

  signupController.$inject = ['signupFactory', '$state'];

  function signupController(signupFactory, $state)
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
          console.log('success');
          $state.go('home');
        },
        function(errors)
        {
          console.error('error', errors);
        });
    }

    vm.activate();
  }
})();
