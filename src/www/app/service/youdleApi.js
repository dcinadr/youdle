(function ()
{
    'use strict';

    angular
        .module('youdlePrototype')
        .factory('youdleApi', youdleApi);

    youdleApi.$inject = ['$http'];

    function youdleApi($http)
    {
        var service = {
            getYoudleCards: getYoudleCards
        };

        return service;

        function getYoudleCards()
        {
            return [
                {
                    cardId: 1,
                    question: 'Which seasons greetings do you prefer?',
                    answers: ['Happy Holidays', 'Merry Christmas']
                },
                {
                    cardId: 2,
                    question: 'Do you shop on Black Friday for your Christmas shopping?',
                    answers: ['Yes', 'Maybe', 'No']
                },
                {
                    cardId: 3,
                    question: 'Should Planned Parenthood be defunded?',
                    answers: ['Yes', 'No']
                }
            ];
        }
    }
})();
