angular.module('EventsDashboard')
  .controller('QuestionsController', ['$scope', 'QuestionsProvider', 'lodash', function($scope, Questions, _) {
    Questions.then(function(questions) {
      $scope.questions = questions;

      // an array of event objects with an 'id' and 'msg' properties

      var questionCount = $scope.questions.map(function(event, index) {
        var temp = event.msg.toLowerCase().split(' ');

        // count all of the words in each event.
        var punctuation = new RegExp('[^a-z]')
        temp = _.countBy(temp, function(m) {
          if (m.charAt(m.length-1).search(punctuation) >= 0) {
            return m.slice(0,-1);
          } else {
            return m;
          }
        });
        return temp;
      });

      // qCount is now an array of objects that reference counts. Need to compact them.
      //console.log(questionCount);
      var finalQ = {};

      questionCount.forEach(function(data, index) {
        // data is an obj with keys == words
        _.reduce(data, function(result, n, key) {
          if (finalQ.hasOwnProperty(key)) {
            finalQ[key] += n;
            return result;
          } else {
            finalQ[key] = n;
            return result;
          }
        }, finalQ);
      });

      var qDatum = [];
      for (word in finalQ) {
        var wordObj = {
          text: word,
          weight: finalQ[word]
        };
        
        qDatum.push(wordObj);
      }

      $scope.words = _.sortBy(qDatum, function(m) {
        return m.weight;
      });
      $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

      // final is now the datum for the word cloud


    });
  }]);