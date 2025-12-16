import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import categoryRoutes from "./routes/categories.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

//app.use(cors());
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

//test route
app.get("/api/test", (req, res) => res.send("Server is working"));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

 


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Item = require('./models/Item');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); 
// app.use(express.json()); 

// const categories = require('./routes/categories');
// const users = require('./routes/users'); 

// // ROUTE REGISTRATION (Must come after global middleware)
// app.use('/api/categories', categories);
// app.use('/api/users', users);  

// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log(' MongoDB Connected'))
//   .catch(err => console.error(' MongoDB Connection Error:', err));

// // --- ROUTES ---

// // app.get('/api/items', async (req, res) => {
// //   try {
// //     const items = await Item.find();
// //     res.json(items);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // app.post('/api/items', async (req, res) => {
// //   const item = new Item({
// //     name: req.body.name,
// //     description: req.body.description,
// //     price: req.body.price,
// //     category: req.body.category,
// //     image: req.body.image,
// //     isPopular: req.body.isPopular
// //   });

// //   try {
// //     const newItem = await item.save();
// //     res.status(201).json(newItem);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // app.put('/api/items/:id', async (req, res) => {
// // //   try {
// // //     const updatedItem = await Item.findByIdAndUpdate(
// // //       req.params.id, 
// // //       req.body, 
// // //       { new: true } 
// // //     );
// // //     res.json(updatedItem);
// // //   } catch (error) {
// // //     res.status(400).json({ message: error.message });
// // //   }
// // // });
// // app.put('/api/items/:id', async (req, res) => {
// //     try {
// //       const updatedItem = await Item.findByIdAndUpdate(
// //         req.params.id, 
// //         req.body, 
// //         { new: true, runValidators: true } 
// //       );
      
// //       if (!updatedItem) {
// //           return res.status(404).json({ message: 'Item not found' });
// //       }

// //       res.json(updatedItem);
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// // });

// // app.delete('/api/items/:id', async (req, res) => {
// //   try {
// //     await Item.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Item deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });


// // Adding a dummy route
// app.get('/', (req, res) => res.send('Server is running!'));

// // Start Server
//app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
