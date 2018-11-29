var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public')); //That's a double underscore

//the specific route handler below is not really needed anymore since by default express looks to server index.html
app.get('/', function (req, res) {
   res.sendFile('index.html');
 });

app.listen(port, function() {
  console.log('Great! The server is running and waiting for traffic on port 5000.')
});