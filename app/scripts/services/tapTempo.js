'use strict';

angular
  .module('tapTempoMachineApp')
  .factory('tapTempo', ['rx', '$rootScope', function (rx, $rootScope) {

    var observables = [];

    return {
      add: function (key, observable) {
        var kvp = {};
        kvp.name = key;
        kvp.observable = observable;

        observables.push(kvp);
        $rootScope.$broadcast('tapTempo.update');
      },

      getSourceBy: function (name) {
        return observables.filter(function (kvp) {
          return kvp.name === name;
        })
        .map(function (kvp) {
          return kvp.observable;
        })[0];
      },

      bpmSource: function () {
        var sources = observables.map(function (kvp) {
          return kvp.observable;
        });

        return rx.Observable
          .merge(sources)
          .bpm(4);

      }
    };
  }]);
