const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
  gadget_name:String,
  price:Number,
  functionality:String
});

module.exports = mongoose.model("Gadget", gadgetSchema);
