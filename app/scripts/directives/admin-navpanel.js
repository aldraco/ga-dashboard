// admin-navpanel.js

angular.module('EventsDashboard')
	.directive('adminNavpanel', function() {
		return {
			restrict: 'E', 
			replace: true,
			templateUrl: 'views/templates/admin-navpanel.html'
		};
	});