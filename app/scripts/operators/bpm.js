Rx.Observable.prototype.bpm = function (count, monitoredTimeSpan) {
  'use strict';
  
  var ts = monitoredTimeSpan || 10000;

  return this.timeInterval()
    .skip(1)
    .pluck('interval')
    .where(function (i) {
      return i <= ts;
    })
    .windowWithCount(count, 1)
    .selectMany(function (elements) {
      return elements.average();
    })
    .map(function (duration) {
      return Math.round(60000 / duration);
    });

};

