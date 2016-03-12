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
                // TODO - not sure that using the homeModel is really a good idea
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
          var userObjectId = localStorageFactory.get('userObjectId');
          var userToken = localStorageFactory.get('userToken');
          homeFactory.selectOption(option.objectId, card.objectId, userObjectId, userToken)
            .then(function(response)
            {
              response.showResults = true;
              angular.copy(response, card);
            },
            function(errors)
            {
              console.error('problem selecting option', errors);
            });
        }
    }
})();
