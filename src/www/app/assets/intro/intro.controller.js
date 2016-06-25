(function() {
  'use strict';

  angular
    .module('youdle')
    .controller('introController', introController);

  introController.$inject = ['localStorageFactory', 'introFactory', '$state', 'loggerFactory', '$ionicHistory', '$interval'];

  function introController(localStorageFactory, introFactory, $state, loggerFactory, $ionicHistory, $interval) {
    var vm = this;
    var facebookCheck;

    vm.activate = function ()
    {
      startFacebookCheck();
      autoLogin();
    }

    vm.activate();

    // this function periodically checks for the facebook sdk to be
    // loaded so that it can initializeFacebook.  This is done this way
    // because the sdk is load async and would cause an error otherwise
    function startFacebookCheck()
    {
      facebookCheck = $interval(function(){
        if (window.FB)
        {
          // when facebook is found we can stop checking and initialize;
          stopFacebookCheck();
        }
      }, 100);
    }

    // stop checking for facebook and initialize the framework
    function stopFacebookCheck()
    {
      if (angular.isDefined(facebookCheck))
      {
        $interval.cancel(facebookCheck);
        facebookCheck = undefined;
        initializeFacebook();  // after FB is found we can init
      }
    }

    // initialize the facebook framework
    function initializeFacebook()
    {
      introFactory.facebookInit();
      getFacebookLoginStatus();
    }

    vm.facebookClick = function ()
    {
      introFactory.facebookLogin()
        .then(function(response)
        {
          console.log('Log in to facebook successful.')
          console.log(response);

          // TODO - register in backendless
          // TODO - redirect to home page
        },
        function(errors)
        {
          // TODO - log in backendless
          // TODO - display error message back to user
          console.error('Log in to facebook failed.');
          console.error(errors);
        });

      // facebookConnectPlugin.getLoginStatus(
      //   function(success) {
      //     console.log(success);
      //   }
      // );
        //introFactory.facebookLogin().
        //    then(function (response)
        //    {
        //        // todo
        //    }, function (errors)
        //    {
        //        // todo
        //    });
    }

    function getFacebookLoginStatus()
    {
      introFactory.getFacebookLoginStatus()
        .then(function(response)
        {
          // TODO
          console.log(response);
        },
        function(errors)
        {
          // TODO
          console.error(errors);
        })
    }

    // if the user has already logged in previously automatically login the user in
    function autoLogin() {
      var userToken = localStorageFactory.get('userToken');
      if (!userToken) {
        return;
      }
      introFactory.isUserValid(userToken)
        .then(function(response) {
          if (response.data) {
            var userObjectId = localStorageFactory.get('userObjectId');
            loggerFactory.info('com.youdle.intro', 'user returning with valid user token.  userObjectId: ' + userObjectId);
            $ionicHistory.nextViewOptions({
              historyRoot: true // if successfully navigating to home page we want to make that the root page
            });
            $state.go('app.home');
          }
        }, function(errors) {
          console.error('problem checking if user is valid', errors);
        });
    }
  }
})();
