// Sam Hamm
// HTTP server with simple persistence
// Assignment for Code Fellows JavaScript Development Accelerator
// Due 2/16/15
// Collaborators: Trish Buckenberger, Gaye Bulut, Rory Sterley

'use strict';

require('../server');
var fs = require('fs');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

var testText1 = '{ "wife": "Kim", "cat": "Alistair" }';

describe('The server: ', function() {

  before(function() {
    fs.writeFile('./data/test-get.json', testText1);
  });

  it('should GET a file', function(done) {
    chai.request('localhost:3000')
      .get('/sam/test-get')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(testText1);
        done();
      });
  });

  it('should fail to GET a file', function(done) {
    chai.request('localhost:3000')
      .get('/sam/bogus/path')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  after(function() {
    fs.unlink('./data/test-get.json');
  });

  it('should POST a file', function(done) {
    chai.request('localhost:3000')
      .post('/sam/test-post')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  after(function() {
    fs.unlink('./data/test-post.json');
  });

  it('should PUT a file', function(done) {
    chai.request('localhost:3000')
      .put('/sam/test-put')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  after(function() {
    fs.unlink('./data/test-put.json');
  });

  before(function() {
    fs.writeFile('./data/test-patch.json', testText1);
  });

  it('should PATCH a file', function(done) {
    chai.request('localhost:3000')
      .patch('/sam/test-patch')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  after(function() {
    fs.unlink('./data/test-patch.json');
  });

  before(function() {
    fs.writeFile('./data/test-delete.json', testText1);
  });

  it('should DELETE a file', function(done) {
    chai.request('localhost:3000')
      .del('/sam/test-delete')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

});

