'use strict';

/**
 * @ngdoc function
 * @name tapTempoMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tapTempoMachineApp
 */
angular.module('tapTempoMachineApp')
  .controller('MainCtrl', ['$scope', '$timeout', 'tapTempo', function ($scope, $timeout, tapTempo) {

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

    $scope.$on('tapTempo.update', function() {
      tapTempo.bpmSource()
      .safeApply($scope, function (x) {
        $scope.bpm = x;
      })
      .subscribe();
    });
  }]);
