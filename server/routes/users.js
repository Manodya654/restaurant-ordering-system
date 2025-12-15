// server/routes/userRoutes.js (Update this file)

const express = require('express');
const { registerUser, loginUser, loginAdmin } = require('../controllers/userController');
const router = express.Router();

// Public routes for all users (customers)
router.post('/register', registerUser); // Customer registration
router.post('/login', loginUser);       // Customer login

// Specific route for Admin login
router.post('/admin/login', loginAdmin); // Admin login (Checks for role: 'admin')

module.exports = router;