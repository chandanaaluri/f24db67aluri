const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gadgetSchema = new Schema({
  name: { type: String, required: true ,minlength: [3, 'Gadget name must be at least 3 characters long'], 
    maxlength: [100, 'Gadget name cannot exceed 100 characters']},
  brand: { type: String, required: true,minlength: [3, 'Gadget name must be at least 3 characters long'], 
    maxlength: [100, 'Gadget name cannot exceed 100 characters'] },
  price: { type: Number, required: true ,minlength: [3, 'Gadget name must be at least 3 characters long'], 
    maxlength: [100, 'Gadget name cannot exceed 100 characters']},
  features: { type: String ,minlength: [3, 'Gadget name must be at least 3 characters long'], 
    maxlength: [100, 'Gadget name cannot exceed 100 characters']},
  warranty: { type: String ,minlength: [3, 'Gadget name must be at least 3 characters long']}
});

module.exports = mongoose.model('Gadget', gadgetSchema);
