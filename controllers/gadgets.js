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
// Controller for updating a gadget
exports.gadget_update = async function(req, res) {
  console.log(`Update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  
  try {
    // Find the gadget by ID
    let toUpdate = await Gadget.findById(req.params.id);

    // Update the properties if provided in the request body
    if (req.body.gadget_name) toUpdate.gadget_name = req.body.gadget_name;
    if (req.body.price) toUpdate.price = req.body.price;
    if (req.body.functionality) toUpdate.functionality = req.body.functionality;

    // Save the updated gadget document
    let result = await toUpdate.save();

    // Return the updated document
    console.log("Success " + result);
    res.json(result); // Respond with the updated gadget
  } catch (err) {
    // Handle error if gadget is not found or update fails
    res.status(500).send(`{"error": "${err.message}: Update for id ${req.params.id} failed"}`);
  }
};

exports.get_all_gadgets = async function(req, res) {
  try {
    // Fetching all gadgets from the database and selecting the fields (name, price, functionality)
    const gadgets = await Gadget.find({}, 'name price functionality');

    // Formatting the results with the id field
    const formattedGadgets = gadgets.map(gadget => ({
      id: gadget._id,
      name: gadget.name,
      price: gadget.price,
      functionality: gadget.functionality
    }));

    // Sending the formatted result as a JSON response
    res.json(formattedGadgets);
  } catch (error) {
    // If there is an error, send a response with the error message
    res.status(500).send(`{"error": "${error.message}"}`);
  }
};


