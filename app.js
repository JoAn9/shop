const createError = require('http-errors');
const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
);

app.use(function(req, res, next) {
  res.locals.path = req.path;
  next();
});

app.use('/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/questionnaire', require('./routes/questionnaire'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
