angular.module('EventsDashboard')
  .factory('QuestionsFactory', ['$resource', 
    function($resource) {
      return $resource('http://micky.zyring.com/userQuestions');
  }]);