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

// Get a specific gadget by ID
exports.gadget_detail = async function (req, res) {
  try {
    const result = await Gadget.findById(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `Gadget with ID ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching gadget with ID ${req.params.id}` });
  }
};

// Create a new gadget
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

// Delete a gadget by ID
exports.gadget_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
      const result = await Gadget.findByIdAndDelete(req.params.id);
      if (!result) {
          res.status(404).send({ message: `Gadget with ID ${req.params.id} not found` });
      } else {
          console.log("Removed " + result);
          res.status(200).send(result);
      }
  } catch (err) {
      res.status(500).send({ error: `Error deleting gadget: ${err.message}` });
  }
};


// Update a gadget by ID
exports.gadget_update = async function (req, res) {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    if (req.body.gadget_name) gadget.gadget_name = req.body.gadget_name;
    if (req.body.price) gadget.price = req.body.price;
    if (req.body.functionality) gadget.functionality = req.body.functionality;

    const updatedGadget = await gadget.save();
    res.status(200).json(updatedGadget);
  } catch (err) {
    res.status(500).json({ message: `Error updating gadget with ID ${req.params.id}` });
  }
};
