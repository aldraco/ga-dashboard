// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsFactory', 'lodash', function($scope, Events, _) {
		$scope.loadMessage = 'Loading events ...';

		Events.query().$promise.then(function(events) {
			$scope.events = events;
			$scope.countryCount = _.countBy(events, 'country');
		});
		
	}]);