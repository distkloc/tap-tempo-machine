(function () {
  'use strict';
  
  function addClickEventObservable(rx, tapTempo) {
    return function (scope, element) {
      tapTempo.add(rx.Observable.fromEvent(element, 'click'));
    };
  }

  angular
    .module('tapTempoMachineApp')
    .directive('clickCollector', addClickEventObservable);

  addClickEventObservable.$inject = ['rx', 'tapTempo'];

})();


