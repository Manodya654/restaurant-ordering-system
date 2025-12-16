import Category from "../models/category.js";

// @  Fetch all categories
 export const getCategories = async (req, res) => {
    try {
        const category = await Category.find().sort({ name: 1 });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @ Create a new category
 export const createCategory = async (req, res) => {
    const { name, image } = req.body;
    
    try {
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        
        const newCategory = await Category.create({ name, image });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @ Update a category
 export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    try {
        const existingCategory = await Category.findById(id);

        if (existingCategory) {
            existingCategory.name = name || existingCategory.name;
            existingCategory.image = image || existingCategory.image;
            const updatedCategory = await existingCategory.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category
 export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await Category.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


