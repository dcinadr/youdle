(function () {
    'use strict';

    angular
        .module('youdlePrototype' )
        .controller('homeController', homeController);

    homeController.$inject = ['homeFactory'];

    function homeController(homeFactory) {

        var vm = this;
        vm.title = 'Home';

        activate();

        function activate()
        {
          homeFactory.getCards()
            .then(function(data)
            {
              vm.cards = data;
            },
            function(errors)
            {
              console.error('problem loading cards', errors);
            }
          );
        }
    }
})();
