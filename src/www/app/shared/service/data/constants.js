(function() {
  'use strict';

  angular
    .module('youdle.service')
    .constant('constants', {
      categories: [{
        name: 'Sports',
        icon: 'hawcons-icon-11-baseball-set'
      }, {
        name: 'News',
        icon: 'fa fa-newspaper-o'
      }, {
        name: 'Business',
        icon: 'fa fa-line-chart'
      }, {
        name: 'Life',
        icon: 'fa fa-group'
      }, {
        name: 'Technology',
        icon: 'fa fa-power-off'
      }, {
        name: 'Entertainment',
        icon: 'fa fa-music'
      }]
    });
})();
