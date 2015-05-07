angular.module('EventsDashboard')
  .controller('CountryDataCtrl', ['$scope', '$rootScope', 'lodash', function($scope, $rootScope, _) {

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      console.log("filtered events change bubbled to countryData");
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


    createColorFills();

    var countryMap = new Datamap({
      element: document.getElementById('countryMap'),
      projection: 'mercator',
      scope: 'world',
      responsive: true,
      fills: fills,
      data: $scope.mapData
    });
    

    $scope.$watch('filteredEvents', function(newValue, oldValue) {
      console.log("filtered events change bubbles to choropleth");
      getmapData();
      countryMap.updateChoropleth($scope.mapData);
      createColorFills();
    });

    

    function createColorFills() {
      // create a range and generate colors based on the number of visits

      var d3Color = d3.rgb('teal');

      var count = $scope.countryCount;

      var maxColor = _.sortBy(count, function(m) {
        return m;
      });
      var endRange = maxColor.length-1;

      var colorFactor = d3.scale.linear().domain([1, maxColor[endRange]]).range([1, 6]);


      _.each(maxColor, function(value, key) {
          var newColor = d3Color.brighter(colorFactor(value));
          fills[value] = newColor;
      });
      fills.testFill = 'rgba(0, 244, 244, 1)';
    };

    
    

    function getmapData() {
      var count = $scope.countryCount;

      var max = _.sortBy(count, function(m) {
        return m;
      });

      var factor = (10/(max[max.length-1]));
      var mapData = $scope.countryCount;

      mapData = _.mapValues(mapData, function(num) {
        return  {
          'fillKey': num.toString(),
          };
      });

      return $scope.mapData = mapData;
    }
}]);