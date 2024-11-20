const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const gadgetController = require('../controllers/gadgets');

// API Route
router.get('/', apiController.api);

// Gadget Routes
router.get('/gadgets', gadgetController.gadget_list);
router.post('/gadgets', gadgetController.gadget_create_post);
router.get('/gadgets/:id', gadgetController.gadget_detail);
router.put('/gadgets/:id', gadgetController.gadget_update);
router.delete('/gadgets/:id', gadgetController.gadget_delete);

module.exports = router;
