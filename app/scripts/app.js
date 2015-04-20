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
    'chart.js'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController'
      })
      .state('dashboard.summary', {
        url: '',
        controller: 'DashboardController',
        templateUrl: 'views/templates/dashboardSummary.html'
      })
      .state('dashboard.userStats', {
        url: '/user-statistics',
        controller: 'DashboardController',
        templateUrl: 'views/templates/dashboardStats.html'
      })
      .state('about', {
        url: '/about',
        controller: 'AboutCtrl',
        templateUrl: 'views/about.html'
      });
      $urlRouterProvider.otherwise('/');
  }]);
