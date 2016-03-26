(function()
{
  'use strict';

  angular
    .module('youdle.api')
    .factory('userRegistrationApiFactory', userRegistrationApiFactory);

  userRegistrationApiFactory.$inject = ['$http', '$q'];

  function userRegistrationApiFactory($http, $q)
  {
    var service = {
      post: post
    };

    return service;

    function post(data)
    {
      return $http(
        {
          method: 'POST',
          url: 'https://api.backendless.com/v1/users/register',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST',
            'content-type': 'application/json'
          },
          data: data
        });
    }
  }
})();
