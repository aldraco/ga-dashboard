// Dashboard/Events controller

angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsFactory', function($scope, EventsFactory) {
		$scope.events;

		$scope.getAllEvents = function() {
			return EventsFactory.query({},function(events) {
				$scope.events = events;
				console.log("got events");
				console.log(events);
			});
		};

		$scope.getAllEvents();
		console.log($scope.events);
	}]);