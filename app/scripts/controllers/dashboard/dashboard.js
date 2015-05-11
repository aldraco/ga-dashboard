// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsProvider', 'CountryCodes', 'lodash', 
                            function($scope, Events, Codes, _) {
			
		// initialization function
		Events.then(function(events) {
			// map the three-letter country codes onto the two

        var threeCodes = _.map(events, function(event) {
          var o = {};

          o = _.extend(event, {country: Codes[event.country]});
          return o;

        });

      // change the value of event.country to the value at code[event.country]


      $scope.allEvents = events;
      $scope.filteredEvents = _.sortBy(events, 'timestamp');
      $scope.countryCount = _.countBy($scope.filteredEvents, 'country');
      
      // the datepicker scope broadcasts an event when the dates change
      $scope.$on('dateChangeEvent', function() {
        var newValue = timeFilter($scope.allEvents, {startDate: $scope.startDate, endDate: $scope.endDate});
        $scope.filteredEvents = newValue;
        $scope.countryCount = _.countBy(newValue, 'country');
        // child scopes simply watch the filtered events for changes
      });

     


		
		});

		function timeFilter(events, range) {
      return _.filter(events, function(n) {
				return ((n.timestamp >= (range.startDate/1000)) && (n.timestamp <= (range.endDate/1000)));
			});
		};


		
	}]);