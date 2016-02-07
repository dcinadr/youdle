(function () {
    'use strict';

    angular
        .module('youdlePrototype' )
        .controller('homeController', homeController);

    homeController.$inject = ['youdleApi'];

    function homeController(youdleApi) {

        var vm = this;
        vm.title = 'Home';

        activate();

        function activate()
        {
          vm.cards = youdleApi.getYoudleCards();
        }
    }
})();
