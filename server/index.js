// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/item');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your frontend to talk to this server
app.use(express.json()); // Parses JSON bodies

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- ROUTES ---

// 1. GET ALL ITEMS
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. CREATE ITEM
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    isPopular: req.body.isPopular
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. UPDATE ITEM
// app.put('/api/items/:id', async (req, res) => {
//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id, 
//       req.body, 
//       { new: true } // Return the updated document
//     );
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
app.put('/api/items/:id', async (req, res) => {
    try {
      // req.body contains ALL fields sent from the frontend: 
      // name, description, price, category, image, isPopular, AND status.
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id, 
        req.body, // This sends all fields, including status
        { new: true, runValidators: true } // {new: true} returns the updated document
      );
      
      if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found' });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// 4. DELETE ITEM
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));