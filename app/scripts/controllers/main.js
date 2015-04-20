'use strict';

/**
 * @ngdoc function
 * @name zyringApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zyringApp
 */
angular.module('EventsDashboard')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('NavigationController', ['$scope', function($scope) {
  	$scope.activeTab = 'home';

    $scope.changeTab = function(newTab) {
        $state.go(newTab);
    };
    console.log($scope.activeTab);


  }]);
