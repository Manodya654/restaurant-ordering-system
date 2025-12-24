import express from "express";
import {
  createReview,
  getApprovedReviews,
  getItemReviews,
  getAllReviews,
  approveReview,
  deleteReview,
  getUserReviews,
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getApprovedReviews);
router.get("/item/:itemId", getItemReviews);

// Protected routes
router.post("/", protect, createReview);
router.get("/my-reviews", protect, getUserReviews);

// Admin routes
router.get("/admin/all", protect, admin, getAllReviews);
router.put("/:id/approve", protect, admin, approveReview);
router.delete("/:id", protect, admin, deleteReview);

export default router;
