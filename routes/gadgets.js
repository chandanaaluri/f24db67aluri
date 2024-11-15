var express = require('express');
var router = express.Router();
const gadget_controlers = require('../controllers/gadgets'); // Adjust the path as necessary
const Gadget = require('../models/gadgets');

// POST route to create a new gadget
router.post('/', gadget_controlers.gadget_create_post);

// GET all gadgets
router.get('/gadgets', async (req, res) => {
  try {
    const gadgets = await Gadget.find({}, 'gadget_name price functionality');
    const formattedGadgets = gadgets.map(gadget => ({
      id: gadget._id.toString(),
      name: gadget.gadget_name,
      price: gadget.price,
      functionality: gadget.functionality
    }));
    res.json(formattedGadgets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching gadgets.' });
  }
});

// GET one gadget by ID
router.get('/gadgets/:id', async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    res.json({
      id: gadget._id.toString(),
      name: gadget.gadget_name,
      price: gadget.price,
      functionality: gadget.functionality
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the gadget' });
  }
});

// PUT request to update a gadget by ID
router.put('/gadgets/:id', gadget_controlers.gadget_update);

// DELETE request to delete a gadget by ID
router.delete('/gadgets/:id', gadget_controlers.gadget_delete);

module.exports = router;
