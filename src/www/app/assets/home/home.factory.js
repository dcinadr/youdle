(function() {
  'use strict';

  angular
    .module('youdle')
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$q', 'cardApiFactory', 'addOptionUserApiFactory', '$filter', 'localStorageFactory', 'loggerFactory', 'constants'];

  function homeFactory($q, cardApiFactory, addOptionUserApiFactory, $filter, localStorageFactory, loggerFactory, constants) {
    var homeModel = {};

    var service = {
      getCards: getCards,
      selectOption: selectOption,
      homeModel: homeModel
    };

    return service;

    function getCards() {
      return cardApiFactory.getAll()
        .then(function(response) {
            try {
              homeModel.cards = response.data.data;
              modifyResultsForDisplay();
            } catch (e) {
              loggerFactory.error('com.youdle.home', e.message, e);
              return $q.reject(e.message);
            }

            return;
          },
          function(errors) {
            loggerFactory.error('com.youdle.home', errors.data, errors);
            return $q.reject(errors);
          });
    }

    function selectOption(optionObjectId, cardObjectId, userObjectId, userToken) {
      var data = {
        optionObjectId: optionObjectId,
        cardObjectId: cardObjectId,
        userObjectId: userObjectId
      };
      return addOptionUserApiFactory.post(data, userToken)
        .then(function(response) {
            var updatedCard = response.data;
            var logMessage = 'option selected on card.  optionObjectId: ' +
              optionObjectId + ' cardObjectId: ' + cardObjectId +
              ' userObjectId: ' + userObjectId;
            loggerFactory.info('com.youdle.home', logMessage);
            setCategoryIcon(updatedCard);
            setDateFormat(updatedCard);
            setTopOption(updatedCard.options);
            return updatedCard;
          },
          function(errors) {
            loggerFactory.error('com.youdle.home', errors.data.message, errors.statusText);
            return $q.reject(errors);
          });
    }

    // show results if user has already answered
    // apply icons
    function modifyResultsForDisplay() {
      var userObjectId = localStorageFactory.get('userObjectId');
      var currentTopPercentage = 0;
      for (var cardIndex = 0; cardIndex < homeModel.cards.length; cardIndex++) {
        var card = homeModel.cards[cardIndex];
        setCategoryIcon(card);
        setDateFormat(card);
        setTopOption(card.options);
        for (var optionIndex = 0; optionIndex < card.options.length; optionIndex++) {
          var option = card.options[optionIndex];
          for (var userIndex = 0; userIndex < option.users.length; userIndex++) {
            var user = option.users[userIndex];
            if (user.objectId == userObjectId) {
              card.showResults = true;
              break;
            }
          }
        }
      };
    }

    function setCategoryIcon(card) {
      var category = $filter('filter')(constants.categories, {
        name: card.category
      })[0];
      if (category) {
        card.categoryIcon = category.icon;
      }
    }

    function setTopOption(options) {
      var topPercentage = Math.max.apply(Math, options.map(function(option) {
        return option.percentage;
      }));
      angular.forEach(options, function(option, optionIndex) {
        if (option.percentage == topPercentage) {
          this[optionIndex].top = true;
        }
      }, options);
    }

    function setDateFormat(card) {
      card.closeDateDisplay = dateFormat(card.closeDate, 'mmm dS');
    }
  }
})();
