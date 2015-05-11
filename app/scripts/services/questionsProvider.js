angular.module('EventsDashboard')
  .factory('QuestionsProvider', ['$q', 'QuestionsFactory', function($q, Questions) {
    var deferred = $q.defer();
    Questions.query({}, function(questions) {
      deferred.resolve(questions);
        }, 
      function(err) {
        if (err.status === 404) {
          return "Not able to find user questions.";
          }
        deferred.reject('Unable to fetch data from server.');
      });
    return deferred.promise;
  }]);