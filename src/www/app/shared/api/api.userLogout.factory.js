(function() {
  'use strict';

  angular
    .module('youdle')
    .factory('userLogoutApiFactory', userLogoutApiFactory);

  userLogoutApiFactory.$inject = ['$http', '$q'];

  function userLogoutApiFactory($http, $q) {
    var service = {
      get: get
    };

    return service;

    function get(userToken) {
      return $http({
        method: 'GET',
        url: 'https://api.backendless.com/v1/users/logout',
        headers: {
          'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
          'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
          'user-token': userToken,
          'application-type': 'REST'
        }
      });
    }
  }
})();
