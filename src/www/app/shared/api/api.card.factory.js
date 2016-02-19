(function()
{
  'use strict';

  angular
    .module('youdlePrototype.api')
    .factory('cardApiFactory', cardApiFactory);

  cardApiFactory.$inject = ['$http', '$q'];

  function cardApiFactory($http, $q)
  {
    var service = {
      get: get
    };

    return service;

    function get(data, userToken)
    {
      return $http(
        {
          method: 'GET',
          url: 'https://api.backendless.com/v1/data/card?loadRelations=answers,user',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST',
            'user-token': userToken
          },
          data: data
        });
    }
  }
})();
