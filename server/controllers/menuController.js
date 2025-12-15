// backend/controllers/menuController.js
import MenuItem from '../models/MenuItem.js';

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public (Admins/Users need to see the menu)
export const getMenuItems = async (req, res) => {
    try {
        // Simple search filter for Admin panel
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        } : {};
        
        const items = await MenuItem.find({ ...keyword }).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req, res) => {
    const { name, description, price, category, image, isPopular, available } = req.body;
    
    try {
        const item = await MenuItem.create({
            name, description, price, category, image, isPopular, available
        });
        res.status(201).json(item);
    } catch (error) {
        // Handle validation errors (e.g., missing required field)
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await MenuItem.findById(id);

        if (item) {
            // Update fields from request body
            item.name = req.body.name || item.name;
            item.description = req.body.description || item.description;
            item.price = req.body.price || item.price;
            item.category = req.body.category || item.category;
            item.image = req.body.image || item.image;
            item.isPopular = req.body.isPopular !== undefined ? req.body.isPopular : item.isPopular;
            item.available = req.body.available || item.available;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await MenuItem.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};