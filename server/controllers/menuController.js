// import Item from "../models/item.js";

// export const getItems = async (req, res) => {
//   try {
//     const keyword = req.query.keyword
//       ? { name: { $regex: req.query.keyword, $options: "i" } }
//       : {};

//     const items = await Item.find({ ...keyword }).sort({ createdAt: -1 });
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new menu item
// export const createItem = async (req, res) => {
//   const { name, description, price, category, image, isPopular, status, calories, prepTime } = req.body;

//   try {
//     const newItem = await Item.create({
//       name,
//       description,
//       price,
//       category,
//       image,
//       isPopular,
//       status,
//       calories,
//       prepTime,
//     });
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // update item
// export const updateItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const existingItem = await Item.findById(id); 
//     if (!existingItem) {
//       return res.status(404).json({ message: "Menu item not found" });
//     }

//     existingItem.name = req.body.name || existingItem.name;
//     existingItem.description = req.body.description || existingItem.description;
//     existingItem.price = req.body.price || existingItem.price;
//     existingItem.category = req.body.category || existingItem.category;
//     existingItem.image = req.body.image || existingItem.image;
//     existingItem.isPopular =
//       req.body.isPopular !== undefined ? req.body.isPopular : existingItem.isPopular;
//     existingItem.status = req.body.status || existingItem.status;
//     existingItem.calories = req.body.calories || existingItem.calories;
//     existingItem.prepTime = req.body.prepTime || existingItem.prepTime;

//     const updatedItem = await existingItem.save();
//     res.json(updatedItem);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // delete a menu item
// export const deleteItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedItem = await Item.deleteOne({ _id: id });
//     if (deletedItem.deletedCount > 0) {
//       res.json({ message: "Menu item removed" });
//     } else {
//       res.status(404).json({ message: "Menu item not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };



import Item from "../models/item.js";

export const getItems = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // .populate("category") - gets full Category object instead of just the ID
    const items = await Item.find({ ...keyword })
      .populate("category") 
      .sort({ createdAt: -1 });
      
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    // populate after creating so the frontend gets the color immediately
    const populatedItem = await newItem.populate("category");
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    Object.assign(item, req.body);
    const updatedItem = await item.save();
    await updatedItem.populate("category");
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.deleteOne({ _id: id });
    if (deletedItem.deletedCount > 0) {
      res.json({ message: "Menu item removed" });
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};