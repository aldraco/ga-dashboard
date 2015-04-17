'use strict';

describe('Controller: NavigationController', function () {

  // load the controller's module
  beforeEach(module('EventsDashboard'));

  var NavigationController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavigationController = $controller('NavigationController', {
      $scope: scope
    });
  }));

  it('should have an active tab being tracked', function () {
    expect(scope.activeTab).toBe('home');

  });
});
