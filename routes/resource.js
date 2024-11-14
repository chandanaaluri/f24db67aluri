// routes/resource.js
var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var gadget_controller = require('../controllers/gadget');

// API ROUTE
router.get('/', api_controller.api);

// GADGET ROUTES
router.post('/gadgets', gadget_controller.gadget_create_post);
router.delete('/gadgets/:id', gadget_controller.gadget_delete);
router.put('/gadgets/:id', gadget_controller.gadget_update_put);
router.get('/gadgets/:id', gadget_controller.gadget_detail);
router.get('/gadgets', gadget_controller.gadget_list);
router.get('/gadgets', gadget_controller.gadget_list);
module.exports = router;
