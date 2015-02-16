// Sam Hamm
// HTTP server with simple persistence
// Assignment for Code Fellows JavaScript Development Accelerator
// Due 2/16/15
// Collaborators: Trish Buckenberger, Gaye Bulut, Rory Sterley

'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = function(req, res) {
  var urlpieces = req.url.split('/');
  var id = urlpieces[urlpieces.length-1];
  var filename = id + ".json";
  var fullPath = './data/' + filename;
  var file;
  var input;

  if (req.method === 'POST') {
    fs.open(fullPath, 'wx', function(err) {
      if(err) {
        console.log('405: Failed POST; you may not POST to the existing file at ' + fullPath);
        res.writeHead(405);
        res.end();

      } else {
        console.log("201: Successful creation of resource at " + fullPath);
        var input = '';
        req.on('data', function(data) {
          input += data.toString('utf-8');
        });
        req.on('end', function() {
          fs.writeFile(fullPath, input, function(err) {
            res.writeHead(err ? 405 : 201);
            res.end();
          });
        });
        res.end();
      }
    });
  } else if (req.method === 'PUT') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    req.on('data', function(data) {
      input = data.toString('utf-8');
    });
    req.on('end', function() {
      console.log('200: Successful PUT to ' + fullPath);
      fs.writeFile(fullPath, input, function(err) {
        res.writeHead(err ? 404 : 200);
        res.end();
      });
    });
  } else if (req.method === 'PATCH') {
    fs.open(fullPath, 'r+', function(err) {
      if(err) {
        console.log('404: File not found; falied PATCH to');
        res.writeHead(404);
        res.end();
      } else {
        console.log('200: Successful PATCH to ' + fullPath);
        req.on('data', function(data) {
          input = data.toString('utf8');
          input = JSON.parse(input);
        });
        fs.readFile(fullPath, function(err, datas) {
          if(err) {
            res.writeHead(404);
            res.end();
          } else {
            file = datas.toString('utf8');
            file = JSON.parse(file);

            for(var key in input) {
              file[key] = input[key];
            }
          }

          file = JSON.stringify(file);

          fs.writeFile(fullPath, file, function(err) {
            res.writeHead(err ? 404:200);
            res.end();
          });
        });
      }
    });
  } else if (req.method === 'DELETE') {
    fs.unlink(fullPath, function(err) {
      console.log('200: Successful DELETE of ' + fullPath)
      res.writeHead(err ? 404 : 200);
      res.end();
    });
  } else if (req.method === 'GET') {
    fs.readFile(fullPath, function(err, data) {
      if(err) {
        res.writeHead(404);
        console.log('404: Failed GET from ' + fullPath);
      } else {
        res.writeHead(200, {
              'Content-Type': 'application/json'
        });
        console.log('200: Successful GET from ' + fullPath);
        res.write(data);
      }
      res.end();
    });
  }
};
