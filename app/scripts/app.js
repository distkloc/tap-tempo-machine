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
  .factory('tapTempo', ['rx', function (rx) {

    var observables = [];

    return {
      add: function (observable) {
        observables.push(observable);
      },

      bpmSource: function () {
        var source = rx.Observable.merge(observables)
                    .timeInterval()
                    .skip(1)
                    .pluck('interval')
                    .where(function (i) {
                      return i <= 10000;
                    });

        return source.windowWithCount(8, 1)
              .merge(source.windowWithCount(4, 1).take(7))
              .selectMany(function (x) {
                return x.average();
              })
              .map(function (duration) {
                return Math.round(60000 / duration);
              });

      }
    };
  }])
  .directive('tapTempo', ['$rootScope', function($rootScope) {
    return function(scope, element) {
      var keydownEvent = 'keydown',
          clickEvent = 'click';

      var tap = function() {
        $rootScope.$broadcast('tap');
      };

      element.on(keydownEvent, function(e) {
        if (e.keyCode === 74) {
          tap();
        }
      });

      element.on(clickEvent, function() {
        tap();
      });

      scope.$on('$destroy', function () {
        element.off(keydownEvent);
        element.off(clickEvent);
      });
    };
  }])
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
