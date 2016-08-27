
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var $http = require('axios');
var logger = require('./logger');
var authorize = require('./auth');
var postRouter = require('./routes/posts.js');
var userRouter = require('./routes/users.js');
var mongoose = require('mongoose');
var passport = require('passport');
require('./config/passport.js');
var lowdb = require('lowdb');
var uuid = require('uuid');

var port = process.env.PORT || 8080;
var apiKey = process.env.API || require('./config').apiKey;
var baseUrl = 'https://api.forecast.io/forecast/';
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

var Todo = require('./models/todos.js');
var db = lowdb('db.json');
db.defaults({todos: []})
  .value();


mongoose.connect(mongoURI);
server.use(passport.initialize());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.use(logger);
server.use(authorize);
server.use(postRouter);
server.use(userRouter);

server.get('/', function(req, res){
  res.send('booya!');
});

server.get('/todos', function(request, response){
  var todos = db.get('todos')
              .value();
  response.send(todos);
});

server.get('/todos/:id', function(request, response){
  var todos = db.get('todos')
               .find({id: request.params.id})
               .value();
  response.send(todos);
});

server.post('/todos', function(request, response){
  var todo = new Todo(request.body.description);
  var result = db.get('todos')
                 .push(todo)
                 .last()
                 .value();
  response.send(result);
});

server.put('/todos/:id', function(request, response){
  var todo = new Todo(request.body.description, request.params.id);
  todo.updateComplete(request.body.isComplete);
    var updatedTodo = db.get('todos')
                         .find({id: request.params.id})
                         .assign(todo)
                         .value();
  response.send(updatedTodo);
});

server.delete('/todos/:id', function(request, response){
  var todo = db.get('todos')
               .remove({id: request.params.id})
               .value();
  response.send(todo);
});

server.get('/forecast/hourly/:lat,:lon', function(req, res){
     $http.get(baseUrl + apiKey + '/'+req.params.lat+','+req.params.lon) // a promise
          .then(function(response){
            var resOBj = {
              latitude: response.data.latitude,
              longitude: response.data.longitude,
              hourly: response.data.hourly
            };
            res.status(200).json(resOBj);
          })
          .catch(function(error){
            res.status(500).json({
              msg: error
            });
        });
    });


server.listen(port, function(){
  console.log('Now listening on port ' +port);
});
