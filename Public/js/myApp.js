angular.module('myApp', ['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(function ($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: '/templates/cards.html',
      controller: 'MyController'
    })
    .when('/new', {
      templateUrl: '/templates/new-card.html',
      controller: 'MyController'
    })
    .when('/:id/edit', {
      templateUrl: '/templates/edit.html',
      controller: 'EditController'
    });
  })
  .run([
    '$rootScope',
    function ($rootScope){
      console.log('Edit your card! ... please?');
    }
  ]);
