(function () {
  'use strict';

  function addKeydownEventObservable(tapTempo) {
    return function (scope, element) {
      var source = element.keydownAsObservable()
        .where(function (e) {
          return e.keyCode === 74; //J key
        });

      tapTempo.add(source);
    };
  }

  angular
    .module('tapTempoMachineApp')
    .directive('keydownCollector', addKeydownEventObservable);

  addKeydownEventObservable.$inject = ['tapTempo'];

})();
