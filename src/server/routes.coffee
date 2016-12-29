Todo = require('./model/todo')
path = require('path')

module.exports = (app) ->

  app.get '/api/todos', (req, res) ->
    Todo.find (err, todos) ->
      if err
        res.send err
      res.json todos # return all todos in JSON format
      return
    return

  app.post '/api/todos', (req, res) ->
    Todo.create {
      text: req.body.text
      done: false
    }, (err, todo) ->
      if err
        res.send err
      Todo.find (err, todos) ->
        if err
          res.send err
        res.json todos # get and return all the todos after you create another
        return
      return
    return

  app.delete '/api/todos/:todo_id', (req, res) ->
    Todo.remove { _id: req.params.todo_id }, (err, todo) ->
      if err
        res.send err
      Todo.find (err, todos) ->
        if err
          res.send err
        res.json todos # get and return all the todos after you remove
        return
      return
    return

  # frontend routes : 마지막에 위치
  # route to handle all angular requests
  app.get '*', (req, res) ->
    res.sendFile path.join(__dirname, '../public', 'index.html')
    #res.sendfile('../public/index.html'); // load our public/index.html file
    return
  return
