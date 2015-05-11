// backend data service
angular.module('EventsDashboard')
	.factory('EventsFactory', ['$resource', 
		function($resource) {
			return $resource('http://micky.zyring.com/fullEvents');
	}])
  .factory('SecondaryEventsFactory', ['$resource', 
     function($resource) {
      return $resource('http://micky.zyring.com/fullEvents-site2'); 
  }]);