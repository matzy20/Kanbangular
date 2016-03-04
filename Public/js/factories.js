var myApp = angular.module('myApp');

myApp.factory('CardFactory', [
  '$http',
  function ($http){
    return {
      getCards: function (){
        return $http({
          method: "GET",
          url: "/api/cards",
        });
      },
      postCard: function (data){
        return $http.post(
          "/api/cards",
          data
        ).then(function (newCard){
          return newCard;
        });
      },
      //need id as a parameter, to know which card
      updateCard: function (data, id){
        return $http.put(
          "/api/cards/edit/" + id,
          data
        ).then(function (sendToQueue, sendToInProg, sendToDone){
          //specifying exact data we need, not entire sendToInProg obj
          return sendToQueue.data || sendToInProg.data || sendToDone.data;
        });
      }
    };
  }
]);


