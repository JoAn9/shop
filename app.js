const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

// app.use(
//   cookieSession({
//     name: 'session',
//     keys: config.keySession,
//     maxAge: config.maxAgeSession,
//   })
// );

app.use(
  session({
    secret: config.keySession,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

// app.set('trust proxy', true);

// Define Routes
app.use('/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/questionnaire', require('./routes/questionnaire'));
app.use('/cart', require('./routes/cart'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
