(function() {
  'use strict';

  angular
    .module('youdle.api')
    .factory('userPropertiesApiFactory', userPropertiesApiFactory);

  userPropertiesApiFactory.$inject = ['$http'];

  function userPropertiesApiFactory($http)
  {
    var service = {
      get: get
    };

    return service;

    function get(objectId) {
      return $http({
        method: 'GET',
        url: 'https://api.backendless.com/v1/users/' + objectId + '?props=age,email,lastLogin,name,socialAccount,userStatus',
        headers: {
          'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
          'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
          'application-type': 'REST'
        }
      });
    }
  }
})();
