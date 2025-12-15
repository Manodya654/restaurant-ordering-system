// backend/routes/menu.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { 
    getMenuItems, 
    createMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
} from '../controllers/menuController.js'; 

const router = express.Router();

// Public Route (Anyone can see the menu)
router.get('/', getMenuItems);

// Admin Routes (Protected by auth and role check)
router.route('/')
    .post(protect, admin, createMenuItem); // Create new item

router.route('/:id')
    .put(protect, admin, updateMenuItem) // Update existing item
    .delete(protect, admin, deleteMenuItem); // Delete item

export default router;