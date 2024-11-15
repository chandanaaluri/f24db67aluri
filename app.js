var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const Gadget = require('./models/gadgets');
const gadget_controller = require('./controllers/gadgets');  // Adjust according to your path

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
app.use(express.static('public'));  // This could affect route resolution

var resourceRouter = require('./routes/resource'); // Ensure this path is correct

app.use('/resource', resourceRouter);  // Route for all resource-related requests

app.get('/gadgets', async (req, res) => {
  try {
    // Fetch all gadgets from the database
    const gadgets = await Gadget.find();
    // Return the gadgets list as JSON
    res.status(200).json(gadgets);
  } catch (err) {
    // Handle any errors (e.g., database connection issues)
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch gadgets' });
  }
});
// Static Gadget Route Example
app.get('/gadgets', (req, res) => {
  const results = [
    { gadget_name: 'Smartwatch', price: 199, functionality: 'Fitness Tracking' },
    { gadget_name: 'VR Headset', price: 299, functionality: 'Virtual Reality Experience' },
    { gadget_name: 'Drone', price: 499, functionality: 'Aerial Photography' }
  ];
  res.render('gadgets', { results }); // Pass results to Pug
});

// Resource Route
app.get('/resource', (req, res) => {
  res.send('Resource page');
});

// Gadgets Route - Fetch from Database
app.get('/resource/gadgets', async (req, res) => {
  try {
    // Fetch all gadgets from the database
    const gadgets = await Gadget.find();
    res.json(gadgets); // Send gadgets as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gadgets" });
  }
});
router.get('/gadgets/:id', gadget_controller.gadget_detail);
// POST Route for Creating Gadgets
// POST Route for Creating Gadgets (updated to /gadgets)
app.post('/gadgets', async (req, res) => {
  try {
    const newGadget = new Gadget(req.body);
    await newGadget.save();
    res.status(201).json({ message: 'Gadget created successfully', gadget: newGadget });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create gadget" });
  }
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

// MongoDB connection setup
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString)
  .then(() => console.log("Connection to DB succeeded"))
  .catch((error) => console.error("MongoDB connection error:", error));


module.exports = app;
