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
          //page updates without having to refresh
          $scope.cards = $scope.cards.concat(newCard.data);
          //after pushing newCard resets fields back to empty string
          $scope.title = '';
          $scope.priority = '';
          $scope.createdBy = '';
          $scope.assignedTo = '';
        });
      }
    };
    //$event is only on forms so replaced event with passing through card
    $scope.inProgCard = function(card){
      var data = {
          status: "In Progress",
        };
        CardFactory.updateCard(data, card.id)
        .then(function(inProgCard){
          console.log('inProgCard', inProgCard);
          console.log('card ' + inProgCard.id + ' has been updated');
          //copy/paste from top to set cards after being updated, so no cards are added, just updated
          CardFactory.getCards()
            .then(function (cards){
              $scope.cards = cards.data;
            });
        });
    };
  }
]);