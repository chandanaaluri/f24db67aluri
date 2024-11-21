const mongoose = require("mongoose");

const galaxySchema = mongoose.Schema({
  name: String,
  year: Number,
  inventor: String // Update the field name if it doesn't fit the "Galaxy" context
});

module.exports = mongoose.model("Galaxy", galaxySchema);
