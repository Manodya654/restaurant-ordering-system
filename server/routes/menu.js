import express from "express";
import { getItems, createItem, updateItem, deleteItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getItems);        
router.post("/", createItem);     
router.put("/:id", updateItem);   
router.delete("/:id", deleteItem); 

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
//     .post(protect, adminOnly, createItem);
// router.route('/:id')
//     .put(protect, adminOnly, updateItem) 
//     .delete(protect, adminOnly, deleteItem); 

// export default router;