(function ()
{
    'use strict';

    angular
      .module('youdle')
      .factory('introFactory', introFactory);

    introFactory.$inject = ['$q', 'userLoginApiFactory', 'facebookLoginApiFactory', 'facebookFactory'];

    function introFactory($q, userLoginApiFactory, facebookLoginApiFactory, facebookFactory)
    {
        var service = {
            isUserValid: isUserValid,
            facebookLogin: facebookLogin,
            getFacebookLoginStatus: getFacebookLoginStatus,
            facebookInit: facebookInit
        };

        function facebookInit()
        {
          facebookFactory.initFacebookIfNeeded();
        }

        function isUserValid(userToken)
        {
            return userLoginApiFactory.get(userToken)
              .then(function (response)
              {
                  return response;
              }, function (errors)
              {
                  return $q.reject(errors);
              });
        }

        function getFacebookLoginStatus()
        {
          return facebookFactory.getLoginStatus()
            .then(function(response)
            {
              return response;
            },
            function(errors)
            {
              $q.reject(errors);
            })
        }

        function facebookLogin()
        {
          return facebookFactory.login()
            .then(function(response)
            {
              return response;
            },
            function(errors)
            {
              $q.reject(errors);
            });

          // TODO - register facebook user in backendless

          // var data = getFacebookLoginParameters();
          // return facebookLoginApiFactory.post(data)
          //     .then(function (response)
          //     {
          //         return response;
          //     }, function (errors)
          //     {
          //         return $q.reject(errors);
          //     });
        }

        function getFacebookLoginParameters()
        {
            // todo - need to break up "name" into "first" and "last" to handle names better
            return {
                "fieldsMapping": {
                    "name": "name",
                    "email": "email"
                },
                "redirect" : true,
                "permissions" : ["email"]
            }
        }

        return service;
    }
})();
