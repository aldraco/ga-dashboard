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
    'ngTouch',
    'ngLodash',
    'chart.js'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
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
        url: '/dashboard/user-statistics',
        controller: 'DashboardController',
        templateUrl: 'views/templates/dashboardStats.html'
      });
      $urlRouterProvider.otherwise('/');
  }]);
