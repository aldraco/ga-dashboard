angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', '$rootScope', 'lodash', function($scope, $rootScope, _) {
    // inherits the date picker dates
    // also inherits the events, filtered

    byCountry($scope.filteredEvents);
    createCountryMap();

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      byCountry(newValue);
      createCountryMap();
    });

    function byCountry(events) {
      $scope.countryCount = _.countBy(events, 'country');

      $scope.byCountry = {
        labels: Object.keys($scope.countryCount),
        data: _.values($scope.countryCount)
      };
      
    }

    function getMapColors(count) {
      var max = _.sortBy(count, function(m) {
        return m;
      });
      var factor = (1/(max[max.length-1]));
      console.log("factor is",factor);
      //create an object with thsi format: 
      // USA: {fillKey: rgba(23, 28, 210, value*factor)}
      var mapColors = $scope.countryCount;
      mapColors = _.mapValues(mapColors, function(num) {
        var alpha = (Math.round(num*factor*100))/100;
        return 'rgba(23, 48, 210, '+ alpha +')';
      });
      console.log("map Colors", mapColors);
      return mapColors;
    }

    

    function createCountryMap() {
      var colors = getMapColors($scope.countryCount);

      var countryMap = new Datamap({
        element: document.getElementById('countryMap'),
        projection: 'mercator',
        scope: 'world',
        responsive: true,
        fills: {
          defaultFill: 'rgba(23,48,210,0.9)',
          testFill: 'rgba(0, 244, 244, 1)'
        },
        data: colors
      });
    }
  }]);