(function()
{
  'use strict';

  angular
    .module('youdle.service')
    .factory('userFactory', userFactory);

  userFactory.$inject = ['userPropertiesApiFactory', '$q'];

  function userFactory(userPropertiesApiFactory, $q)
  {
    var service = {
      getUserProperties: getUserProperties
    };

    function getUserProperties(objectId)
    {
      return userPropertiesApiFactory.get(objectId)
        .then(function(response)
        {
          return response;
        },
        function(errors)
        {
          return $q.reject(errors);
        })
    }

    return service;
  }
})();
