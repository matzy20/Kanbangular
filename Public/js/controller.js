var myApp = angular.module('myApp');

myApp.controller('MyController', [
  '$scope',
  'CardFactory',
  function ($scope, CardFactory) {
    $scope.cards = [];
    $scope.CardFactory = CardFactory.getCards()
      .then(function (res){
        $scope.cards = res.data;
      });
  }
]);