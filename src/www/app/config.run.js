angular.module('youdle')
  .run(function($ionicPlatform) {
    var APPLICATION_ID = 'E11DA057-CE8C-0C31-FF22-59965520EB00',
      SECRET_KEY = '119B6906-EF1E-A3D9-FFD9-3CFA191F0B00',
      VERSION = 'v1'; //default application version;

    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
