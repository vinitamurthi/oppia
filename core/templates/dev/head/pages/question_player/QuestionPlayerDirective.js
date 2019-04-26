// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controller for the questions player directive.
 */
oppia.constant('INTERACTION_SPECS', GLOBALS.INTERACTION_SPECS);

oppia.directive('questionPlayer', [
  '$http', 'UrlInterpolationService',
  function(
      $http, UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {
        getQuestionPlayerConfig: '&playerConfig',
      },
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/pages/question_player/question_player_directive.html'),
      controller: [
        '$scope', '$rootScope', 'QuestionPlayerBackendApiService',
        function(
            $scope, $rootScope, QuestionPlayerBackendApiService) {
          $scope.questionPlayerConfig = $scope.getQuestionPlayerConfig();
          $scope.currentQuestion = 0;
          $scope.totalQuestions = 0;
          $scope.currentProgress = 0;

          var updateCurrentQuestion = function(currentQuestion) {
            $scope.currentQuestion = currentQuestion;
            updateQuestionProgression();
          };

          var updateTotalQuestions = function(totalQuestions) {
            $scope.totalQuestions = totalQuestions;
            updateQuestionProgression();
          };

          var updateQuestionProgression = function() {
            if (getTotalQuestions() > 0) {
              $scope.currentProgress = (
                getCurrentQuestion() * 100 / getTotalQuestions());
            } else {
              $scope.currentProgress = 0;
            }
          };

          var getCurrentQuestion = function() {
            return $scope.currentQuestion;
          };

          var getTotalQuestions = function() {
            return $scope.totalQuestions;
          };

          $rootScope.$on('currentQuestionChanged', function(event, result) {
            updateCurrentQuestion(result + 1);
          });
          $rootScope.$on('totalQuestionsReceived', function(event, result) {
            updateTotalQuestions(result);
          });
        }
      ]
    };
  }]);
