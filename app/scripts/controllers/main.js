'use strict';

/**
 * @ngdoc function
 * @name tapTempoMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tapTempoMachineApp
 */
angular.module('tapTempoMachineApp')
  .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.bpm = 0;

    $scope.$on('tap', function () {
      $scope.$apply(function () {
        $scope.flash = 'flash';
        $scope.bgFlash = 'bg-flash';

        $timeout(function () {
          $scope.flash = '';
          $scope.bgFlash = '';
        }, 50);
      });
    });

    var source = $scope.$eventToObservable('tap')
            .timeInterval()
            .skip(1)
            .pluck('interval')
            .where(function (i) {
              return i <= 10000;
            });

    source.windowWithCount(8, 1)
    .merge(source.windowWithCount(4, 1).take(7))
    .selectMany(function (x) {
      return x.average();
    })
    .map(function (duration) {
      return Math.round(60000 / duration);
    })
    .safeApply($scope, function (x) {
      $scope.bpm = x;
    })
    .subscribe();
      
  }]);
