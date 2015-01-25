'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tapTempoMachineApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    // Backfill for Phantom.js / JSCore
    // https://github.com/Reactive-Extensions/RxJS/issues/281
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (context) {
        var self = this;
        return function () {
          return self.apply(context, arguments);
        };
      };
    }

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

  }));

  it('should set bpm 0 to the scope', function () {
    expect(scope.bpm).toBe(0);
  });
});
