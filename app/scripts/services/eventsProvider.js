angular.module('EventsDashboard')
	.factory('EventsProvider', ['$q', 'EventsFactory', function($q, EventsFactory) {
		var deferred = $q.defer();
		EventsFactory.query({}, function(events) {
			deferred.resolve(events);
				}, 
			function(err) {
				if (err.status === 404) {
					return "Not able to find events.";
					}
				deferred.reject('Unable to fetch data from server.');
			});
		return deferred.promise;
	}])
  .factory('SecondaryEventsProvider', ['$q', 'SecondaryEventsFactory', function($q, SecondaryEvents) {
    var deferred = $q.defer();
    SecondaryEvents.query({}, function(secondaryE) {
      deferred.resolve(secondaryE);
    },
    function(err) {
      if (err.status === 404) {
        return "Unable to find secondary events.";
      }
      deferred.reject('Unable to fetch secondary Events from the server.');
    });
    return deferred.promise;
  }]);