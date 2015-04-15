// Dashboard/Events controller

angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsFactory', function($scope, EventsFactory) {
		$scope.getEvents = function() {
			$scope.events = "Fetching Data ...";
			EventsFactory.getEvents().then(function(events) {
				$scope.events = events;
			}, function() {
				$scope.events = "Could not obtain data at this time.";
			});
		}
		$scope.getEvents();
		
	}]);