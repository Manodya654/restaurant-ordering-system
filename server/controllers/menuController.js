import Item from "../models/item.js";

// @ Fetch all menu items
export const getItems = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const items = await Item.find({ ...keyword }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new menu item
export const createItem = async (req, res) => {
  const { name, description, price, category, image, isPopular, status } = req.body;

  try {
    const newItem = await Item.create({
      name,
      description,
      price,
      category,
      image,
      isPopular,
      status,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// update item
export const updateItem = async (req, res) => {
  const { id } = req.params;

  try {
    const existingItem = await Item.findById(id); 
    if (!existingItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    existingItem.name = req.body.name || existingItem.name;
    existingItem.description = req.body.description || existingItem.description;
    existingItem.price = req.body.price || existingItem.price;
    existingItem.category = req.body.category || existingItem.category;
    existingItem.image = req.body.image || existingItem.image;
    existingItem.isPopular =
      req.body.isPopular !== undefined ? req.body.isPopular : existingItem.isPopular;
    existingItem.status = req.body.status || existingItem.status;

    const updatedItem = await existingItem.save();
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete a menu item
// @route DELETE /api/menu/:id
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