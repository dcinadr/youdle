(function() {
  'use strict';

  angular
    .module('youdle')
    .controller('layoutController', layoutController);

  layoutController.$inject = ['localStorageFactory', '$state', 'loggerFactory', 'layoutFactory'];

  function layoutController(localStorageFactory, $state, loggerFactory, layoutFactory) {
    var vm = this;

    vm.activate = function() {

    }

    vm.activate();

    vm.logout = function() {
      var userToken = localStorageFactory.get('userToken');
      layoutFactory.logoutUser(userToken)
        .then(function(response) {
          localStorageFactory.set('userToken', undefined);
          var userObjectId = localStorageFactory.get('userObjectId');
          loggerFactory.debug('com.youdle.layout', 'user logging out.  userObjectId: ' + userObjectId);
          $state.go('intro');
        }, function(errors) {
          console.error('problem logging out', errors);
        });
    }
  }
})();
