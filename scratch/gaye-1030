else if (req.method === 'DELETE') {
           fs.unlink('./data/' + filename, function(err) {
               res.writeHead(err ? 404 : 200);
               res.end();
           });

 }
