(function() {
  'use strict';

  angular
    .module('youdle')
    .controller('introController', introController);

  introController.$inject = ['localStorageFactory', 'introFactory', '$state', 'loggerFactory'];

  function introController(localStorageFactory, introFactory, $state, loggerFactory) {
    var vm = this;

    vm.activate = function() {
      autoLogin();
    }

    vm.activate();

    // if the user has already logged in previously automatically login the user in
    function autoLogin() {
      var userToken = localStorageFactory.get('userToken');
      if (!userToken) {
        return;
      }
      introFactory.isUserValid(userToken)
        .then(function(response) {
          if (response.data) {
            var userObjectId = localStorageFactory.get('userObjectId');
            loggerFactory.info('com.youdle.intro', 'user returning with valid user token.  userObjectId: ' + userObjectId);
            $state.go('app.home');
          }
        }, function(errors) {
          console.error('problem checking if user is valid', errors);
        });
    }
  }
})();
