(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$q', 'cardApiFactory', 'optionSelectedApiFactory'];

  function homeFactory($q, cardApiFactory, optionSelectedApiFactory)
  {
    var service = {
      getCards: getCards,
      selectOption: selectOption
    };

    return service;

    function getCards()
    {
      return cardApiFactory.get()
        .then(function(response)
        {
          return response;
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }

    function selectOption(optionObjectId, userObjectId, userToken)
    {
      var data = {
        __meta: "users:" + userObjectId,
        users: [{objectId: userObjectId, ___class: 'Users'}]
      };
      return optionSelectedApiFactory.put(data, optionObjectId, userToken)
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
