// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', '$rootScope', 'EventsProvider', 'lodash', function($scope, $rootScope, Events, _) {
		var self = this;
		$scope.byCountry;
		$scope.filteredEvents;
		$scope.allEvents;
    $scope.series = ['Data by Week'];
		
		
		// initialization function
		Events.then(function(events) {
			$scope.allEvents = events;
			$scope.filteredEvents = _.sortBy(events, 'timestamp');
			
			// todo: index the events by date?

			byCountry(events);
      divideByWeek(events);

      
      // watch the dates for changes
      $scope.$watchGroup(['startDate', 'endDate'], function(newDates, oldDates, scope) {
        var newValue = timeFilter($scope.allEvents, {startDate: newDates[0], endDate: newDates[1]});
        $scope.filteredEvents = newValue;
      });

      // when the date range filter changes, run the functions to get the new data again
      $scope.$watch('filteredEvents', function(newValue, oldValue) {
        byCountry(newValue);
        divideByWeek($scope.filteredEvents);
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
				return ((n.timestamp >= (range.startDate/1000)) && (n.timestamp <= (range.endDate/1000)));
			});
		};

    function divideByWeek(events) {
      var bucket = 0;
      var eventsByWeek = [];
      var counter = 0;        // to keep track of the days

      for (var i = 0; i < events.length; i++) {
        // if we're at the end, finish
        if (i === events.length-1) {
          bucket++;
          eventsByWeek.push(bucket);
          console.log(eventsByWeek);
          var container = [];
          container.push(eventsByWeek);

          return $scope.byWeek = {
            data: container,
            labels: makeLabels(eventsByWeek.length)
          };
        }
        bucket++;
        if (new Date(events[i].timestamp*1000).getDay() < new Date(events[i+1].timestamp*1000).getDay()) {//the next day is different, increment the counter
          counter++;
        }

        if (counter === 7) { //if the week is going to change over, push the bucket
          eventsByWeek.push(bucket);
          counter = 0;
          bucket = 0;
        }


      }
    };

    function makeLabels(num) {
      var labels = [];
      for (var i = 0; i < num; i++) {
        labels.push("Week "+i);
      }
      console.log("Made this many labels: ", labels.length);
      return labels;
    }





		
	}]);