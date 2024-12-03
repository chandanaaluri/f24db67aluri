var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

// Routes imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var gadgetsRouter = require('./routes/gadgets');  
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');  

// MongoDB imports
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chandanaaluri05:Chandana2003*@cluster0.ezt2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 10000,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Gadget model import (replacing Artifact model)
const Gadget = require("./models/gadget");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
);

var app = express();

// MongoDB connection setup

// Middleware setup
app.use(logger('dev'));
app.use(express.json());  // Add body parser middleware to handle JSON payload
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
// View engine setup (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Routes setup
app.use('/resource', resourceRouter);  // API for resource routes
app.use('/grid', gridRouter);  // Route for /grid
app.use('/gadgets', gadgetsRouter);  // Updated route for /gadgets
app.use('/pick', pickRouter);  // Route for /pick
app.use('/', indexRouter);  // Route for the homepage
app.use('/users', usersRouter);  // Route for users

// passport config
// Use the existing connection
// The Account model 
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Error handler for 404
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

let reseed = true;  // Set to false to prevent reseeding
if (reseed) {
  async function recreateDB() {
    await Gadget.deleteMany();  // Delete all existing gadgets from the database

    // New gadget data
    const gadgets = [
      { name: "Smartphone", brand: "Samsung", price: 799, features: "Touchscreen, Camera", warranty: "2 years" },
      { name: "Laptop", brand: "Apple", price: 1299, features: "Retina Display, M1 Chip", warranty: "1 year" },
      { name: "Smartwatch", brand: "Fitbit", price: 199, features: "Heart Rate Monitor, GPS", warranty: "1 year" }
    ];

    // Saving gadgets data to the database
    gadgets.forEach(async (gadgetData) => {
      const gadget = new Gadget(gadgetData);
      await gadget.save();
      console.log(`${gadget.name} saved to database.`);
    });

    console.log("Database seeded with gadgets!");
  }
  recreateDB();
}

// MongoDB Connection Status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = app;
