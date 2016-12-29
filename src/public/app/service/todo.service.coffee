angular.module('TodoService', [])
.factory 'Todos', [
  '$http'
  ($http) ->
    get: ->
      $http.get '/api/todos'
    create: (data) ->
      $http.post '/api/todos', data
    delete: (id) ->
      $http.delete '/api/todos/' + id
]
