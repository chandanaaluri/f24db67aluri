// models/gadgets.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gadgetSchema = new Schema({
  gadget_name: { type: String, required: true },
  price: { type: Number, required: true },
  functionality: { type: String, required: true }
});

module.exports = mongoose.model('Gadget', gadgetSchema);
