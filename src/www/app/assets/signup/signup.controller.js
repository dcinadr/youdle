(function()
{
  'use strict';

  angular
    .module('youdlePrototype')
    .controller('signupController', signupController);

  signupController.$inject = ['signupFactory'];

  function signupController(signupFactory)
  {
    var vm = this;

    vm.activate = function()
    {

    }

    vm.submitClick = function()
    {
      signupFactory.register(
        {
          name: vm.first + ' ' + vm.last,
          password: vm.password,
          email: vm.email,
          username: vm.username
        })
        .then(function(response)
        {
          console.log('success');
        },
        function(errors)
        {
          console.error('error', errors);
        });
    }

    vm.activate();
  }
})();
