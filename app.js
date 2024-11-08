var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick'); // Ensure this path is correct

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

// Add the /gadgets route
app.get('/gadgets', (req, res) => {
  const results = [
    { gadget_name: 'Smartwatch', price: 199, functionality: 'Fitness Tracking' },
    { gadget_name: 'VR Headset', price: 299, functionality: 'Virtual Reality Experience' },
    { gadget_name: 'Drone', price: 499, functionality: 'Aerial Photography' }
  ];
  res.render('gadgets', { results }); // Pass results to Pug
});

// Catch 404 and forward to error handler
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

module.exports = app;
