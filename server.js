var db = require('./models');
var express = require('express');
var path = require('path');
var sequelize = require ('sequelize');

var app = express();

app.use(express.static(path.resolve(__dirname, 'Public')));

// app.use('/api', function (req, res, next){
//   res.send("working");
// });

app.get('/api/', function (req, res){
  return db.Card.findAll({}).then(function(cards){
    res.send('Ahem, requesting cards');
  });
});

app.post('/api/cards', function (req, res){
  // return db.Card.create({
  //   Person: req.body.Person,
  //   ProjTitle: req.body.ProjTitle,
  //   ProjDescrip: req.body.ProjDescrip,
  //   CurrentStatus: req.body.CurrentStatus,
  //   CompletionDueDate: req.body.CompletionDueDate,
  //   LastUpdated: req.body.LastUpdated
  // }).then(function (card){
    res.send('Okkkk posting cards');
  });
// });

db.sequelize
  .sync()
  .then(function () {
    app.listen(3000, function () {
    console.log('I\'m listening');
    });
  });