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
      divideByWeek($scope.filteredEvents);

			/*$scope.$watch('startDate', function(newValue, old) {
				//console.log('start', newValue);
        var newStart = timeFilter($scope.allEvents, {startDate: (Date.parse(newValue)/1000), endDate: (Date.parse($rootScope.endDate)/1000)});
				$scope.filteredEvents = newStart;
			});

			$scope.$watch('endDate', function(newValue, old) {
				console.log('end', newValue);
        var newEnd = timeFilter($scope.allEvents, {startDate: (Date.parse($rootScope.startDate)/1000), endDate: (Date.parse(newValue)/1000)});
				$scope.filteredEvents = newEnd;
			});*/

			// when the date range filter changes, run the functions to get the new data again
			$scope.$watch('filteredEvents', function(newValue, oldValue) {
				console.log('filtered', newValue.length);
        byCountry(newValue);
        divideByWeek($scope.filteredEvents);
			});

      $scope.$watchGroup(['startDate', 'endDate'], function(newDates, oldDates, scope) {
        console.log("Group watcher", newDates);
        var newValue = timeFilter($scope.allEvents, {startDate: newDates[0], endDate: newDates[1]});
        $scope.filteredEvents = newValue;
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
			console.log(range);
      return _.filter(events, function(n) {
				return ((n.timestamp >= (range.startDate/1000)) && (n.timestamp <= (range.endDate/1000)));
			});
		};

    function divideByWeek(events) {
      var bucket = [];
      var eventsByWeek = [];
      var counter = 0;        // to keep track of the days

      for (var i = 0; i < events.length; i++) {
        // if we're at the end, finish
        if (i === events.length-1) {
          bucket.push(events[i]);
          eventsByWeek.push(bucket);
          console.log("Weeks:", eventsByWeek.length);
          return eventsByWeek;
        }
        bucket.push(events[i]);
        if (new Date(events[i].timestamp*1000).getDay() < new Date(events[i+1].timestamp*1000).getDay()) {//the next day is different, increment the counter
          counter++;
        }

        if (counter === 7) { //if the week is going to change over, push the bucket
          eventsByWeek.push(bucket);
          counter = 0;
          bucket =[];
        }


      }
    };

    // issue: case when the current day is the same as nextWeek, pushes a new bucket for every one fo the days

		// when should it push a new bucket?
    /*
    better way would be to keep a counter, increment when the day changes, and when it's %7, push a new bucket.

    */




		
	}]);