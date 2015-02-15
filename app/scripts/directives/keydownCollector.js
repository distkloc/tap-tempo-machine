(function () {
  'use strict';

  function addKeydownEventObservable(tapTempo, $document, $timeout) {
    return function (scope) {
      var source = $document.keydownAsObservable()
        .where(function (e) {
          return e.keyCode === 74; //J key
        });

      tapTempo.add(source);

      flashBackground(scope, source, $timeout);
    };
  }

  function flashBackground(scope, source, $timeout) {
    source.safeApply(scope, function () {
      scope.downed = 'downed';

      $timeout(function () {
        scope.downed = '';
      }, 50);
    })
    .subscribe();
  }

  angular
    .module('tapTempoMachineApp')
    .directive('keydownCollector', addKeydownEventObservable);

  addKeydownEventObservable.$inject = ['tapTempo', '$document', '$timeout'];

})();
