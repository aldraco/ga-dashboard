angular.module('EventsDashboard')
.controller('DatepickerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

  $scope.today = function() {
    $rootScope.endDate = new Date();
    $rootScope.startDate = new Date();
    $scope.maxDate = new Date();
  };
  $scope.today();

  // date range for calculating changes as well as displaying the range
  


  $scope.clear = function () {
    $rootScope.startDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  /*$scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();*/

  $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';


}]);

// chosing a new end date resets the start date. Can't choose one before the other. 