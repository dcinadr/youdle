(function ()
{
    'use strict';

    angular
      .module('youdle')
      .factory('introFactory', introFactory);

    introFactory.$inject = ['$q', 'userLoginApiFactory', 'facebookLoginApiFactory', 'facebookFactory', 'userFactory'];

    function introFactory($q, userLoginApiFactory, facebookLoginApiFactory, facebookFactory, userFactory)
    {
        var service = {
            isUserValid: isUserValid,
            facebookLogin: facebookLogin,
            backendlessFacebookLogin: backendlessFacebookLogin,
            getFacebookLoginStatus: getFacebookLoginStatus,
            facebookInit: facebookInit,
            getFacebookInfo: getFacebookInfo,
            getUserProperties: getUserProperties
        };

        function getUserProperties(objectId)
        {
          return userFactory.getUserProperties(objectId)
            .then(function(response)
            {
              return response;
            },
            function(errors)
            {
              return $q.reject(errors);
            })
        }

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
              return $q.reject(errors);
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
              return $q.reject(errors);
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

        function backendlessFacebookLogin(accessToken)
        {
          return facebookFactory.backendlessLogin(accessToken)
            .then(function(response)
            {
              return response;
            },
            function(errors)
            {
              return errors;
            });
        }

        function getFacebookInfo()
        {
          return facebookFactory.api("me/?fields=email,first_name,last_name,gender,birthday", ["public_profile, user_birthday"])
            .then(function(response)
            {
              return response;
            },
            function(errors)
            {
              return $q.reject(errors);
            })
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
