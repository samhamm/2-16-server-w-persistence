// Sam Hamm
// HTTP server with simple persistence
// Assignment for Code Fellows JavaScript Development Accelerator
// Due 2/16/15
// Collaborators: Trish Buckenberger, Gaye Bulut, Rory Sterley

'use strict';

var http = require('http');
var router = require('./lib/router');

var routes = {};
routes['sam'] = router;

var server = http.createServer(function(req, res) {
  var pathBits = req.url.split("/");

  if (typeof(routes[pathBits[1]]) === 'function') {
    routes[pathBits[1]](req, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: '404: Not Found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('The server is listening at localhost:3000...' + '\n');
});
