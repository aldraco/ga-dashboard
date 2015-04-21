'use strict';

// link up the module
beforeEach(module('EventsDashboard'));

describe('Dashboard Controller: \n', function() {
	// storage variable
	var $httpBackend;
	
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

	// pass dependencies to make a controller
	it('should initialize controller with both all events', 
		inject(function($rootScope, $controller, EventsFactory) {
		
			var $scope = $rootScope.$new();

			// make the controller
			var ctrl = $controller('DashboardController', {$scope:$scope, EventsFactory:EventsFactory});

			// 'run' the back end function
			$httpBackend.flush();


			// tests here
			expect($scope.allEvents.length).toBe(2);
			expect($scope.allEvents[0].eventCount).toBe(8);
			expect(ctrl.filteredEvents.length).toBe(2);
	
	}));


	it('should successfully count the hits from each country', 
		inject(function($rootScope, $controller, EventsFactory, lodash) {
			var $scope = $rootScope.$new();
			
			var ctrl = $controller('DashboardController', {$scope:$scope, EventsFactory:EventsFactory, lodash:lodash});

			$httpBackend.flush();

			expect(ctrl.countryCount).not.toBe(undefined);
			expect(ctrl.countryCount).toEqual(jasmine.objectContaining({
				"US" : 2
			}));
			expect($scope.byCountry.data).not.toBe(undefined);
			expect($scope.byCountry.labels).not.toBe(undefined);
			expect($scope.byCountry.data).toContain(2);
			expect($scope.byCountry.labels).toContain("US");


		}));

});


