// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', '$rootScope', 'EventsProvider', 'CountryCodes', 'lodash', function($scope, $rootScope, Events, Codes, _) {
			
		// initialization function
		Events.then(function(events) {
			// map the three-letter country codes onto the two

        var threeCodes = _.map(events, function(event) {
          var o = {};

          o = _.extend(event, {country: Codes[event.country]});
          return o;

        });
        console.log("threecodes", threeCodes);

      // change the value of event.country to the value at code[event.country]


      $scope.allEvents = events;
      $scope.filteredEvents = _.sortBy(events, 'timestamp');
      $scope.countryCount = _.countBy($scope.filteredEvents, 'country');

      
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