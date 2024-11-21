// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');
const galaxiesRouter = require('./routes/galaxies');  // Changed from inventionsRouter to galaxiesRouter

// Schema definition
const galaxySchema = new mongoose.Schema({
  name: String,
  year: Number,
  discoverer: String  // Changed from inventor to discoverer
});

const Galaxy = mongoose.models.Galaxy || mongoose.model('Galaxy', galaxySchema);

// Database seeding function
async function recreateDB() {
  await Galaxy.deleteMany();
  
  let instance1 = new Galaxy({ name: 'Milky Way', year: 13.8, discoverer: 'Unknown' });
  let instance2 = new Galaxy({ name: 'Andromeda', year: 2.537, discoverer: 'Unknown' });
  let instance3 = new Galaxy({ name: 'Triangulum', year: 3.0, discoverer: 'Unknown' });

  await instance1.save().then(doc => {
    console.log("First object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance2.save().then(doc => {
    console.log("Second object saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance3.save().then(doc => {
    console.log("Third object saved:", doc);
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// Express app setup
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/galaxies', galaxiesRouter);  // Changed from /inventions to /galaxies
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
