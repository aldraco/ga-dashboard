// Dashboard/Events controller

angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsFactory', function($scope, Events) {
		$scope.loadMessage = 'Loading events ...';

		$scope.events = Events.query();
		
	}]);