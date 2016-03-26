(function()
{
  'use strict';

  angular
    .module('youdle.api')
    .factory('cardApiFactory', cardApiFactory);

  cardApiFactory.$inject = ['$http', '$q'];

  function cardApiFactory($http, $q)
  {
    var service = {
      getAll: getAll,
      get: get
    };

    return service;

    function getAll()
    {
      return $http(
        {
          method: 'GET',
          url: 'https://api.backendless.com/v1/data/card?loadRelations=options,user',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST'
          }
        });
    }

    function get(objectId)
    {
      return $http(
        {
          method: 'GET',
          url: 'https://api.backendless.com/v1/data/card/' + objectId + '?loadRelations=options,user',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST'
          }
        });
    }
  }
})();
