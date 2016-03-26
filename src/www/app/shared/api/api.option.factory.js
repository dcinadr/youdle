(function()
{
  'use strict';

  angular
    .module('youdle.api')
    .factory('optionApiFactory', optionApiFactory);

  optionApiFactory.$inject = ['$http'];

  function optionApiFactory($http)
  {
    var service = {

    };

    return service;
  }
})();
