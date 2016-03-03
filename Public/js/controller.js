var myApp = angular.module('myApp');

myApp.controller('MyController', [
  '$scope',
  'CardFactory',
  function ($scope, CardFactory) {
    $scope.cards = [];
    CardFactory.getCards()
      .then(function (cards){
        $scope.cards = cards.data;
      });
    $scope.newCard = function(event){
      event.preventDefault();
      if ($scope.title) {
        var data = {
          title: $scope.title,
          priority: $scope.priority,
          createdBy: $scope.createdBy,
          assignedTo: $scope.assignedTo,
          status: "Queue"
        };
        CardFactory.postCard(data)
        .then(function (newCard){

          console.log('new card created');
          //creates a refresh on Submit
          $scope.cards = $scope.cards.concat(newCard.data);
          //after pushing newCard resets fields back to empty string
          $scope.title = '';
          $scope.priority = '';
          $scope.createdBy = '';
          $scope.assignedTo = '';
        });
      }
    };
  }
]);