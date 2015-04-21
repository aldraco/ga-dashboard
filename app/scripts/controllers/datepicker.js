angular.module('EventsDashboard')
.controller('DatepickerCtrl', function ($scope) {
  $scope.today = function() {
    $scope.endDate = new Date();
    $scope.startDate = new Date();
    $scope.maxDate = new Date();
  };
  $scope.today();


  $scope.clear = function () {
    $scope.startDate = null;
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
    console.log(opened);
    $scope[opened] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';
});