import express from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);        // GET all categories
router.post("/", createCategory);     // POST new category
router.put("/:id", updateCategory);   // PUT update item
router.delete("/:id", deleteCategory); // DELETE item

export default router;