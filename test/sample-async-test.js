'use strict';

require('../server');
var chai = require('chai');
var chaihttp = require('chai-http');
var http = require('http');
var url = require('url');

chai.use(chaihttp);

var expect = chai.expect;

var time = new Date();
var theTime = 'What time is it?!?! The time is ' +
  ('0' + time.getHours()).slice(-2)   + ':' +
  ('0' + time.getMinutes()).slice(-2) + ':' +
  ('0' + time.getSeconds()).slice(-2) + ' muthafucka!';

// var urlPath = url.parse(w.path.split('/');

// if (urlPath[1] === 'greet')
//   var userName = urlPath[2];

describe('the server', function() {

  it('should show the time at /time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(theTime);
        done();
      });
  });

  it('should greet a user by name at /greet/"name"', function(done) {
    chai.request('localhost:3000')
      .get('/greet/Fuckface')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Eat me, Fuckface!');
        done();
      });
  });

});
