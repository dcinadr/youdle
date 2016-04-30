(function()
{
  'use strict';

  angular
    .module('youdle')
    .factory('enumsFactory', enumsFactory);

  enumsFactory.$inject = [];

  function enumsFactory()
  {
    var service = {
      category: {'sports': 1, 'news': 2};
    };

    return service;
  }
})();
