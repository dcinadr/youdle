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
              if (response)
              {
                vm.cards = homeFactory.homeModel.cards;
              }
              else
              {
                console.error('problem handling getCards response.')
              }
            },
            function(errors)
            {
              console.error('problem loading cards', errors);
            }
          );
        }

        vm.selectOption = function(card, option)
        {
          card.showResults = true;
          //card.options[0].percentageDisplayed = 'test';
          var userObjectId = localStorageFactory.get('userObjectId');
          var userToken = localStorageFactory.get('userToken');
          homeFactory.selectOption(option.objectId, card.objectId, userObjectId, userToken)
            .then(function(response)
            {
              angular.copy(response.options, card.options);
              // card.options[0].percentageDisplayed = response.options[0].percentageDisplayed;
              // card.options[1].percentageDisplayed = response.options[1].percentageDisplayed;
              //angular.copy(card, response);
              // if (response)
              // {
              //   angular.copy(vm.cards, homeFactory.homeModel.cards);
              // }
              // else
              // {
              //   // todo handle error
              // }
              // card = response;
              // todo - need to update the card that is returned
               //refreshCard(card);
            },
            function(errors)
            {
              console.error('problem selecting option', errors);
            });
        }

        function refreshCard(card)
        {
          homeFactory.refreshCard(card)
            .then(function(response)
            {
              console.debug('card refreshed');
            },
            function(errors)
            {
              console.error('problem refreshing card', errors);
            });
        }
    }
})();
