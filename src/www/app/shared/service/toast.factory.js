(function()
{
  'use strict';

  angular
    .module('youdle.service')
    .factory('toastFactory', toastFactory);

  toastFactory.$inject = ['$cordovaToast'];

  function toastFactory($cordovaToast)
  {
    var service = {
      showLongBottom: showLongBottom
    };

    return service;

    function showLongBottom(message)
    {
      $cordovaToast.showLongBottom(message)
        .then(function(response)
        {
          console.debug('Toast; showLongBottom success.  ', response);
        },
        function(errors)
        {
          console.error('Toast error; showLongBottom failed.  ', errors);
        });
    }

    // TODO - add the rest of the toast methods
  }
})();
