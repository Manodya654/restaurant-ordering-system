import express from "express";
import { getItems, createItem, updateItem, deleteItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getItems);        // GET all items
router.post("/", createItem);     // POST new item
router.put("/:id", updateItem);   // PUT update item
router.delete("/:id", deleteItem); // DELETE item

export default router;




// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';

// import { 
//     getItems, 
//     createItem, 
//     updateItem, 
//     deleteItem 
// } from '../controllers/menuController.js'; 

// const router = express.Router();

// // Public Route (Anyone can see the menu)
// router.get('/', getItems);

// // Admin Routes (Protected by auth and role check)
// router.route('/')
//     .post(protect, adminOnly, createItem); // Create new item
// router.route('/:id')
//     .put(protect, adminOnly, updateItem) // Update existing item
//     .delete(protect, adminOnly, deleteItem); // Delete item

// export default router;