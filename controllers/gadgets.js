const Gadget = require('../models/gadgets');

// List all gadgets
exports.gadget_list = async function (req, res) {
  try {
    const gadgets = await Gadget.find();
    res.send(gadgets);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Details for a single gadget
exports.gadget_detail = async function (req, res) {
  try {
    const gadget = await Gadget.findById(req.params.id);
    res.send(gadget);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Create a new gadget
exports.gadget_create_post = async function (req, res) {
  try {
    const gadget = new Gadget(req.body);
    const result = await gadget.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Update a gadget
exports.gadget_update_put = async function (req, res) {
  try {
    const gadget = await Gadget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(gadget);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Delete a gadget
exports.gadget_delete = async function (req, res) {
  try {
    const result = await Gadget.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
