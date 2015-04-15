// backend data service
angular.module('EventsDashboard')
	.factory('EventsFactory', ['$http', 
		function($http) {
			return {
				getEvents: function() {
					return $http.get('http://micky.zyring.com/fullEvents', {cache:true}).then(function(response) {
						console.log("events",response.data);
						return response.data;
					});
				}
			}
	}]);