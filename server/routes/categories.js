// backend/routes/categories.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js'; 

const router = express.Router();

// Public route for fetching all categories (e.g., for filtering the main menu)
router.get('/', getCategories);

// Admin routes for CRUD operations
router.route('/')
    .post(protect, admin, createCategory); 

router.route('/:id')
    .put(protect, admin, updateCategory) 
    .delete(protect, admin, deleteCategory); 

export default router;