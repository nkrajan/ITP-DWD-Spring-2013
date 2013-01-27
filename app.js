
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  
var app = express();


// Express app configuration 
app.configure(function(){

  // database
  app.db = mongoose.connect(process.env.MONGOLAB_URI);

  //  templates directory
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  // https://github.com/vol4ok/hogan-express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express'));

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // COOKIEHASH in your .env file (also share with heroku)
  app.use(express.cookieParser(process.env.COOKIEHASH));
  app.use(express.session());

  app.use(passport.initialize());
  app.use(passport.session());
  
  // css, images and js
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// set up models
require('./models').buildModels(mongoose);
var User = mongoose.model('User');

// Configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// routes
require('./routes')(app,mongoose);
require('./routes/admin.js')(app,mongoose);



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);

});
