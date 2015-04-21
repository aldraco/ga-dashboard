// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsProvider', 'lodash', function($scope, Events, _) {
		var self = this;
		var countryCount;
		var filteredEvents;

		$scope.loadMessage = 'Loading events ...';
		

		Events.then(function(events) {
			$scope.allEvents = events;
			self.filteredEvents = events;
			$scope.loadMessage = '';

			byCountry(events);
		
		});

		$scope.testMessage = 'test';

		$scope.$watch('startDate', function(newValue, oldValue) {
			//alert("Start Date changed");
		});

		$scope.$watch('endDate', function(newValue, oldValue) {
			//alert("End date changed");
		});

		function reset() {
			self.filteredEvents = $scope.allEvents;
		};

		function byCountry(events) {
			self.countryCount = _.countBy(events, 'country');

			$scope.byCountry = {
				labels: Object.keys(self.countryCount),
				data: _.values(self.countryCount)
			};
		};




		
	}]);