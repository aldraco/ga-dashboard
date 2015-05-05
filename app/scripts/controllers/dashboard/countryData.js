angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', '$rootScope', 'lodash', function($scope, $rootScope, _) {
    // inherits the date picker dates
    // also inherits the events, filtered

    //countByCountry($scope.filteredEvents);
    

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      if ($scope.countryCount) {
        countByCountry(newValue);
      }
      
      
      //countryMap.updateChoropleth({$scope.mapColors});
    });

    function countByCountry(events) {
      $scope.byCountry = {
        labels: Object.keys($scope.countryCount),
        data: _.values($scope.countryCount)
      };
      
    }



  
  }])
.controller('ChoroplethMapCtrl', ['$scope', 'lodash', function($scope, _) {
    createCountryMap();

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      getMapColors($scope.countryCount);
    });


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
}]);