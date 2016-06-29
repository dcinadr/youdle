
(function ()
{
  'use strict';

  angular
    .module('youdle.service')
    .factory('facebookFactory', facebookFactory);

  facebookFactory.$inject = ['$q', 'facebookLoginApiFactory'];

  function facebookFactory($q, facebookLoginApiFactory)
  {
    var isFacebookInit = false;

    var service = {
      init: init,
      backendlessLogin: backendlessLogin,
      login: login,
      getIsFacebookInit: getIsFacebookInit,
      initFacebookIfNeeded: initFacebookIfNeeded,
      getLoginStatus: getLoginStatus,
      api: api
    };

    function getIsFacebookInit()
    {
      return isFacebookInit;
    }

    function initFacebookIfNeeded()
    {
      if (!isFacebookInit)
      {
        init();
      }
    }

    function init()
    {
      if (window.cordova && window.cordova.platformId != 'browser')
      {
        console.log('browser init not necessary for phone app.  setting init to true...');
        isFacebookInit = true;
      }
      else
      {
        try
        {
          console.log('initializing facebook for first time use...');
          // this is using the facebook app id - maybe need to get this from a
          // more secure place
          facebookConnectPlugin.browserInit('1066959203376447', 'v2.6');
          console.log('facebook initialized!');
          isFacebookInit = true;
        }
        catch (e)
        {
          console.error('facebook initialization failed.', e);
        }
      }
    }

    function backendlessLogin(accessToken)
    {
      var data = {
        "accessToken": accessToken,
        "fieldsMapping": {
          'name': 'name',
          'email': 'email',
        }
      };
      return facebookLoginApiFactory.post(data);
    }

    function login()
    {
      var deferred = $q.defer();

      facebookConnectPlugin.login(['public_profile', 'email', 'user_birthday'],
        function(response)
        {
          deferred.resolve(response);
        },
        function(response)
        {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function getLoginStatus()
    {
      var deferred = $q.defer();

      facebookConnectPlugin.getLoginStatus(
        function(response)
        {
          deferred.resolve(response);
        },
        function(response)
        {
          deferred.reject(response);
        }
      );

      return deferred.promise;
    }

    function api(requestPath, permissions)
    {
      var deferred = $q.defer();

      facebookConnectPlugin.api(requestPath, permissions,
        function(response)
        {
          deferred.resolve(response);
        },
        function(response)
        {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    return service;
  }
})();
