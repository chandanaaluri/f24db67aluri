const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gadgetSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: String },
  warranty: { type: String }
});

module.exports = mongoose.model('Gadget', gadgetSchema);
