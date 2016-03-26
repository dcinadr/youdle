(function()
{
  'use strict';

  angular
    .module('youdle')
    .factory('signupFactory', signupFactory);

  signupFactory.$inject = ['$q', 'userRegistrationApiFactory'];

  function signupFactory($q, userRegistrationApiFactory)
  {
    var service = {
      register: register
    };

    return service;

    function register(data)
    {
      return userRegistrationApiFactory.post(data)
        .then(function(response)
        {
          return response;
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }
  }
})();
