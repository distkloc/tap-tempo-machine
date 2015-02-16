(function () {
  'use strict';

  function flash($timeout, tapTempo) {
    return function (scope, element, attrs) {
      var source = tapTempo.getSourceBy(attrs.lightning);

      if(!source) {
        return;
      }

      source.safeApply(scope, function () {
        scope.targetSource = attrs.lightning;

        $timeout(function () {
          scope.targetSource = '';
        }, 50);
      })
      .subscribe();
    };
  }

  angular
    .module('tapTempoMachineApp')
    .directive('lightning', flash);

  flash.$inject = ['$timeout', 'tapTempo'];

})();

