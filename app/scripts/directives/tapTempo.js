'use strict';

angular
  .module('tapTempoMachineApp')
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
  }]);
