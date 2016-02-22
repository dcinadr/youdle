// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('youdlePrototype', ['ionic', 'youdlePrototype.api', 'youdlePrototype.service'])

.run(function ($ionicPlatform)
{
    var APPLICATION_ID = 'E11DA057-CE8C-0C31-FF22-59965520EB00',
        SECRET_KEY = '119B6906-EF1E-A3D9-FFD9-3CFA191F0B00',
        VERSION = 'v1'; //default application version;

    // Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    //
    // function test(args)
    // {
    //   args = args || {};
    //   this.message = args.message || "";
    // }
    //
    // var dataStore = Backendless.Persistence.of(test);
    // var testObject = new test({message: "testing testing..."});
    // dataStore.save(testObject);

    $ionicPlatform.ready(function ()
    {
        if (window.cordova && window.cordova.plugins.Keyboard)
        {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar)
        {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider)
{
    $stateProvider

      .state('intro',
      {
        url: '/intro',
        templateUrl: 'app/assets/intro/intro.html'
      })
      .state('signup',
      {
        url: '/signup',
        templateUrl: 'app/assets/signup/signup.html',
        controller: 'signupController as vm'
      })
      .state('login',
      {
        url: '/login',
        templateUrl: 'app/assets/login/login.html',
        controller: 'loginController as vm'
      })
      .state('home',
      {
          url: '/home',
          templateUrl: 'app/assets/home/home.html',
          controller: 'homeController as vm'
      });

    $urlRouterProvider.otherwise('/intro');
})
