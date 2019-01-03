const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

var port = process.env.PORT || 5000;
const mongoURL = 'mongodb://localhost:27017/mytestdb'
const mongoClient = require('mongodb').MongoClient;
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(bodyParser.json());
const assert = require('assert')

mongoClient.connect(mongoURL, {
  useNewUrlParser: true
}, function (err, client) {
  assert.equal(null, err);
  console.log("connected")
  db = client.db("mytestdb")
})
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});


app.post('/del', function (req, res) {
db.collection('practice').deleteMany({"title":id})
})


app.post('/data', function (req, res) {
data = req.body.notes
db.collection('practice').insertOne(req.body);
});

app.post('/name', function (req, res) {
   id = req.body.name 
   console.log(id)
})


app.get('/respo', function (req, res) {
  db.collection('practice').find({"title":id}).toArray(function (err, result){
 if (err){
console.log(err)
 }else{
  console.log(result)
  res.send(result)
 }
        })

      })


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


socket.on('message')
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});



http.listen(5000, function(){
  console.log('listening on *:5000');
});