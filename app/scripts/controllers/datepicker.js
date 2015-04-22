angular.module('EventsDashboard')
.controller('DatepickerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.range = {};

  $scope.today = function() {
    $rootScope.range.endDate = new Date();
    $rootScope.range.startDate = new Date();
    $scope.maxDate = new Date();
  };
  $scope.today();

  // date range for calculating changes as well as displaying the range
  


  $scope.clear = function () {
    $rootScope.range.startDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

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