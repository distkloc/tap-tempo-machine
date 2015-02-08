'use strict';

angular
  .module('tapTempoMachineApp')
  .factory('tapTempo', ['rx', function (rx) {

    var observables = [];

    return {
      add: function (observable) {
        observables.push(observable);
      },

      bpmSource: function () {
        var source = rx.Observable.merge(observables)
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
