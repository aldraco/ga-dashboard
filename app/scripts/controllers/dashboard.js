// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsFactory', 'lodash', function($scope, Events, _) {
		var self = this;

		$scope.loadMessage = 'Loading events ...';
		var countryCount;

		Events.query().$promise.then(function(events) {
			$scope.events = events;
			self.countryCount = _.countBy(events, 'country');

			$scope.byCountry = {
				labels: Object.keys(self.countryCount),
				data: _.values(self.countryCount)
			};

		});


		
	}]);