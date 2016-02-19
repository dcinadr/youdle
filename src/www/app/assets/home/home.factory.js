(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$q', 'cardApiFactory'];

  function homeFactory($q, cardApiFactory)
  {
    var service = {
      getCards: getCards
    };

    return service;

    function getCards()
    {
      return cardApiFactory.get()
        .then(function(response)
        {
          return response.data.data;
        },
        function(errors)
        {
          return $q.reject(errors);
        });

    }
  }
})();
