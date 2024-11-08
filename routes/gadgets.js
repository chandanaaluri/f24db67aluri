const express = require('express');
const router = express.Router();

// Define the GET route for gadgets
router.get('/', (req, res) => {
  // This should match the name of your Pug file in views
  res.render('gadgets', { title: 'Search Results - Gadgets' });
});

module.exports = router;
