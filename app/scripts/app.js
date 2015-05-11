'use strict';

/**
 * @ngdoc overview
 * @name zyringApp
 * @description
 * # zyringApp
 *
 * Main module of the application.
 */
angular
  .module('EventsDashboard', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'ngLodash',
    'chart.js',
    'angular-jqcloud'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        templateUrl: 'views/dashboard.html'
      })
      .state('dashboard.userStats', {
        url: '/user-statistics',
        templateUrl: 'views/templates/dashboardStats.html' 
      })
      .state('dashboard.summary', {
        url: '/summary',
        templateUrl: 'views/templates/dashboardSummary.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      });
      $urlRouterProvider.otherwise('/dashboard');
  }]);
