// In routes/gadgets.js
var express = require('express');
var router = express.Router();
const gadget_controlers = require('../controllers/gadgets'); // Adjust the path as necessary

// POST route to create a new gadget
router.post('/', gadget_controlers.gadget_create_post);

module.exports = router;
