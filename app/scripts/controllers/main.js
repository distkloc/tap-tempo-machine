'use strict';

/**
 * @ngdoc function
 * @name tapTempoMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tapTempoMachineApp
 */
angular.module('tapTempoMachineApp')
  .controller('MainCtrl', ['$scope', 'tapTempo', function ($scope, tapTempo) {

    $scope.bpm = 0;

    tapTempo.add('click', $scope.$createObservableFunction('collectClick'));

    $scope.$on('tapTempo.update', function() {
      tapTempo.bpmSource()
      .safeApply($scope, function (x) {
        $scope.bpm = x;
      })
      .subscribe();
    });

  }]);
