
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
                url: 'https://api.backendless.com/v1/users/social/oauth/facebook/request_url',
                headers: {
                    //'Origin': 'http://youdle.test:8100',
                    //'Access-Control-Allow-Credentials': 'true',
                    //'Access-Control-Allow-Method': 'POST',
                    //'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
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
