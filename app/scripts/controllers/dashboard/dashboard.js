// Dashboard/Events controller


angular.module('EventsDashboard')
	.controller('DashboardController',['$scope', 'EventsProvider', 'SecondaryEventsProvider', 'CountryCodes', 'lodash', 
                            function($scope, Events, Events2, Codes, _) {
			// initialization function


    Events.then(function(events1) {
      Events2.then(function(events2) {
        // correctly label the countries with three letter codes
        $scope.events1 = sortAndCorrectCountryCodes(events1);
        $scope.events2 = sortAndCorrectCountryCodes(events2);
        $scope.eventsAll = combineEventRecords();
        console.log($scope.events1.length, $scope.events2.length, $scope.eventsAll.length);
        //console.log($scope.events1);

        // reference pointer to allow the user to select the data model they want to see
        $scope.selectedEventSource = $scope.events1;

        // filtered Events are the source of truth.
        $scope.filteredEvents = $scope.selectedEventSource;

        countByCountry();

        $scope.changeDataSource = function(newSrc) {
          $scope.selectedEventSource = $scope[newSrc];
          $scope.filteredEvents = $scope.selectedEventSource;
          console.log(newSrc);
          $scope.$broadcast('dataChangeEvent');
        } 

        
        // the datepicker scope broadcasts an event when the dates change
        $scope.$on('dataChangeEvent', function() {
          var base = $scope.selectedEventSource;
          var newValue = timeFilter(base, {startDate: $scope.startDate, endDate: $scope.endDate});
          $scope.filteredEvents = newValue;
          countByCountry();
          console.log("data change");
          // child scopes simply watch the filtered events for changes
        });

      });
     


		
		});

    function countByCountry() {
      $scope.countryCount = _.countBy($scope.filteredEvents, 'country');
      $scope.$broadcast('countryCountReady');
    }

		function timeFilter(events, range) {
      return _.filter(events, function(n) {
				return ((n.timestamp >= (range.startDate/1000)) && (n.timestamp <= (range.endDate/1000)));
			});
		};

    function sortAndCorrectCountryCodes(events) {
      // sort by timestamp for convenience
      events = _.sortBy(events, 'timestamp');

      // map the three-letter country codes onto the two
      return _.map(events, function(event) {
        var o = {};
        o = _.extend(event, {country: Codes[event.country]});
        return o;
      });
    }

    function combineEventRecords() {
      var e1 = $scope.events1,
          e2 = $scope.events2;
      var conc = e1.concat(e2);

      conc = _.sortBy(conc, 'timestamp');


      return _.uniq(conc, true, function(item) {
        return item.id + item.timestamp;
      });
    }



		
	}]);