// server/models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., 'Asian', 'Burger', 'Vegan'
  image: { type: String, required: true }, // URL to the image
  isPopular: { type: Boolean, default: false },
});

module.exports = mongoose.model('Item', ItemSchema);