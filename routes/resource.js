const express = require('express');
const router = express.Router();

// Require controller modules
const api_controller = require('../controllers/api');
const gadgetController = require('../controllers/gadget');

// Base API route
router.get('/', api_controller.api);

// API routes for Gadget
router.post('/gadgets', gadgetController.gadget_create_post);
router.get('/gadgets', gadgetController.gadget_list);
router.get('/gadgets/all', gadgetController.gadget_view_all_Page);
/* GET create gadget page */
router.get('/gadgets/create', gadgetController.gadget_create_Page);

// GET detail page for a specific Gadget (using query parameter)
router.get('/gadgets/detail', gadgetController.gadget_view_one_Page);
/* GET update page for gadget */
router.get('/update', gadgetController.gadget_update_Page);
router.get('/gadgets/:id', gadgetController.gadget_detail);
router.put('/gadgets/:id', gadgetController.gadget_update_put);
router.delete('/gadgets/:id', gadgetController.gadget_delete);

module.exports = router;
