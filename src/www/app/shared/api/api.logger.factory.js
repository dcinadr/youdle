(function()
{
  'use strict';

  angular
    .module('youdle.api')
    .factory('loggerApiFactory', loggerApiFactory);

  loggerApiFactory.$inject = ['$http'];

  function loggerApiFactory($http)
  {
    var service = {
      put: put
    };

    return service;

    // note: it appears to be possible to log several log messages at once in an array of log messages
    //       if the number of requests seems to be a problem we may want to think about bundling them
    //       to reduce the number of api requests
    function put(data)
    {
      return $http(
        {
          method: 'PUT',
          url: 'https://api.backendless.com/v1/log',
          headers: {
            'application-id': 'E11DA057-CE8C-0C31-FF22-59965520EB00',
            'secret-key': '6E12B29C-A78E-4C99-FFFA-698C1EE7D200',
            'application-type': 'REST',
            'Content-Type': 'application/json'
          },
          data: data
        });
    }
  }
})();
