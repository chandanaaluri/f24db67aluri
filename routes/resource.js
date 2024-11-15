// routes/resource.js
var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var gadget_controller = require('../controllers/gadgets');

// API Route
router.get('/', api_controller.api);

// Gadget Routes
router.get('/gadgets', gadget_controller.gadget_list);  // List all gadgets
router.post('/gadgets', gadget_controller.gadget_create_post); // Create new gadget
router.get('/gadgets/:id', gadget_controller.gadget_detail); // View single gadget
// PUT request to update a gadget by ID
router.put('/gadgets/:id', gadget_controller.gadget_update);
router.delete('/gadgets/:id', gadget_controller.gadget_delete); // Delete gadget

module.exports = router;
