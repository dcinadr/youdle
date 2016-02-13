(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .controller('loginController', loginController);

  loginController.$inject = ['loginFactory', '$state', '$ionicHistory'];

  function loginController(loginFactory, $state, $ionicHistory)
  {
    var vm = this;

    vm.activate = function()
    {

    }

    vm.submitLogin = function()
    {
      if (!vm.email || !vm.password)
      {
        console.log('email and password must be entered');
        return;
      }

      loginFactory.login({
        login: vm.email,
        password: vm.password
      })
      .then(function(response)
      {
        $state.go('home');
      },
      function(errors)
      {
        console.error('error logging in.', errors);
      });
    }

    vm.activate();
  }
})();
