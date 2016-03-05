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
    $scope.sendToQueue = function(card){
      var data = {
          status: "Queue",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToQueue){
        console.log('sendToQueue', sendToQueue);
        console.log('card ' + sendToQueue.id + ' has been updated');
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.sendToInProg = function(card){
      var data = {
          status: "In Progress",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToInProg){
        console.log('sendToInProg', sendToInProg);
        console.log('card ' + sendToInProg.id + ' has been updated');
        //copy/pasted from top to set cards after being updated, so no cards are added, just updated
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.sendToDone = function(card){
      var data = {
          status: "Done",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToDone){
        console.log('sendToDone', sendToDone);
        console.log('card ' + sendToDone.id + ' has been updated');
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.remove = function(card){
      var data = {
        title: $scope.title,
        priority: $scope.priority,
        createdBy: $scope.createdBy,
      };
      //be sure to include both parameters provided in method in factory .. deleteCard
      CardFactory.deleteCard(data, card.id)
      .then(function(remove){
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
  }
]);