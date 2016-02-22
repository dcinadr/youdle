(function()
{
  'use strict';

  angular
    .module('youdlePrototype.api')
    .factory('optionSelectedApiFactory', optionSelectedApiFactory);

  optionSelectedApiFactory.$inject = ['$http'];

  function optionSelectedApiFactory($http)
  {
    var service = {
      put: put
    };

    return service;

    function put(data, option_objectId, userToken)
    {
      return $http(
        {
          method: 'PUT',
          url: 'https://api.backendless.com/v1/data/option/' + option_objectId,
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
