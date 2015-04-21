angular.module('EventsDashboard').
	.factory('EventsProvider', ['$q', 'EventsFactory', function($q, EventsFactory) {
		var deferred = $q.defer();
		EventsFactory.get({}, function(events) {
			deferred.resolve(events);
				}, 
			function(err) {
				if (err.status === 404) {
					return "Not able to find events.";
					}
				deferred.reject('Unable to fetch data from server.');
			});
		return deferred.promise;
	}]);