var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick'); // Ensure this path is correct
const Gadget = require('./models/gadgets');

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
app.use('/selector', pickRouter); // Add the /selector route for random item display

// Add the /gadgets route (Static Example Data)
app.get('/gadgets', (req, res) => {
  const results = [
    { gadget_name: 'Smartwatch', price: 199, functionality: 'Fitness Tracking' },
    { gadget_name: 'VR Headset', price: 299, functionality: 'Virtual Reality Experience' },
    { gadget_name: 'Drone', price: 499, functionality: 'Aerial Photography' }
  ];
  res.render('gadgets', { results }); // Pass results to Pug
});

// Add the /resource route (Fetch Gadgets from Database)
app.get('/resource/gadgets', async (req, res) => {
  try {
    // Fetch all gadgets from the database
    const gadgets = await Gadget.find();
    res.json(gadgets); // Send the gadgets as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gadgets" }); // Error handling
  }
});

// Add the POST route for creating gadgets
app.post('/resource/gadgets', async (req, res) => {
  try {
    // Create a new gadget using the data from the request body
    const newGadget = new Gadget(req.body);
    await newGadget.save();
    res.status(201).json({ message: 'Gadget created successfully', gadget: newGadget });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create gadget" });
  }
});

// Router for gadgets (if needed)
const gadgetRouter = require('./routes/gadgets');  // Adjust the path as necessary

// Use the router for the /gadgets route
app.use('/resource/gadgets', gadgetRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // Trigger the 404 error if no route matches
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error in dev environment
  res.status(err.status || 500);
  res.render('error'); // Render the error page
});

// Set up MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Updated Mongoose connection without deprecated options
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("Connection to DB succeeded");
});

// Seed database function (optional)
async function seedDatabase() {
  await Gadget.deleteMany(); // Clean up the existing records

  const gadgets = [
    { gadget_name: 'Smartwatch', price: 199, functionality: 'Fitness Tracking' },
    { gadget_name: 'VR Headset', price: 299, functionality: 'Virtual Reality Experience' },
    { gadget_name: 'Drone', price: 499, functionality: 'Aerial Photography' }
  ];

  for (let gadgetData of gadgets) {
    const gadget = new Gadget(gadgetData);
    await gadget.save();
    console.log(`Saved: ${gadget.gadget_name}`);  // Log the saved gadget
  }
}

// Call the seed function if needed
// seedDatabase();

module.exports = app;
