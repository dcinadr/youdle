(function()
{
  'use strict';

  angular
    .module('youdlePrototype.api')
    .factory('optionApiFactory', optionApiFactory);

  optionApiFactory.$inject = ['$http'];

  function optionApiFactory($http)
  {
    var service = {
      //put: put,
      post: post
    };

    return service;

    function post(data, userToken)
    {
      return $http(
        {
          method: 'POST',
          url: 'https://api.backendless.com/v1/servercode/events/AddOptionUser',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST',
            'Content-Type': 'application/json',
            'user-token': userToken
          },
          data: data
        });
    }
  }
})();
