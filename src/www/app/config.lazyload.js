angular.module('youdle')
  .config([
    '$ocLazyLoadProvider',
    function($ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
          debug: true,
          events: true,
          modules: [{
              // name: 'dropzone',
              // files: [
              //   'lib/modules/angular-dropzone/dropzone.min.js',
              //   'lib/modules/angular-dropzone/angular-dropzone.js'
            ]
          }]
      });
  }]);
