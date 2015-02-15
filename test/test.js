'use strict';

require('../server');
var fs = require('fs');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

var file1 = '{ "wife": "Kim", "cat": "Alistair" }';

describe('The server: ', function() {
  beforeEach(function() {
    fs.writeFile('./data/1.json', '{ "wife": "Kim", "cat": "Alistair" }');
  });

  it('should GET a file', function(done) {
    chai.request('localhost:3000')
      .get('/sam/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(file1);
        done();
      });
  });

  it('should POST a file', function(done) {
    chai.request('localhost:3000')
      .post('/sam/999')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  after(function() {
    fs.unlink('./data/999.json');
  });

  it('should PUT a file', function(done) {
    chai.request('localhost:3000')
      .put('/sam/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        // expect(res.body).to.eql(file1);
        done();
      });
  });


});
