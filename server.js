// Sam Hamm
// Assignment info
// Collaborators: Trish Buckenberger, Gaye Bulut, Rory Sterley

'use strict';

var http = require('http');
var route = require('./lib/router');

var routes = {};
routes['data'] = route;

var server = http.createServer(function(req, res){
    var pathBits = req.url.split('/');
    if(typeof(routes[pathBits[1]]) === 'function') {
        routes[pathBits[1]](req, res);
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.write(JSON.stringify({msg: '404: Page not found!'}));
        res.end();
    }
});

server.listen(3000, function() {
    console.log('The server is listening at localhost:3000');
});
