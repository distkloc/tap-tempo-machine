'use strict';

/**
 * @ngdoc overview
 * @name tapTempoMachineApp
 * @description
 * # tapTempoMachineApp
 *
 * Main module of the application.
 */
angular
  .module('tapTempoMachineApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'rx'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
