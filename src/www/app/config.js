var app = angular.module('youdle')
  .config(
    [
      '$provide',
      function($provide) {
        app.constant = $provide.constant;
        app.value = $provide.value;
      }
    ]);


    // angular.module('youdle')
    //   .config(
    //     [
    //       '$cordovaFacebookProvider',
    //       function($cordovaFacebookProvider) {
    //         var appID = 1066959203376447;
    //         var version = 'v2.6'; // or leave blank and default is v2.0
    //         $cordovaFacebookProvider.browserInit(appID, version);
    //       }
    //     ]);


// config for facebook plugin for browser
// Only required for development in browser, not cordova!
// angular.module('youdle')
//   .config(function($cordovaFacebookProvider) {
//     var appID = 1066959203376447;
//     var version = 'v2.6'; // or leave blank and default is v2.0
//     $cordovaFacebookProvider.browserInit(appID, version);
//   });
