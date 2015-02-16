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

        var source = rx.Observable.merge(sources)
                    .timeInterval()
                    .skip(1)
                    .pluck('interval')
                    .where(function (i) {
                      return i <= 10000;
                    });

        return source.windowWithCount(8, 1)
              .merge(source.windowWithCount(4, 1).take(7))
              .selectMany(function (x) {
                return x.average();
              })
              .map(function (duration) {
                return Math.round(60000 / duration);
              });

      }
    };
  }]);
