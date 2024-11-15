var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Gadget = require('./models/gadgets'); // Import Gadget model

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const gadgetRouter = require('./routes/gadgets'); 
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/', gadgetRouter);
// MongoDB connection setup
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString)
  .then(() => console.log("Connection to DB succeeded"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Route to fetch gadgets
app.get('/gadgets', async (req, res) => {
  try {
    const gadgets = await Gadget.find(); // Fetch all gadgets
    const gadgetNames = gadgets.map(gadget => gadget.gadget_name); // Get gadget names
    res.status(200).json(gadgetNames); // Return the list of gadget names
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch gadgets' });
  }
});


app.post('/gadgets', (req, res) => {
  const gadget = req.body;
  console.log('Gadget received:', gadget);
  
  // Handle your logic here, for example, save to DB
  // For now, send a response back:
  res.status(201).json({ message: 'Gadget created successfully', gadget });
});

// Catch-all route to handle 404 errors
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});


// General Error Handling Route (for unknown routes)
app.use(function(req, res, next) {
  next(createError(404)); // Trigger 404 error if route doesn't match
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error in dev environment
  res.status(err.status || 500);
  res.render('error'); // Render error page
});

module.exports = app;
