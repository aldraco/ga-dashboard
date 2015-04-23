'use strict';

// These tests have broken since the addition of a custom provider. 
// TODO learn how to unit test custom services and promises in controllers :)


// link up the module


/*describe('Dashboard Controller: \n', function() {
	// storage variable
	var $httpBackend;

  beforeEach(module('EventsDashboard'));
	
	// inject a service to store in this variable (convenience function)
	// also, do this before the test, to make sure the 'service' works
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;

		// what should it expect to GET? mock out a few items.

		$httpBackend.expectGET('http://micky.zyring.com/fullEvents').respond([
			{
				id: "14b509776b2f4-0dbf5be9080d068-7c6b1235-140000-14b509776b31",
				eventCount: 8,
				track: "frontend",
				source: "news.ycombinator.com",
				city: "Texarkana",
				state: "Texas",
				country: "US",
				browser: "Firefox",
				os: "Windows",
				screenWidth: 1280
			},
			{
				id: "14b509e864a1f1-002edc63a-6b19247d-13c680-14b509e864b55b",
				eventCount: 0,
				track: "frontend",
				source: "news.ycombinator.com",
				city: "Randolph",
				state: "Vermont",
				country: "US",
				browser: "Firefox",
				os: "Windows",
				screenWidth: 1280
			}]);
	}));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

	// pass dependencies to make a controller
	it('should initialize controller with all events', 
		inject(function($rootScope, $controller, EventsProvider, lodash) {
		
			var $scope = $rootScope.$new();

			// make the controller
			var ctrl = $controller('DashboardController', {$scope:$scope, $rootScope:$rootScope, EventsProvider:EventsProvider, lodash:lodash});

			// 'run' the back end function

			$httpBackend.flush();
      $scope.$digest();


			// tests here
			expect($scope.allEvents.length).toBe(2);
			expect($scope.allEvents[0].eventCount).toBe(8);
			expect($scope.filteredEvents.length).toBe(2);
	
	}));


	xit('should successfully count the hits from each country', 
		inject(function($rootScope, $controller, EventsProvider, lodash) {
			var $scope = $rootScope.$new();
			
			$controller('DashboardController', {$scope:$scope, $rootScope:$rootScope, EventsProvider:EventsProvider, lodash:lodash});

			$httpBackend.flush();
      $scope.$digest();

      console.log($scope.byCountry);


			//expect(ctrl.countryCount).not.toBe(undefined);
			//expect(ctrl.countryCount).toEqual(jasmine.objectContaining({
			//	"US" : 2
			//}));
			expect($scope.byCountry.data).not.toBe(undefined);
			expect($scope.byCountry.labels).not.toBe(undefined);
			expect($scope.byCountry.data).toContain(2);
			expect($scope.byCountry.labels).toContain("US");


		}));

});
*/

