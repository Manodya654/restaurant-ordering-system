// import Category from "../models/category.js";

// export const getCategories = async (req, res) => {
//     try {
//         const categories = await Category.find().sort({ displayOrder: 1, name: 1 });
//         res.json(categories);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// //  Create a new category
// export const createCategory = async (req, res) => {
//     const { name, image, displayOrder, isActive } = req.body;
    
//     try {
//         const categoryExists = await Category.findOne({ name });
//         if (categoryExists) {
//             return res.status(400).json({ message: 'Category already exists' });
//         }
        
//         // Slug is automatically handled by the pre-save hook in the Model
//         const newCategory = await Category.create({ 
//             name, 
//             image, 
//             displayOrder: displayOrder || 0, 
//             isActive: isActive !== undefined ? isActive : true 
//         });
        
//         res.status(201).json(newCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // @ Update a category
// export const updateCategory = async (req, res) => {
//     const { id } = req.params;
//     const { name, image, displayOrder, isActive } = req.body;

//     try {
//         const existingCategory = await Category.findById(id);
//         if (!existingCategory) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         existingCategory.name = name || existingCategory.name;
//         existingCategory.image = image || existingCategory.image;
//         existingCategory.displayOrder = 
//             displayOrder !== undefined ? displayOrder : existingCategory.displayOrder;
//         existingCategory.isActive = 
//             isActive !== undefined ? isActive : existingCategory.isActive;

//             // When .save() is called, the pre-save hook will update the slug if the name changed
//             const updatedCategory = await existingCategory.save();
//             res.json(updatedCategory);
//         } catch (error) {
//             res.status(404).json({ message: error.message });
//         }
// };

// // @ Delete a category
// export const deleteCategory = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const result = await Category.deleteOne({ _id: id });

//         if (result.deletedCount > 0) {
//             res.json({ message: 'Category removed' });
//         } else {
//             res.status(404).json({ message: 'Category not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, image, color, displayOrder, isActive } = req.body;

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      image,
      color,
      displayOrder: displayOrder || 0,
      isActive: isActive ?? true,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image, color, displayOrder, isActive } = req.body;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name ?? category.name;
    category.image = image ?? category.image;
    category.color = color ?? category.color;
    category.displayOrder = displayOrder ?? category.displayOrder;
    category.isActive = isActive ?? category.isActive;

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
