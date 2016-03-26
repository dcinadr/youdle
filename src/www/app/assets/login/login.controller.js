(function()
{
  'use strict';

  angular
    .module('youdle')
    .controller('loginController', loginController);

  loginController.$inject = ['loginFactory', '$state', '$ionicHistory', 'localStorageFactory', 'loggerFactory'];

  function loginController(loginFactory, $state, $ionicHistory, localStorageFactory, loggerFactory)
  {
    var vm = this;
    vm.errorMessage = '';  // temp for debug

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
        loggerFactory.info('com.youdle.login', 'user logged in successfully.  userObjectId: ' + response.data.objectId);
        $state.go('app.home');
      },
      function(errors)
      {
        // temporary for debug
        vm.errorMessage = errors.data;

        loggerFactory.error('com.youdle.login', errors.data, errors);
        console.error('error logging in.', errors);
      });
    }

    vm.activate();
  }
})();
