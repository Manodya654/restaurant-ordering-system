// server/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    // --- CRITICAL ADDITION ---
    status: { 
        type: String, 
        enum: ['Available', 'Sold Out'], // Restricts values to these two
        default: 'Available' 
    }
    // -------------------------
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;