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
        console.log('postCard data', data);
        return $http.post(
          "/api/cards",
          data
        ).then(function (newCard){
          return newCard;
        });
      }
    };
  }
]);


