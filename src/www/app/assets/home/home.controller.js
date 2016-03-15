(function () {
    'use strict';

    angular
        .module('youdlePrototype' )
        .controller('homeController', homeController);

    homeController.$inject = ['homeFactory', 'localStorageFactory', 'loggerFactory'];

    function homeController(homeFactory, localStorageFactory, loggerFactory) {

        var vm = this;
        vm.title = 'Home';

        activate();

        function activate()
        {
          homeFactory.getCards()
            .then(function(response)
            {
              // TODO - not sure that using the homeModel is really a good idea
              vm.cards = homeFactory.homeModel.cards;
            },
            function(errors)
            {
              // TODO - display something on page that something went wrong
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
