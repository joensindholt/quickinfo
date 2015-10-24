var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  JwtBearerStrategy = require('passport-http-jwt-bearer').Strategy,
  User = require('./models/user'),
  feeditems = require('./routes/api/feeditems'),
  contacts = require('./routes/api/contacts'),
  jwt = require('jwt-simple');

var app = express();

var user = new User();

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    console.log('finding user by username: ' + username + ' and password: ' + password);
    user.findByUsername(username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user ' + username
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    })
  }
));

passport.use(new JwtBearerStrategy(
  "los secret",
  function(token, done) {
    console.log('authenticating using bearer strategy');
    console.log(token);
    user.findByUsername(token.username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user ' + token.username
        });
      }

      console.log('found user - auth ok');

      return done(null, user, token);
    });
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//app.use(passport.authenticate('jwt', { session: false}));

// routes
app.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

app.get('/api/feeditems', passport.authenticate('jwt-bearer', {
  session: false
}), feeditems.get);
app.get('/api/contacts', passport.authenticate('jwt-bearer', {
  session: false
}), contacts.getAll);
app.get('/api/contacts/:contactId', passport.authenticate('jwt-bearer', {
  session: false
}), contacts.get);

app.post('/api/login', function(req, res, next) {
  console.log('Got login request');
  //console.log(req);

  console.log('Validating username and password');
  user.findByUsername(req.body.username, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'Unknown user ' + username
      });
    }
    if (user.password != req.body.password) {
      return done(null, false, {
        message: 'Invalid password'
      });
    }
    var token = jwt.encode({
      username: req.body.username
    }, "los secret");
    res.json({
      token: token
    });
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
