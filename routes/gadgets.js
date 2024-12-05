// routes/gadgets.js
var express = require('express');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    } 
    res.redirect("/login");
}

// Import the gadgets controller (make sure the file path is correct)
const gadgetsController = require('../controllers/gadget'); // Updated to gadgets controller

router.get('/', gadgetsController.gadget_view_all_Page);  // Changed to gadget
// GET request for one gadget
router.get('/gadget/:id', gadgetsController.gadget_detail); // Changed to gadget
/* GET detail gadget page */
router.get('/detail', gadgetsController.gadget_view_one_Page); // Changed to gadget
// DELETE request to delete a gadget by ID
router.delete('/gadget/:id', gadgetsController.gadget_delete); // Changed to gadget
/* GET create gadget page */
router.get('/create', secured, gadgetsController.gadget_create_Page); // Changed to gadget
/* GET update gadget page */
router.get('/update', secured, gadgetsController.gadget_update_Page); // Changed to gadget
/* GET delete gadget page */
router.get('/delete', secured, gadgetsController.gadget_delete_Page); // Changed to gadget

module.exports = router;
