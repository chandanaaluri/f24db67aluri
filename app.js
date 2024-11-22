require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// MongoDB Connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});

// Initialize app
var app = express();

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const Gadget = require('./models/gadget'); // Updated model
const resourceRouter = require('./routes/resource');
var gadgetsRouter = require('./routes/gadgets'); // Updated router

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/gadgets', gadgetsRouter); // Updated router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Recreate DB with sample data
async function recreateDB() {
  await Gadget.deleteMany();

  const gadget1 = new Gadget({ name: "Smartphone", brand: "Samsung", price: 799, features: "Touchscreen, Camera", warranty: "2 years" });
  const gadget2 = new Gadget({ name: "Laptop", brand: "Apple", price: 1299, features: "Retina Display, M1 Chip", warranty: "1 year" });
  const gadget3 = new Gadget({ name: "Smartwatch", brand: "Fitbit", price: 199, features: "Heart Rate Monitor, GPS", warranty: "1 year" });

  gadget1.save().then(doc => console.log("First gadget saved:", doc)).catch(console.error);
  gadget2.save().then(doc => console.log("Second gadget saved:", doc)).catch(console.error);
  gadget3.save().then(doc => console.log("Third gadget saved:", doc)).catch(console.error);
}

const reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
