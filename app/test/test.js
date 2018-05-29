var expect = require('chai').expect;
var server = require('../server.js');
var supertest = require('supertest');



var request = supertest.agent(server);

describe('server', function() {
  it('should return the content of index.html', function (done) {
      request.get('/')
      .expect(200, done);
  });
});




describe('POST /query', function() {
    it('returns an aid', function(done) {
        request.post('/query')
        .send({
            fcn: 'lastAid',
            args: 'a'
        })
        .expect(200,'{"amount":100,"docType":"aid","familyId":"a","organization":"organization"}')
        .end(function(err, res) {
            done(err);
        });
    });
});


describe('POST /query', function() {
    it('returns all aids', function(done) {
        request.post('/query')
        .send({
            fcn: 'aidHistory',
            args: 'b'
        })
        .expect(200)
        .end(function(err, res) {
            done(err);
        });
    });
});





describe('POST /invoke', function() {
    it('saves an aid', (done) => {
       request.post('/invoke')
       .send({
        fcn: 'newAid',
        args: ['Id','org','amount','date']
    }).expect(200)
       done();
   })
    it('query an aid', (done) => {
        request.post('/query')
        .send({
            fcn: 'lastAid',
            args: 'Id'
            
        }).expect(200,'{"amount":"amount","date":"date","docType":"aid","familyId":"Id","organization":"org"}')
            done();
    })
    
})                          






describe('POST /signUp', function() {
    it('sign up', (done) => {
        request.post('/signUp')
        .send({
            username: 'user',
            password: 'password'
        }).expect(200)
        done();
        
    })
    it('login', (done) => {
       request.post('/login')
       .send({
        username: 'user',
        password: 'password'
    }).expect(200)
       done();
       
   })
})


