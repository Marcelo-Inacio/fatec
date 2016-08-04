﻿FatecControllers.controller('QuestionAddController',
    ['$scope', '$location', '$routeParams', '$interval', 'CompetenciesService', 'QuestionService',
    function ($scope, $location, $routeParams, $interval, competenciesService, questionService) {

        $scope.question = {};
        $scope.isAdding = false;
        $scope.competencies = [];
        $scope.operacao = "Adicionar";

        $scope.question.answers = new Array(4);

        $scope.competenciesInitial = [];
        $scope.competenciesList = _competenciesList;

        $scope.currentAnswer = {};

        init();

        function init() {

            $scope.isAdding = $location.path() == "/question/add";

            if (!$scope.isAdding) {

                $scope.operacao = "Editar";
                $scope.question = questionService.currentQuestion;
                if($scope.question == null){
                	document.location.href = "#/question";
                }else{
                	$scope.question.answers = questionService.currentQuestion.answers;
                    console.log(questionService.currentQuestion.answers);
                }
            }
            else{
            	$scope.competenciesList();
            }
                

        }

        $scope.getNumber = function (num) {
            return new Array(num);
        }

        $scope.cancel = function() {
        	document.location.href = "#/question";
        }
        
        $scope.saveQuestion = function (obj) {

            if ($scope.isAdding) {

                questionService.questionAdd(obj).then(function (data) {

                    alert("Questão salva com suceso!");
                    document.location.href = "#/question";

                });
            }
            else
            {

                questionService.questionUpdate(obj).then(function (data) {

                    alert("Alterada com sucesso");

                });
            }

        }

        function _competenciesList() {

            competenciesService.competenciesList().then(function (data) {

                for (var i = 0; i < $scope.question.answers.length; i++) {

                    $scope.question.answers[i] = {};
                    $scope.question.answers[i].competencies = data;
                }
            });
        }

        $scope.saveCompetence = function () {


            $scope.question.answers[$scope.index].competencies = angular.copy($scope.currentAnswer.competencies);
            $scope.currentAnswer.competencies = [];
        }

        $scope.setCurrentAnswer = function (index) {

            $scope.currentAnswer.competencies = angular.copy($scope.question.answers[index].competencies);
            $scope.index = index;
        }



    }]);