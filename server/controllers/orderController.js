import Order from '../models/order.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};
// @desc    Create a new order
// @route   POST /api/orders
// controllers/orderController.js
export const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod, scheduledPickupTime } = req.body;

        // req.user comes from your 'protect' middleware
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const newOrder = new Order({
            user: req.user._id, // This is where the '_id' comes from!
            items: items.map(item => ({
                ...item,
                subtotal: item.price * item.quantity // Ensure subtotal is calculated
            })),
            paymentMethod,
            scheduledPickupTime
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Order creation failed", error: error.message });
    }
};

// @desc    Get logged in user orders (Order History)
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
    try {
        // Fetch orders for the specific user and sort by newest first
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
};

// @desc    Update order status (For Admin/Staff)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status || order.status;
            order.paymentStatus = paymentStatus || order.paymentStatus;
            
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};