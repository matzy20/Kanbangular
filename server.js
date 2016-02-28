var db = require('./models');
var express = require('express');
var path = require('path');
var sequelize = require ('sequelize');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.resolve(__dirname, 'Public')));

app.get('/api/', function (req, res){
  return db.Card.findAll({}).then(function(cards){
    res.json(cards);
  });
});

app.post('/api/cards', function (req, res){
  return db.Card.create({
    person: req.body.person,
    title: req.body.title,
    descrip: req.body.descrip,
    currentStatus: req.body.currentStatus,
    completionDueDate: req.body.completionDueDate,
    lastUpdated: req.body.lastUpdated
  }).then(function (card){
    res.json(card);
  })
    .catch(function (err){
      console.log(err);
    });
});

db.sequelize
  .sync()
  .then(function () {
    app.listen(3000, function () {
    console.log('I\'m listening');
    });
  });