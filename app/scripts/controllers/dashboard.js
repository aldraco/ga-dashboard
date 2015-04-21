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
			console.log("this many entries filtered: ",$scope.filteredEvents[0], $scope.filteredEvents[5821]);

			// todo: index the events by date?

			byCountry(events);

			$scope.$watch('startDate', function(newValue, old) {
				console.log("start date changed", (Date.parse(newValue)/1000));
				var newFilter = timeFilter($scope.allEvents, {startDate: (Date.parse(newValue)/1000), endDate: (Date.parse($rootScope.endDate)/1000)});
				$scope.filteredEvents = newFilter;
				console.log(newFilter[0]);
			});

			$scope.$watch('endDate', function(newValue, old) {
				console.log(newValue);
			});

			$scope.$watch('filteredEvents', function(newValue, oldValue) {
				console.log("filtered events changed");
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
			console.log("this is the rnage that was passed in", range);
			return _.filter(events, function(n) {
				return ((n.timestamp >= range.startDate) && (n.timestamp <= range.endDate));
			});
		};

		




		
	}]);