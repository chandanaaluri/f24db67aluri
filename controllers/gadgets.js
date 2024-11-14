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
exports.gadget_detail = function(req, res) {
  Gadget.findById(req.params.id, function(err, gadget) {
    if (err || !gadget) return res.status(404).json({ message: "Gadget not found" });
    res.status(200).json(gadget);
  });
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
exports.gadget_update_put = function(req, res) {
  Gadget.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedGadget) {
    if (err) return res.status(500).json({ message: "Error updating gadget" });
    res.status(200).json(updatedGadget);
  });
};
