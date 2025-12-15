// server/controllers/userController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


// server/controllers/userController.js (Add this new function)

// ... existing imports (asyncHandler, User, jwt, generateToken) ...

// @desc    Authenticate admin user & get token
// @route   POST /api/users/admin/login
// @access  Public (Specific for Admin portal)
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // 1. Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
        
        // 2. CRITICAL: Check if the user's role is 'admin'
        if (user.role !== 'admin') {
            res.status(403); // Forbidden
            throw new Error('Access denied. User is not an administrator.');
        }

        // 3. Success: Return user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        // General error message to prevent enumeration attacks
        res.status(401); 
        throw new Error('Invalid credentials.');
    }
});

// module.exports = { registerUser, loginUser, loginAdmin }; // Update export

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        // Allow setting role for initial admin creation, default is 'user'
        role: role || 'user', 
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

module.exports = { registerUser, loginUser };