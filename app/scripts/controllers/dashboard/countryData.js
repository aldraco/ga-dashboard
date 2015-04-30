angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', '$rootScope', 'lodash', function($scope, $rootScope, _) {
    // inherits the date picker dates
    // also inherits the events, filtered
    $scope.byCountry;
    byCountry($scope.filteredEvents);

    console.log("countryData is here");


    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      byCountry(newValue);
      //divideByWeek($scope.filteredEvents);
    });

    function byCountry(events) {
      var countryCount = _.countBy(events, 'country');

      $scope.byCountry = {
        labels: Object.keys(countryCount),
        data: _.values(countryCount)
      };
    }

    function createCountryMap() {
      var map = new Datamap({
        element: document.getElementById('countryMap'),
        fills: {
          defaultFill: 'rgba(23,48,210,0.9)'
        }
      });
    }
  }]);