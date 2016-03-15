(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$q', 'cardApiFactory', 'addOptionUserApiFactory', '$filter', 'localStorageFactory', 'loggerFactory'];

  function homeFactory($q, cardApiFactory, addOptionUserApiFactory, $filter, localStorageFactory, loggerFactory)
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
          try
          {
            homeModel.cards = response.data.data;
            showRelevantResults();
          }
          catch (e)
          {
            loggerFactory.error('Global logger', e.message, e);
            return $q.reject(e.message);
          }

          return;
        },
        function(errors)
        {
          loggerFactory.error('Global logger', errors.data, errors);
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
      return addOptionUserApiFactory.post(data, userToken)
        .then(function(response)
        {
          var updatedCard = response.data;
          return updatedCard;
        },
        function(errors)
        {
          loggerFactory.error('Global logger', errors.data, errors);
          return $q.reject(errors);
        });
    }

    // show results if user has already answered
    function showRelevantResults()
    {
      var userObjectId = localStorageFactory.get('userObjectId');
      for (var cardIndex = 0; cardIndex < homeModel.cards.length; cardIndex++)
      {
        var card = homeModel.cards[cardIndex];
        for (var optionIndex = 0; optionIndex < card.options.length; optionIndex++)
        {
          var option = card.options[optionIndex];
          for (var userIndex = 0; userIndex < option.users.length; userIndex++)
          {
            var user = option.users[userIndex];
            if (user.objectId == userObjectId)
            {
              card.showResults = true;
              break;
            }
          }
        }
      };
    }
  }
})();
