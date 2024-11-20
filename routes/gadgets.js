const express = require('express');
const router = express.Router();
const gadgetControllers = require('../controllers/gadgets');

// POST route to create a new gadget
router.post('/', gadgetControllers.gadget_create_post);

// GET all gadgets
router.get('/', gadgetControllers.gadget_list);

// GET one gadget by ID
router.get('/gadgets/:id', gadgetControllers.gadget_detail);

// PUT request to update a gadget by ID
router.put('/gadgets/:id', gadgetControllers.gadget_update);

// DELETE request to delete a gadget by ID
router.delete('/gadgets/:id', gadgetControllers.gadget_delete);

module.exports = router;
