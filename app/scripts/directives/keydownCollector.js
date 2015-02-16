(function () {
  'use strict';

  function addKeydownEventObservable(tapTempo, $document) {
    return {
      compile: function compile() {
        return {
          pre: function preLink() {
            var source = $document.keydownAsObservable()
              .where(function (e) {
                return e.keyCode === 74; //J key
              });

            tapTempo.add('keydown', source);
          }
        };
      }
    };
  }

  angular
    .module('tapTempoMachineApp')
    .directive('keydownCollector', addKeydownEventObservable);

  addKeydownEventObservable.$inject = ['tapTempo', '$document'];

})();
