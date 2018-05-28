 'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var queryHelpers = require('./queryHelpers.js')


app.use(express.static(__dirname + '/react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('index.html')
});


app.post('/getAll', queryHelpers.query);

app.post('/query', queryHelpers.query);

app.post('/invoke', queryHelpers.invoke);

app.post('/login', queryHelpers.login);

app.post('/signUp', queryHelpers.signUp);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
