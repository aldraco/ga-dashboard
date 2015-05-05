angular.module('EventsDashboard')
  .controller('dataOverTimeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    // inherits the Events from parent controller
    // Also inherits the start and end dates from the date picker.


    $scope.series = ['Data by Week'];

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      if ($scope.filteredEvents) {
            $scope.byWeek = {
              data: divideByWeek($scope.filteredEvents),
              labels: makeLabels($scope.weeks)
            };
            console.log($scope.byWeek);
      }
      
    });

    // this controller's job is to divide data over time.

    function divideByWeek(events) {
      // takes a filtered list of events to divide
      var bucket = 0;
      var eventsByWeek = [];
      var counter = 0;        // to keep track of the days

      for (var i = 0; i < events.length; i++) {
        // if we're at the end, finish
        if (i === events.length-1) {
          bucket++;
          eventsByWeek.push(bucket);
          var container = [];
          container.push(eventsByWeek);
          $scope.weeks = eventsByWeek.length;
          console.log("weeks", $scope.weeks);
          return container;
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
      return labels;
    }


  }]);