 'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var queryHelpers = require('./queryHelpers.js');
var bcrypt = require('bcrypt');
var session = require('express-session'); 


app.use(express.static(__dirname + '/react-client/dist'));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));
app.get('/logout', function(req, res) {
  //destroying the session for the user and let him quit
  req.session.destroy(function() {
    res.sendStatus(200);
  });
});
app.get('/isLogged', queryHelpers.checkUser);
app.post('/getAll', queryHelpers.query);

app.post('/query', queryHelpers.query);

app.post('/invoke', queryHelpers.invoke);

app.post('/login', queryHelpers.login);

app.post('/signUp', function(req,res){
	bcrypt.hash(req.body.password, 10, function(err, hash) {
	queryHelpers.signUp(req,res,hash)
   })
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app
