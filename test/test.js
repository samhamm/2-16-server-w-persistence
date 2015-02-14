'use strict';

require('../index');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('the server', function() {

  it('should GET ', function(done) {
    chai.request('localhost:3000')
      .get('/someRoute')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('something');
        done();
      });
  });

  it('should POST ', function(done) {
    chai.request('localhost:3000')
      .post('/someRoute')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('something');
        done();
      });
  });

  it('should PUT ', function(done) {
    chai.request('localhost:3000')
      .put('/someRoute')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('something');
        done();
      });
  });

  it('should PATCH ', function(done) {
    chai.request('localhost:3000')
      .patch('/someRoute')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('something');
        done();
      });
  });

  it('should DELETE ', function(done) {
    chai.request('localhost:3000')
      .del('/someRoute')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('something');
        done();
      });
  });

  it('should give a 404 message for any unspecified routes', function(done) {
    chai.request('localhost:3000')
      .get('unspecified routes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('404: Nothing here, you loser.');
        done();
      });
  });

});
