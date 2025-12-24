import Order from "../models/order.js";
import asyncHandler from "express-async-handler";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    customerInfo,
    paymentMethod,
    totalAmount,
    specialInstructions,
  } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = await Order.create({
    user: req.user.id,
    items,
    customerInfo,
    paymentMethod,
    totalAmount,
    specialInstructions,
  });

  const createdOrder = await Order.findById(order._id).populate(
    "user",
    "name email"
  );

  res.status(201).json(createdOrder);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check if user owns this order or is admin
  if (
    order.user._id.toString() !== req.user.id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }

  res.json(order);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await order.deleteOne();
  res.json({ message: "Order removed" });
});

// @desc    Get order statistics for dashboard
// @route   GET /api/orders/stats/dashboard
// @access  Private/Admin
export const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "pending" });
  const completedOrders = await Order.countDocuments({ status: "completed" });
  const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

  const totalRevenue = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const recentOrders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({
    totalOrders,
    pendingOrders,
    deliveredOrders: completedOrders,
    cancelledOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    recentOrders,
  });
});
