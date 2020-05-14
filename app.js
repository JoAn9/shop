const express = require('express');
const cookieSession = require('cookie-session');
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

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
);
// app.set('trust proxy', true);

// Define Routes
app.use('/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/questionnaire', require('./routes/questionnaire'));
app.use('/basket', require('./routes/basket'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
