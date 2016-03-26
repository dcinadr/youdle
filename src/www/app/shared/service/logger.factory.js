(function()
{
  'use strict';

  angular
    .module('youdle.service')
    .factory('loggerFactory', loggerFactory);

  loggerFactory.$inject = ['loggerApiFactory'];

  function loggerFactory(loggerApiFactory)
  {
    var service = {
      debug: debug,
      info: info,
      trace: trace,
      warn: warn,
      error: error,
      fatal: fatal
    };

    return service;

    function debug(logger, message)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"DEBUG",
        "logger":logger,
        "timestamp":timestamp,
        "message":message
      }];
      log(data);
    }

    function info(logger, message)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"INFO",
        "logger":logger,
        "timestamp":timestamp,
        "message":message
      }];
      log(data);
    }

    function trace(logger, message)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"TRACE",
        "logger":logger,
        "timestamp":timestamp,
        "message":message
      }];
      log(data);
    }

    function warn(logger, message)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"WARN",
        "logger":logger,
        "timestamp":timestamp,
        "message":message
      }];
      log(data);
    }

    function error(logger, message, exception)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"ERROR",
        "logger":logger,
        "timestamp":timestamp,
        "message":message,
        "exception":exception
      }];
      log(data);
    }

    function fatal(logger, message, exception)
    {
      var timestamp = Date.now();
      var data = [{
        "log-level":"FATAL",
        "logger":logger,
        "timestamp":timestamp,
        "message":message,
        "exception":exception
      }];
      log(data);
    }

    function log(data)
    {
      loggerApiFactory.put(data)
        .then(function(response)
        {

        },
        function(error)
        {
          console.error("Failure logging message", error);
        });
    }
  }
})();
