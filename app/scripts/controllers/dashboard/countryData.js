angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', '$rootScope', 'lodash', function($scope, $rootScope, _) {
    // inherits the date picker dates
    // also inherits the events, filtered

    byCountry($scope.filteredEvents);
    createCountryMap();

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      byCountry(newValue);
      getMapColors($scope.countryCount);
      //countryMap.updateChoropleth({$scope.mapColors});
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
      var colors = d3.scale.category10();

      //console.log(colors);

      var factor = (1/(max[max.length-1]));

      var mapColors = $scope.countryCount;

      mapColors = _.mapValues(mapColors, function(num) {
        var alpha = (Math.round(num*factor*100))/100;
        return colors(alpha);
      });
      console.log("map Colors", mapColors);

      return $scope.mapColors = mapColors;
    }

    

    function createCountryMap() {
      getMapColors($scope.countryCount);

      var countryMap = new Datamap({
        element: document.getElementById('countryMap'),
        projection: 'mercator',
        scope: 'world',
        responsive: true,
        /*fills: {
          defaultFill: 'rgba(23,48,210,0.9)',
          testFill: 'rgba(0, 244, 244, 1)'
        },*/
        data: $scope.mapColors
      });
    }
  }]);