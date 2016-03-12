(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$q', 'cardApiFactory', 'optionApiFactory', '$filter'];

  function homeFactory($q, cardApiFactory, optionApiFactory, $filter)
  {
    var homeModel = {};

    var service = {
      getCards: getCards,
      selectOption: selectOption,
      homeModel: homeModel
    };

    return service;

    function getCards()
    {
      return cardApiFactory.getAll()
        .then(function(response)
        {
          homeModel.cards = response.data.data;
          processAllCards();

          return true;  // return true if nothing went wrong
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }

    function selectOption(optionObjectId, cardObjectId, userObjectId, userToken)
    {
      var data = {
        optionObjectId: optionObjectId,
        cardObjectId: cardObjectId,
        userObjectId: userObjectId
      };
      return optionApiFactory.post(data, userToken)
        .then(function(response)
        {
          var updatedCard = response.data;
          return updatedCard;
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }
  }
})();
