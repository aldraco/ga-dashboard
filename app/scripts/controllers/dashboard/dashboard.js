// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', '$rootScope', 'EventsProvider', 'lodash', function($scope, $rootScope, Events, _) {
			
		// initialization function
		Events.then(function(events) {
			$scope.allEvents = events;
			$scope.filteredEvents = _.sortBy(events, 'timestamp');

      
      // watch the dates for changes
      $scope.$watchGroup(['startDate', 'endDate'], function(newDates, oldDates, scope) {
        var newValue = timeFilter($scope.allEvents, {startDate: newDates[0], endDate: newDates[1]});
        $scope.filteredEvents = newValue;
      });
		
		});

		function timeFilter(events, range) {
      return _.filter(events, function(n) {
				return ((n.timestamp >= (range.startDate/1000)) && (n.timestamp <= (range.endDate/1000)));
			});
		};


		
	}]);