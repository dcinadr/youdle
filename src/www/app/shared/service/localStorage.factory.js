(function()
{
  'use strict';

  angular
    .module('youdlePrototype.service')
    .factory('localStorageFactory', localStorageFactory);

    localStorageFactory.$inject = ['$window'];

  function localStorageFactory($window)
  {
    var service = {
      set: set,
      get: get,
      setObject: setObject,
      getObject: getObject
    };

    return service;

    function set(key, value)
    {
      $window.localStorage[key] = value;
    }

    function get(key, defaultValue)
    {
      return $window.localStorage[key] || defaultValue;
    }

    function setObject(key, value)
    {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getObject(key)
    {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})();
