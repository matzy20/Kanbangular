angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(function ($routeProvider){
    $routeProvider
    .when('/cards/:id/edit', {
      templateUrl: '/templates/edit.html',
      controller: 'MyController'
    });
  })
  .run([
    '$rootScope',
    function ($rootScope){
      console.log('Edit your card! ... please?');
    }
  ]);
