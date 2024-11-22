const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadget');

// Route to view all gadgets in a web page
router.get('/', gadgetController.gadget_view_all_Page);

// Route to render a form for creating a new gadget
router.get('/create', (req, res) => res.render('gadget_create_form'));

// Route to delete a gadget
router.get('/delete', gadgetController.gadget_delete_Page);

// Export the router
module.exports = router;
