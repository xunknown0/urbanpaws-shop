const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

//Require Routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const reviewsRouter = require('./routes/reviews');

const app = express();

//Connect to Database

mongoose.connect('mongodb://localhost:27017/urbanpaw-shop',{useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',()=>{
  console.log('we\'re connected!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure Passport and Session
app.use(session({
  secret: 'Puppy Doxie',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Mount Route
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/products/:id/reviews', reviewsRouter);

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
