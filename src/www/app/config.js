var app = angular.module('youdle')
  .config(
    [
      '$provide',
      function($provide) {
        app.constant = $provide.constant;
        app.value = $provide.value;
      }
    ]);
