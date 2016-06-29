
(function ()
{
    'use strict';

    angular
      .module('youdle.api')
      .factory('facebookLoginApiFactory', facebookLoginApiFactory);

    facebookLoginApiFactory.$inject = ['$http', '$q'];

    function facebookLoginApiFactory($http, $q)
    {
        var service = {
            post: post
        };

        function post(data)
        {
            return $http({
                method: 'POST',
                url: 'https://api.backendless.com/v1/users/social/facebook/sdk/login',
                headers: {
                    'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
                    'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
                    'application-type': 'REST',
                    'content-type': 'application/json'
                },
                data: data
            });
        }

        return service;
    }
})();
