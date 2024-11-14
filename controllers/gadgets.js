// controllers/gadget.js
var Gadget = require('../models/gadgets'); // Make sure you have a Gadget model

// List of all Gadgets
exports.gadget_list = async function(req, res) {
    try {
      // Fetch all documents from the Gadget collection
      const gadgets = await Gadget.find();
      res.json(gadgets); // Send the gadgets as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch gadgets" }); // Error handling
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
exports.gadget_create_post = function(req, res) {
  const gadget = new Gadget(req.body);
  gadget.save(function(err, newGadget) {
    if (err) return res.status(500).json({ message: "Error creating gadget" });
    res.status(201).json(newGadget);
  });
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

// Create POST method to add new gadget
exports.gadget_create_post = async function(req, res) {
    try {
      // Create a new gadget from the request body
      const newGadget = new Gadget({
        gadget_name: req.body.gadget_name,
        price: req.body.price,
        functionality: req.body.functionality
      });
  
      // Save the new gadget to the database
      await newGadget.save();
  
      // Return the created gadget as a response
      res.status(201).json({ message: 'Gadget created successfully', gadget: newGadget });
    } catch (err) {
      // Handle errors (e.g., invalid data or server issues)
      res.status(500).json({ error: err.message });
    }
  };
