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
      refreshCard: refreshCard,
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

    function refreshCard(card)
    {
      return cardApiFactory.get(card.objectId)
        .then(function(response)
        {
          card = response.data;
          getCardFromModel(card.objectId);
          processCard(card);
          return true;  // return true if nothing went wrong
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }

    function getCardFromModel(objectId)
    {
      // cardArray should only be 1 item
      var cardArray = $filter('filter')(homeModel.cards, {objectId: objectId}, true);
    }

    function selectOption(optionObjectId, cardObjectId, userObjectId, userToken)
    {
      var data = {
        optionObjectId: optionObjectId,
        cardObjectId: cardObjectId,
        userObjectId: userObjectId
      };
      // var data = {
      //   __meta: "users:" + userObjectId,
      //   users: [{objectId: userObjectId, ___class: 'Users'}]
      // };
      return optionApiFactory.post(data, userToken)
      //return optionApiFactory.put(data, optionObjectId, userToken)
        .then(function(response)
        {
          return response;
        },
        function(errors)
        {
          return $q.reject(errors);
        });
    }

    function processAllCards()
    {
      // go through each card and calc percentages
      angular.forEach(homeModel.cards, function(card, cardKey)
      {
        processCard(card);
      });
    }

    function processCard(card)
    {
      calcPercentages(card);
    }

    function calcPercentages(card)
    {
      var totalVotes = getTotalVotes(card);
      // set percentage for each option
      angular.forEach(card.options, function(option, optionKey)
      {
        var optionPercentage = option.users.length == 0 ? 0: option.users.length / totalVotes;
        optionPercentage = optionPercentage * 100;
        card.options[optionKey].percentage = optionPercentage;
        card.options[optionKey].percentageDisplay = optionPercentage + '%';
      });
    }

    function getTotalVotes(card)
    {
      var totalVotes = 0;
      // optimization: this could be removed if the total number of votes was stored in the card entity
      angular.forEach(card.options, function(option, optionKey)
      {
        totalVotes += option.users.length;
      });
      return totalVotes;
    }
  }
})();
