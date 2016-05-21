(function() {
  'use strict';

  angular
    .module('youdle')
    .factory('layoutFactory', layoutFactory);

  layoutFactory.$inject = ['$q', 'userLogoutApiFactory'];

  function layoutFactory($q, userLogoutApiFactory) {
    var service = {
      logoutUser: logoutUser
    };

    return service;

    function logoutUser(userToken) {
      return userLogoutApiFactory.get(userToken)
        .then(function(response) {
            return response;
          },
          function(errors) {
            return $q.reject(errors);
          });
    }
  }
})();
