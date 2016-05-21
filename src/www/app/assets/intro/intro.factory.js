(function() {
  'use strict';

  angular
    .module('youdle')
    .factory('introFactory', introFactory);

  introFactory.$inject = ['$q', 'userLoginApiFactory'];

  function introFactory($q, userLoginApiFactory) {
    var service = {
      isUserValid: isUserValid
    };

    return service;

    function isUserValid(userToken) {
      return userLoginApiFactory.get(userToken)
        .then(function(response) {
            return response;
          },
          function(errors) {
            return $q.reject(errors);
          });
    }
  }
})();
