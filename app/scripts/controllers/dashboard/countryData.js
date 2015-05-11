angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', 'lodash', function($scope, _) {

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      if ($scope.countryCount) {
        countByCountry(newValue);
      }
    });

    function countByCountry(events) {
      $scope.byCountry = {
        labels: Object.keys($scope.countryCount),
        data: _.values($scope.countryCount)
      };
      
    }



  
  }])
.controller('ChoroplethMapCtrl', ['$scope', 'lodash', function($scope, _) {
    $scope.mapData;

    var fills = {
      defaultFill : 'rgba(210,210,210, 1)'
    };

    var countryMap = new Datamap({
      element: document.getElementById('countryMap'),
      projection: 'mercator',
      scope: 'world',
      responsive: true,
      fills: fills,
      data: $scope.mapData
    });
    
    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      getMapData();
      countryMap.updateChoropleth($scope.mapData);
    });

    

    function createColorFills() {
      // create a range and generate colors based on the number of visits
      // colors are relative brightness to the country with the most hits

      
      var d3Color   = d3.rgb('teal'),   // base color
             countries  = $scope.countryCount;
             
      var countries = _.sortBy(countries, function(m) {
        return m;
      });
      var endRange = countries.length -1;

      var colorFactor = d3.scale.linear().domain([1, countries[endRange]]).range([1, 6]);


      _.each(countries, function(value, key) {
          var newColor = d3Color.brighter(colorFactor(value));
          fills[value] = newColor;
      });
      fills.testFill = 'rgba(0, 244, 244, 1)';
    };

    
    

    function getMapData() {

      // the fills key generates a scaled color with a string key based on
      // the number of hits a country has.
      // i.e. the country with 455 hits is looking for a color key of '455',
      // which corresponds with an appropriately scaled color.
      var mapData = $scope.countryCount;
      createColorFills();

      return $scope.mapData = _.mapValues(mapData, function(num) {
        return  {
          'fillKey': num.toString(),
          };
      });

    }
}]);