import Review from "../models/review.js";
import Item from "../models/item.js";
import asyncHandler from "express-async-handler";

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { item, order, rating, comment } = req.body;

  // Check if user already reviewed this item
  const existingReview = await Review.findOne({
    user: req.user.id,
    item: item,
  });

  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this item");
  }

  const review = await Review.create({
    user: req.user.id,
    item,
    order,
    rating,
    comment,
    isApproved: false, // Reviews need admin approval
  });

  const populatedReview = await Review.findById(review._id)
    .populate("user", "name email")
    .populate("item", "name");

  res.status(201).json(populatedReview);
});

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
export const getApprovedReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: true })
    .populate("user", "name")
    .populate("item", "name image")
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(reviews);
});

// @desc    Get reviews for a specific item
// @route   GET /api/reviews/item/:itemId
// @access  Public
export const getItemReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    item: req.params.itemId,
    isApproved: true,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  res.json({
    reviews,
    avgRating: avgRating.toFixed(1),
    totalReviews: reviews.length,
  });
});

// @desc    Get all reviews (for admin)
// @route   GET /api/reviews/admin/all
// @access  Private/Admin
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate("user", "name email")
    .populate("item", "name image")
    .sort({ createdAt: -1 });

  res.json(reviews);
});

// @desc    Approve/reject a review
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
export const approveReview = asyncHandler(async (req, res) => {
  const { isApproved } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  review.isApproved = isApproved;
  await review.save();

  const updatedReview = await Review.findById(review._id)
    .populate("user", "name email")
    .populate("item", "name image");

  res.json(updatedReview);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await review.deleteOne();
  res.json({ message: "Review deleted successfully" });
});

// @desc    Get user's own reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
export const getUserReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id })
    .populate("item", "name image")
    .sort({ createdAt: -1 });

  res.json(reviews);
});
