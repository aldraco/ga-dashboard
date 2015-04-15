'use strict';

beforeEach(module('EventsDashboard'));

describe('Dashboard Controller: \n', function() {
	var $httpBackend;

	

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;

		$httpBackend.expectGET('http://micky.zyring.com/fullEvents').respond([
			{
				id: "14b509776b2f4-0dbf5be9080d068-7c6b1235-140000-14b509776b31",
				eventCount: 0,
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

		it('should initialize controller with two items', 
			inject(function($rootScope, $controller, EventsFactory) {
			
			var $scope = $rootScope.$new();

			$controller('DashboardController', {$scope:$scope, EventsFactory:EventsFactory});

			$httpBackend.flush();

			expect($scope.events.length).toBe(2);
			expect($scope.events[0].eventCount).toBe(0);
		
		}));
});


