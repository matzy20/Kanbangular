var db = require('./models');
var express = require('express');
var path = require('path');
var sequelize = require ('sequelize');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'Public')));

app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/api/cards', function (req, res){
  return db.Card.findAll({}).then(function(cards){
    res.json(cards);
  });
});

app.get('/api/cards/:id', function (req, res) {
  db.Card.find({
    where: {
      id: req.params.id
    }
  }).then(function (card){
    res.json(card);
  });
});

app.post('/api/cards', function (req, res){
  console.log('req obj', req);
  return db.Card.create({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  }).then(function (card){
    res.json(card);
  })
    .catch(function (err){
      console.log(err);
    });
});

app.put('/api/cards/edit/:id', function (req, res){
  db.Card.update({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  },
  {
    where: {
      id: req.params.id
    },
    returning: true
  }
  ).then(function (card){
    res.json(card);
  });
});

app.delete('/api/cards/delete/:id', function (req, res){
  db.Card.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (card){
    res.send("This card " + req.params.id + " has been deleted");
  });
});

db.sequelize
  .sync()
  .then(function () {
    app.listen(3000, function () {
    console.log('I\'m listening');
    });
  });