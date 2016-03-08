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
    $scope.newCard = function (event){
      event.preventDefault();
      if ($scope.title) {
        var data = {
          title: $scope.title,
          priority: $scope.priority,
          status: "Queue",
          createdBy: $scope.createdBy,
          assignedTo: $scope.assignedTo,
        };
        CardFactory.postCard(data)
        .then(function (newCard){
          console.log('new card created');
          //page updates without having to refresh
          $scope.cards = $scope.cards.concat(newCard.data);
          //resets fields back to empty via empty string
          $scope.title = '';
          $scope.priority = '';
          $scope.createdBy = '';
          $scope.assignedTo = '';
        });
      }
    };

    //$event is only on forms so replaced event with passing through card
    $scope.sendToQueue = function (card){
      var data = {
          status: "Queue",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToQueue){
        console.log('card ' + sendToQueue.id + ' has been updated');
        //copy/pasted from top to set cards after being updated, so no cards are added "concat-ted", just updated
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.sendToInProg = function (card){
      var data = {
          status: "In Progress",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToInProg){
        console.log('card ' + sendToInProg.id + ' has been updated');
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.sendToDone = function (card){
      var data = {
          status: "Done",
        };
      CardFactory.updateCard(data, card.id)
      .then(function(sendToDone){
        console.log('card ' + sendToDone.id + ' has been updated');
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
    };
    $scope.remove = function (card){
      //ok to define data here with placeholder props
      var data = {
        title: $scope.title,
        priority: $scope.priority,
        createdBy: $scope.createdBy,
      };
      //be sure to include BOTH parameters provided in method in factory, which is deleteCard
      CardFactory.deleteCard(data, card.id)
      .then(function(remove){
        CardFactory.getCards()
          .then(function (cards){
            $scope.cards = cards.data;
          });
      });
      //TODO: work on creating a err message/<div> to speak with factory-server
    };
  }
]);

myApp.controller('EditController', [
  '$scope',
  '$routeParams',
  'CardFactory',
  '$location',
  function ($scope, $routeParams, CardFactory, $location) {
    //since id is part of url, using routeParams, similar to req.params
    CardFactory.getCardById($routeParams.id)
      .then(function (res){
        var card = res.data;
        $scope.title = card.title;
        $scope.priority = card.priority;
        $scope.status = card.status;
        $scope.createdBy = card.createdBy;
        $scope.assignedTo = card.assignedTo;
      });
    console.log('$routeParams', $routeParams);
    $scope.editingCard = function (event){
      var data = {
          title: $scope.title,
          priority: $scope.priority,
          status: $scope.status,
          createdBy: $scope.createdBy,
          assignedTo: $scope.assignedTo,
        };
        console.log('event', event);
      event.preventDefault();
      CardFactory.updateCard(data, $routeParams.id)
      .then(function (editingCard){
        $location.path('/');
      });
    };
  }
]);