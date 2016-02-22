(function () {
    'use strict';

    angular
        .module('youdlePrototype' )
        .controller('homeController', homeController);

    homeController.$inject = ['homeFactory', 'localStorageFactory'];

    function homeController(homeFactory, localStorageFactory) {

        var vm = this;
        vm.title = 'Home';

        activate();

        function activate()
        {
          homeFactory.getCards()
            .then(function(response)
            {
              vm.cards = response.data.data;
              calcVoteTotals();
            },
            function(errors)
            {
              console.error('problem loading cards', errors);
            }
          );
        }

        function calcVoteTotals()
        {
          angular.forEach(vm.cards, function(card, cardKey)
          {
            var cardVoteCount = 0;
            angular.forEach(card.options, function(option, optionKey)
            {
              cardVoteCount += option.users.length;
            });
            vm.cards[cardKey].voteCount = cardVoteCount;
          });
        }

        function calcPercentage(card, vmOption, responseOption)
        {
          var optionUsers = responseOption.users.length;
          var percentage;
          if (optionUsers == 0)
          {
            percentage = 0;
          }
          else
          {
            percentage = (optionUsers / card.voteCount) * 100;
          }
          vmOption.votePercentage = percentage + '%';
        }

        vm.selectOption = function(card, option)
        {
          card.showResults = true;
          var userObjectId = localStorageFactory.get('userObjectId');
          var userToken = localStorageFactory.get('userToken');
          homeFactory.selectOption(option.objectId, userObjectId, userToken)
            .then(function(response)
            {
              // no matter what option the user selected it has increase the card vote count by 1 
              // but only if the user was actually added !!!!!!!!!
              card.voteCount++;
              calcPercentage(card, option, response.data);
            },
            function(errors)
            {

            });
        }
    }
})();
