// directive
angular.module('EventsDashboard')
	.directive('byCountryChart', [function() {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/by-country.html',
			replace: true
		};
	}]);