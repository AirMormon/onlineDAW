const express = require('express');
const app = express();
var http = require('http').Server(app);

var bodyParser = require('body-parser');

var port = process.env.PORT || 5000;
//const mongoURL = 'mongodb://localhost:27017/mytestdb'
const mongoURL = 'mongodb://username:password1@ds151354.mlab.com:51354/onlinedaw'
//const mongoURL = process.env.MONGOLAB_URI;
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
  db = client.db("onlinedaw")
})

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});


app.post('/del', function (req, res) {
  db.collection('practice').deleteMany({
    "title": id
  })
})


app.post('/data', function (req, res) {
  data = req.body.notes
  title = req.body.title
  db.collection('practice').insertOne(req.body);
});

app.post('/name', function (req, res) {
  id = req.body.name
  console.log(id)
})


app.get('/songs', function (req, res) {
  db.collection('practice').find({}).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      //console.log(result)
      res.send(result)
    }
  })

});

app.get('/respo', function (req, res) {
  db.collection('practice').find({
    "title": id
  }).toArray(function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })

})

app.listen(process.env.PORT || 5000, function () {
  console.log("going on port", this.address().port, app.settings.env);
});