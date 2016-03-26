(function()
{
  'use strict';

  angular
    .module('youdle')
    .factory('loginFactory', loginFactory);

  loginFactory.$inject = ['$q', 'userLoginApiFactory'];

  function loginFactory($q, userLoginApiFactory)
  {
    var service = {
      login: login
    };

    return service;

    function login(data)
    {
      return userLoginApiFactory.post(data)
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
