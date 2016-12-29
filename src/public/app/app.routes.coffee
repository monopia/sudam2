angular.module('appRoutes', []).config [
  '$routeProvider'
  '$locationProvider'
  ($routeProvider, $locationProvider) ->
    $routeProvider
    .when('/', templateUrl: '/app/home.html')
    .when('/todos',
      templateUrl: '/app/controller/todo.controller.html'
      controller: 'todoController')
    .otherwise '/'
    $locationProvider.html5Mode true
    return
]