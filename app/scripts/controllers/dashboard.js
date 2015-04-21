// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', '$rootScope', 'EventsProvider', 'lodash', function($scope, $rootScope, Events, _) {
		var self = this;
		$scope.byCountry;
		$scope.filteredEvents;
		$scope.allEvents;
		
		
		// initialization function
		Events.then(function(events) {
			$scope.allEvents = events;
			$scope.filteredEvents = _.sortBy(events, 'timestamp');
			

			// todo: index the events by date?

			byCountry(events);

			$scope.$watch('startDate', function(newValue, old) {
				var newStart = timeFilter($scope.allEvents, {startDate: (Date.parse(newValue)/1000), endDate: (Date.parse($rootScope.endDate)/1000)});
				$scope.filteredEvents = newStart;
			});

			$scope.$watch('endDate', function(newValue, old) {
				var newEnd = timeFilter($scope.allEvents, {startDate: (Date.parse($rootScope.startDate)/1000), endDate: (Date.parse(newValue)/1000)});
				console.log("end date");
				$scope.filteredEvents = newEnd;
			});

			// when the date range filter changes, run the functions to get the new data again
			$scope.$watch('filteredEvents', function(newValue, oldValue) {
				console.log(newValue.length);
				byCountry(newValue);
			});

		
		});



		// Helper functions for calculating data
		// These run on init but also can be called again when data changes

		function byCountry(events) {
			var countryCount = _.countBy(events, 'country');

			$scope.byCountry = {
				labels: Object.keys(countryCount),
				data: _.values(countryCount)
			};
		};

		function timeFilter(events, range) {
			return _.filter(events, function(n) {
				return ((n.timestamp >= range.startDate) && (n.timestamp <= range.endDate));
			});
		};

		




		
	}]);