// In routes/gadgets.js
var express = require('express');
var router = express.Router();
const gadget_controlers = require('../controllers/gadgets'); // Adjust the path as necessary
const Gadget = require('../models/gadgets');

// POST route to create a new gadget
router.post('/', gadget_controlers.gadget_create_post);
router.get('/gadgets', async (req, res) => {
    try {
      // Find all gadgets and return relevant fields (name, price, functionality)
      const gadgets = await Gadget.find({}, 'name price functionality');
      
      // Map the results to format the response with custom id
      const formattedGadgets = gadgets.map(gadget => ({
        id: gadget._id.toString(), // MongoDB's _id is renamed to 'id'
        name: gadget.gadget_name,
        price: gadget.price,
        functionality: gadget.functionality
      }));
      
      // Send the formatted gadgets list as a JSON response
      res.json(formattedGadgets);
    } catch (error) {
      // Handle any error that occurs while fetching the data
      res.status(500).json({ error: 'An error occurred while fetching gadgets.' });
    }
  });
  // GET one gadget by ID
router.get('/gadgets/:id', async (req, res) => {
    try {
      // Find the gadget by the given ID
      const gadget = await Gadget.findById(req.params.id);
  
      // Check if gadget exists
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      // Return the gadget details
      res.json({
        id: gadget._id.toString(),
        name: gadget.gadget_name,
        price: gadget.price,
        functionality: gadget.functionality
      });
    } catch (error) {
      // Handle any errors (invalid ID format, etc.)
      res.status(500).json({ error: 'Error fetching the gadget' });
    }
  });
  
module.exports = router;
