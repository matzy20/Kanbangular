var db = require('./models');
var express = require('express');
var path = require('path');
var sequelize = require ('sequelize');
var morgan = require('morgan');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//good to have in case server crashes
app.use(session({
  //config is your key
  //you don't manually add to application, just for good prac and security
  secret: config.session.secret,
  store: new RedisStore({
    host: '127.0.0.1',
    port: '6379'
  })
}));

app.use(express.static(path.resolve(__dirname, 'Public')));
app.set('views', 'views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
{
  passReqToCallBack: true
},
  function (username, password, done){
    db.User.find({
      where:{
        username: username,
        password: password
      }
    }).then(function(user){
      if(!user){
        return done(null, false);
      }
      return done(null, user);
    });
  }));

function authenticate (username, password){
  var USERNAME = user.username;
  var PASSWORD = user.password;

  if (username === USERNAME && password === PASSWORD){
    return true;
  } else {
    return false;
  }
}

function isAuthenticated (req, res, next){
  if (!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
}
//applies id to user
passport.serializeUser(function (user, done){
  console.log(user);
  done(null, user);
});

//able to now access user by id
passport.deserializeUser(function (id, done){
  return done(null, id);
});

app.get('/api/cards',
  isAuthenticated,
  function (req, res){
  //Card is capitalized bc it's your model
  return db.Card.findAll({}).then(function(cards){
    res.json(cards);
  });
});

app.get('/login', function (req, res){
  res.render('login');
});

app.get('/newUser', function (req, res){
  res.render('new-user');
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
  //this console showed us an {}, helped us debug
  // console.log('req obj', req);
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

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.post('/newUser',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

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
  ).then(function (results){
    //see sequelize docs http://docs.sequelizejs.com/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows
    //due to two promise items 'affectedCount' and 'affectedRows', need [1][0]
    //bc we need the first [] of second []
    res.json(results[1][0]);
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