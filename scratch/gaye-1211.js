fs.open('./data/' + filename, "wx", function(err) {
         if(err) {
             console.log("already exists");
            res.writeHead(404);
            res.end();
        } else {
            console.log("creating a new file");
            //res.end();
            var input = '';
            req.on('data', function(data) {
                  input += data.toString('utf-8');
            });
            req.on('end', function() {
              fs.writeFile('./data/' + filename, input, function(err) {
                res.writeHead(err ? 404 : 200);
                   res.end();
              });
            });
       }
     });
