var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname, 'Public')));

app.use('/api', function (req, res, next){
  res.send("working");
});

console.log('I\'m listening');

var server = app.listen(3000);