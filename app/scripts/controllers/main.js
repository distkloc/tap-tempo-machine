'use strict';

/**
 * @ngdoc function
 * @name tapTempoMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tapTempoMachineApp
 */
angular.module('tapTempoMachineApp')
  .controller('MainCtrl', ['$scope', 'tapTempo', '$timeout', function ($scope, tapTempo, $timeout) {

    $scope.bpm = 0;

    var clickSource = $scope.$createObservableFunction('collectClick');
    tapTempo.add(clickSource);

    clickSource.subscribe(function () {
      $scope.clicked = 'clicked';

      $timeout(function () {
        $scope.clicked = '';
      }, 50);
    });

    $scope.$on('tapTempo.update', function() {
      tapTempo.bpmSource()
      .safeApply($scope, function (x) {
        $scope.bpm = x;
      })
      .subscribe();
    });

  }]);
