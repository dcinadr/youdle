'use strict';
angular.module('youdle')
  .run(function($ionicPlatform) {
    var APPLICATION_ID = 'E11DA057-CE8C-0C31-FF22-59965520EB00',
      SECRET_KEY = '119B6906-EF1E-A3D9-FFD9-3CFA191F0B00',
      VERSION = 'v1'; //default application version;

    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(
    [
      '$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/intro');
        $stateProvider
          .state('intro', {
            url: '/intro',
            templateUrl: 'app/assets/intro/intro.html'
          })
          .state('signup', {
            url: '/signup',
            templateUrl: 'app/assets/signup/signup.html',
            controller: 'signupController as vm'
          })
          .state('login', {
            url: '/login',
            templateUrl: 'app/assets/login/login.html',
            controller: 'loginController as vm'
          })
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'app/assets/layout/layout.html'
          })
          .state('app.home', {
            url: '/home',
            views: {
              'mainContent': {
                templateUrl: 'app/assets/home/home.html',
                controller: 'homeController as vm',
                resolve: {
                  loadDependencies: [
                    '$ocLazyLoad',
                    function($ocLazyLoad) {
                      return $ocLazyLoad.load({
                        files: [
                          'app/shared/service/data/constants.js',
                          'app/assets/home/home.factory.js',
                          'app/assets/home/home.controller.js',
                        ]
                      })
                    }
                  ]
                }
              }
            },
            resolve: {

            }
          });

        // just here as an example for now
        // $urlRouterProvider
        //   .otherwise('/app/dashboard');
        // $stateProvider
        //   .state('app', {
        //     abstract: true,
        //     url: '/app',
        //     templateUrl: 'views/layout.html'
        //   })
        //   .state('app.dashboard', {
        //     url: '/dashboard',
        //     templateUrl: 'views/dashboard.html',
        //     ncyBreadcrumb: {
        //       label: 'Dashboard',
        //       description: ''
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/sparkline/jquery.sparkline.js',
        //               'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'lib/jquery/charts/flot/jquery.flot.pie.js',
        //               'lib/jquery/charts/flot/jquery.flot.tooltip.js',
        //               'lib/jquery/charts/flot/jquery.flot.orderBars.js',
        //               'app/controllers/dashboard.js',
        //               'app/directives/realtimechart.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('persian', {
        //     abstract: true,
        //     url: '/persian',
        //     templateUrl: 'views/layout-persian.html'
        //   })
        //   .state('persian.dashboard', {
        //     url: '/dashboard',
        //     templateUrl: 'views/dashboard-persian.html',
        //     ncyBreadcrumb: {
        //       label: 'داشبورد'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/sparkline/jquery.sparkline.js',
        //               'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'lib/jquery/charts/flot/jquery.flot.pie.js',
        //               'lib/jquery/charts/flot/jquery.flot.tooltip.js',
        //               'lib/jquery/charts/flot/jquery.flot.orderBars.js',
        //               'app/controllers/dashboard.js',
        //               'app/directives/realtimechart.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('arabic', {
        //     abstract: true,
        //     url: '/arabic',
        //     templateUrl: 'views/layout-arabic.html'
        //   })
        //   .state('arabic.dashboard', {
        //     url: '/dashboard',
        //     templateUrl: 'views/dashboard-arabic.html',
        //     ncyBreadcrumb: {
        //       label: 'لوحة القيادة'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/sparkline/jquery.sparkline.js',
        //               'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'lib/jquery/charts/flot/jquery.flot.pie.js',
        //               'lib/jquery/charts/flot/jquery.flot.tooltip.js',
        //               'lib/jquery/charts/flot/jquery.flot.orderBars.js',
        //               'app/controllers/dashboard.js',
        //               'app/directives/realtimechart.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.cms', {
        //     url: '/cms',
        //     templateUrl: 'views/cms.html',
        //     ncyBreadcrumb: {
        //       label: 'CMS',
        //       description: ' Manage Youdle content...'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load('toaster').then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/services/data/constants.js',
        //                   'app/services/api/api.card.factory.js',
        //                   'app/services/api/api.option.factory.js',
        //                   'app/services/card.factory.js',
        //                   'app/services/option.factory.js',
        //                   'app/controllers/cms.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     },
        //     controller: 'cmsController as vm'
        //   })
        //   .state('app.databoxes', {
        //     url: '/databoxes',
        //     templateUrl: 'views/databoxes.html',
        //     ncyBreadcrumb: {
        //       label: 'Databoxes',
        //       description: 'beyond containers'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/directives/realtimechart.js',
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.orderBars.js',
        //               'lib/jquery/charts/flot/jquery.flot.tooltip.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'lib/jquery/charts/flot/jquery.flot.selection.js',
        //               'lib/jquery/charts/flot/jquery.flot.crosshair.js',
        //               'lib/jquery/charts/flot/jquery.flot.stack.js',
        //               'lib/jquery/charts/flot/jquery.flot.time.js',
        //               'lib/jquery/charts/flot/jquery.flot.pie.js',
        //               'lib/jquery/charts/morris/raphael-2.0.2.min.js',
        //               'lib/jquery/charts/chartjs/chart.js',
        //               'lib/jquery/charts/morris/morris.js',
        //               'lib/jquery/charts/sparkline/jquery.sparkline.js',
        //               'lib/jquery/charts/easypiechart/jquery.easypiechart.js',
        //               'app/controllers/databoxes.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.widgets', {
        //     url: '/widgets',
        //     templateUrl: 'views/widgets.html',
        //     ncyBreadcrumb: {
        //       label: 'Widgets',
        //       description: 'flexible containers'
        //     }
        //   })
        //   .state('app.elements', {
        //     url: '/elements',
        //     templateUrl: 'views/elements.html',
        //     ncyBreadcrumb: {
        //       label: 'UI Elements',
        //       description: 'Basics'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/controllers/pagination.js',
        //               'app/controllers/progressbar.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.fontawesome', {
        //     url: '/fontawesome',
        //     templateUrl: 'views/font-awesome.html',
        //     ncyBreadcrumb: {
        //       label: 'FontAwesome',
        //       description: 'Iconic Fonts'
        //     }
        //   })
        //   .state('app.glyphicons', {
        //     url: '/glyphicons',
        //     templateUrl: 'views/glyph-icons.html',
        //     ncyBreadcrumb: {
        //       label: 'GlyphIcons',
        //       description: 'Sharp and clean symbols'
        //     }
        //   })
        //   .state('app.typicons', {
        //     url: '/typicons',
        //     templateUrl: 'views/typicons.html',
        //     ncyBreadcrumb: {
        //       label: 'Typicons',
        //       description: 'Vector icons'
        //     }
        //   })
        //   .state('app.weathericons', {
        //     url: '/weathericons',
        //     templateUrl: 'views/weather-icons.html',
        //     ncyBreadcrumb: {
        //       label: 'Weather Icons',
        //       description: 'Beautiful forcasting icons'
        //     }
        //   })
        //   .state('app.tabs', {
        //     url: '/tabs',
        //     templateUrl: 'views/tabs.html',
        //     ncyBreadcrumb: {
        //       label: 'Tabs',
        //       description: 'Tabs and Accordions'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/controllers/accordion.js',
        //               'app/controllers/tab.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.alerts', {
        //     url: '/alerts',
        //     templateUrl: 'views/alerts.html',
        //     ncyBreadcrumb: {
        //       label: 'Alerts',
        //       description: 'Tooltips and Notifications'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load('toaster').then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/alert.js',
        //                   'app/controllers/toaster.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.modals', {
        //     url: '/modals',
        //     templateUrl: 'views/modals.html',
        //     ncyBreadcrumb: {
        //       label: 'Modals',
        //       description: 'Modals and Wells'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/controllers/modal.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.buttons', {
        //     url: '/buttons',
        //     templateUrl: 'views/buttons.html',
        //     ncyBreadcrumb: {
        //       label: 'Buttons'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/controllers/button.js',
        //               'app/controllers/dropdown.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.nestablelist', {
        //     url: '/nestablelist',
        //     templateUrl: 'views/nestable-list.html',
        //     ncyBreadcrumb: {
        //       label: 'Nestable Lists',
        //       description: 'Dragable list items'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['ng-nestable']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/nestable.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.treeview', {
        //     url: '/treeview',
        //     templateUrl: 'views/treeview.html',
        //     ncyBreadcrumb: {
        //       label: 'Treeview',
        //       description: "Fuel UX's tree"
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['angularBootstrapNavTree']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/treeview.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.simpletables', {
        //     url: '/simpletables',
        //     templateUrl: 'views/tables-simple.html',
        //     ncyBreadcrumb: {
        //       label: 'Tables',
        //       description: 'simple and responsive tables'
        //     }
        //   })
        //   .state('app.datatables', {
        //     url: '/datatables',
        //     templateUrl: 'views/tables-data.html',
        //     ncyBreadcrumb: {
        //       label: 'Datatables',
        //       description: 'jquery plugin for data management'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['ngGrid']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/nggrid.js',
        //                   'lib/jquery/datatable/dataTables.bootstrap.css',
        //                   'lib/jquery/datatable/jquery.dataTables.min.js',
        //                   'lib/jquery/datatable/ZeroClipboard.js',
        //                   'lib/jquery/datatable/dataTables.tableTools.min.js',
        //                   'lib/jquery/datatable/dataTables.bootstrap.min.js',
        //                   'app/controllers/datatable.js'
        //                 ]
        //               });
        //             }
        //           );
        //
        //         }
        //       ]
        //     }
        //
        //   })
        //   .state('app.formlayout', {
        //     url: '/formlayout',
        //     templateUrl: 'views/form-layout.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Layouts'
        //     }
        //   })
        //   .state('app.forminputs', {
        //     url: '/forminputs',
        //     templateUrl: 'views/form-inputs.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Inputs'
        //     }
        //   })
        //   .state('app.formpickers', {
        //     url: '/formpickers',
        //     templateUrl: 'views/form-pickers.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Pickers',
        //       description: 'Data Pickers '
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['ui.select', 'ngTagsInput', 'daterangepicker', 'vr.directives.slider', 'minicolors', 'dropzone']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/select2.js',
        //                   'app/controllers/tagsinput.js',
        //                   'app/controllers/datepicker.js',
        //                   'app/controllers/timepicker.js',
        //                   'app/controllers/daterangepicker.js',
        //                   'lib/jquery/fuelux/spinbox/fuelux.spinbox.js',
        //                   'lib/jquery/knob/jquery.knob.js',
        //                   'lib/jquery/textarea/jquery.autosize.js',
        //                   'app/controllers/slider.js',
        //                   'app/controllers/minicolors.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.formwizard', {
        //     url: '/formwizard',
        //     templateUrl: 'views/form-wizard.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Wizard'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/fuelux/wizard/wizard-custom.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.formvalidation', {
        //     url: '/formvalidation',
        //     templateUrl: 'views/form-validation.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Validation',
        //       description: 'Bootstrap Validator'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/controllers/validation.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.formeditors', {
        //     url: '/formeditors',
        //     templateUrl: 'views/form-editors.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Editors'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['textAngular']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/textangular.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.forminputmask', {
        //     url: '/forminputmask',
        //     templateUrl: 'views/form-inputmask.html',
        //     ncyBreadcrumb: {
        //       label: 'Form Input Mask'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/inputmask/jasny-bootstrap.min.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.flot', {
        //     url: '/flot',
        //     templateUrl: 'views/flot.html',
        //     ncyBreadcrumb: {
        //       label: 'Flot Charts',
        //       description: 'attractive plotting'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'app/directives/realtimechart.js',
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.orderBars.js',
        //               'lib/jquery/charts/flot/jquery.flot.tooltip.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'lib/jquery/charts/flot/jquery.flot.selection.js',
        //               'lib/jquery/charts/flot/jquery.flot.crosshair.js',
        //               'lib/jquery/charts/flot/jquery.flot.stack.js',
        //               'lib/jquery/charts/flot/jquery.flot.time.js',
        //               'lib/jquery/charts/flot/jquery.flot.pie.js',
        //               'app/controllers/flot.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.morris', {
        //     url: '/morris',
        //     templateUrl: 'views/morris.html',
        //     ncyBreadcrumb: {
        //       label: 'Morris Charts',
        //       description: 'simple & flat charts'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/morris/raphael-2.0.2.min.js',
        //               'lib/jquery/charts/morris/morris.js',
        //               'app/controllers/morris.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.sparkline', {
        //     url: '/sparkline',
        //     templateUrl: 'views/sparkline.html',
        //     ncyBreadcrumb: {
        //       label: 'Sparkline',
        //       description: 'inline charts'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/sparkline/jquery.sparkline.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.easypiechart', {
        //     url: '/easypiechart',
        //     templateUrl: 'views/easypiechart.html',
        //     ncyBreadcrumb: {
        //       label: 'Easy Pie Charts',
        //       description: 'lightweight charts'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/easypiechart/jquery.easypiechart.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.chartjs', {
        //     url: '/chartjs',
        //     templateUrl: 'views/chartjs.html',
        //     ncyBreadcrumb: {
        //       label: 'ChartJS',
        //       description: 'Cool HTML5 Charts'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/chartjs/chart.js',
        //               'app/controllers/chartjs.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.profile', {
        //     url: '/profile',
        //     templateUrl: 'views/profile.html',
        //     ncyBreadcrumb: {
        //       label: 'User Profile'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load({
        //             serie: true,
        //             files: [
        //               'lib/jquery/charts/flot/jquery.flot.js',
        //               'lib/jquery/charts/flot/jquery.flot.resize.js',
        //               'app/controllers/profile.js'
        //             ]
        //           });
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.inbox', {
        //     url: '/inbox',
        //     templateUrl: 'views/inbox.html',
        //     ncyBreadcrumb: {
        //       label: 'Beyond Mail'
        //     }
        //   })
        //   .state('app.messageview', {
        //     url: '/viewmessage',
        //     templateUrl: 'views/message-view.html',
        //     ncyBreadcrumb: {
        //       label: 'Veiw Message'
        //     }
        //   })
        //   .state('app.messagecompose', {
        //     url: '/composemessage',
        //     templateUrl: 'views/message-compose.html',
        //     ncyBreadcrumb: {
        //       label: 'Compose Message'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['textAngular']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/textangular.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.calendar', {
        //     url: '/calendar',
        //     templateUrl: 'views/calendar.html',
        //     ncyBreadcrumb: {
        //       label: 'Full Calendar'
        //     },
        //     resolve: {
        //       deps: [
        //         '$ocLazyLoad',
        //         function($ocLazyLoad) {
        //           return $ocLazyLoad.load(['ui.calendar']).then(
        //             function() {
        //               return $ocLazyLoad.load({
        //                 serie: true,
        //                 files: [
        //                   'app/controllers/fullcalendar.js'
        //                 ]
        //               });
        //             }
        //           );
        //         }
        //       ]
        //     }
        //   })
        //   .state('app.timeline', {
        //     url: '/timeline',
        //     templateUrl: 'views/timeline.html',
        //     ncyBreadcrumb: {
        //       label: 'Responsive Timeline'
        //     }
        //   })
        //   .state('app.pricing', {
        //     url: '/pricing',
        //     templateUrl: 'views/pricing.html',
        //     ncyBreadcrumb: {
        //       label: 'Pricing Tables'
        //     }
        //   })
        //   .state('app.invoice', {
        //     url: '/invoice',
        //     templateUrl: 'views/invoice.html',
        //     ncyBreadcrumb: {
        //       label: 'Invoice Page'
        //     }
        //   })
        //   .state('login', {
        //     url: '/login',
        //     templateUrl: 'views/login.html',
        //     ncyBreadcrumb: {
        //       label: 'Login'
        //     }
        //   })
        //   .state('register', {
        //     url: '/register',
        //     templateUrl: 'views/register.html',
        //     ncyBreadcrumb: {
        //       label: 'Register'
        //     }
        //   })
        //   .state('lock', {
        //     url: '/lock',
        //     templateUrl: 'views/lock.html',
        //     ncyBreadcrumb: {
        //       label: 'Lock Screen'
        //     }
        //   })
        //   .state('app.typography', {
        //     url: '/typography',
        //     templateUrl: 'views/typography.html',
        //     ncyBreadcrumb: {
        //       label: 'Typography'
        //     }
        //   })
        //   .state('error404', {
        //     url: '/error404',
        //     templateUrl: 'views/error-404.html',
        //     ncyBreadcrumb: {
        //       label: 'Error 404 - The page not found'
        //     }
        //   })
        //   .state('error500', {
        //     url: '/error500',
        //     templateUrl: 'views/error-500.html',
        //     ncyBreadcrumb: {
        //       label: 'Error 500 - something went wrong'
        //     }
        //   })
        //   .state('app.blank', {
        //     url: '/blank',
        //     templateUrl: 'views/blank.html',
        //     ncyBreadcrumb: {
        //       label: 'Blank Page'
        //     }
        //   })
        //   .state('app.grid', {
        //     url: '/grid',
        //     templateUrl: 'views/grid.html',
        //     ncyBreadcrumb: {
        //       label: 'Bootstrap Grid'
        //     }
        //   })
        //   .state('app.versions', {
        //     url: '/versions',
        //     templateUrl: 'views/versions.html',
        //     ncyBreadcrumb: {
        //       label: 'BeyondAdmin Versions'
        //     }
        //   })
        //   .state('app.mvc', {
        //     url: '/mvc',
        //     templateUrl: 'views/mvc.html',
        //     ncyBreadcrumb: {
        //       label: 'BeyondAdmin Asp.Net MVC Version'
        //     }
        //   });
      }
    ]
  );
