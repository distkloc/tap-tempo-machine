(function () {
  'use strict';
  
  function addClickEventObservable(rx, tapTempo, $timeout) {
    return function (scope, element) {
      var source = rx.Observable.fromEvent(element, 'click');
      tapTempo.add(source);

      flashElement(scope, source, $timeout);
    };
  }

  function flashElement(scope, source, $timeout) {
    source.safeApply(scope, function () {
      scope.clicked = 'clicked';

      $timeout(function () {
        scope.clicked = '';
      }, 50);
    })
    .subscribe();
  }

  angular
    .module('tapTempoMachineApp')
    .directive('clickCollector', addClickEventObservable);

  addClickEventObservable.$inject = ['rx', 'tapTempo', '$timeout'];

})();


