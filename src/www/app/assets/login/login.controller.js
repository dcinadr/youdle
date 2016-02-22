(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .controller('loginController', loginController);

  loginController.$inject = ['loginFactory', '$state', '$ionicHistory', 'localStorageFactory'];

  function loginController(loginFactory, $state, $ionicHistory, localStorageFactory)
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
        $ionicHistory.nextViewOptions({
          historyRoot: true  // if successfully navigating to home page we want to make that the root page
        });
        localStorageFactory.set('userObjectId', response.data.objectId);
        localStorageFactory.set('userToken', response.data['user-token']);
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
