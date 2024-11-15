// controllers/gadget.js
const Gadget = require('../models/gadgets');

// List all gadgets
exports.gadget_list = async (req, res) => {
  try {
    const gadgets = await Gadget.find();
    res.status(200).json(gadgets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gadgets' });
  }
};

// Get a specific Gadget by ID
exports.gadget_detail = async function(req, res) {
  console.log("Fetching gadget with ID: " + req.params.id);
  try {
    // Find the gadget by its ID
    const result = await Gadget.findById(req.params.id);
    // If gadget is found, send it as the response
    if (result) {
      res.status(200).json(result);
    } else {
      // If not found, return a 404 error with a custom message
      res.status(404).json({ message: `Gadget with ID ${req.params.id} not found` });
    }
  } catch (error) {
    // Handle any errors (e.g., invalid ID format)
    res.status(500).json({ message: `Error fetching gadget with ID ${req.params.id}` });
  }
};

// Create a new Gadget
exports.gadget_create_post = async (req, res) => {
  const newGadget = new Gadget({
    gadget_name: req.body.gadget_name,
    price: req.body.price,
    functionality: req.body.functionality
  });
  try {
    await newGadget.save();
    res.status(201).json({ message: 'Gadget created successfully', gadget: newGadget });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create gadget', error: err.message });
  }
};

// Delete a Gadget by ID
exports.gadget_delete = function(req, res) {
  Gadget.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting gadget" });
    res.status(204).send();
  });
};

// Update a Gadget by ID
// Controller for updating one gadget
exports.gadget_update = async function(req, res) {
  console.log("Updating gadget with ID: " + req.params.id);
  try {
    // Find the gadget by ID and update it
    const gadget = await Gadget.findById(req.params.id);

    if (!gadget) {
      return res.status(404).json({ message: `Gadget with ID ${req.params.id} not found` });
    }

    // Update the gadget fields from the request body
    if (req.body.name) gadget.name = req.body.name;
    if (req.body.brand) gadget.brand = req.body.brand;
    if (req.body.memory) gadget.memory = req.body.memory;
    if (req.body.price) gadget.price = req.body.price;
    // Add more fields as needed

    // Save the updated gadget
    await gadget.save();
    res.status(200).json({ message: `Gadget with ID ${req.params.id} updated`, gadget });
  } catch (error) {
    // Handle any errors during update
    res.status(500).json({ message: `Error updating gadget with ID ${req.params.id}` });
  }
};

