import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);

export default router;



// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     // 1. Customer Reference
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },

//     // 2. Order Identification (For Customer & Counter Staff)
//     // A short code like #A4F2 makes it easy for the customer to claim their food
//     pickupCode: {
//         type: String,
//         required: true,
//         unique: true,
//         default: () => Math.random().toString(36).substring(2, 6).toUpperCase()
//     },

//     // 3. Snapshot of Menu Items
//     // We store name and price here in case the menu changes later
//     items: [
//         {
//             menuItem: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Menu',
//                 required: true
//             },
//             name: { type: String, required: true },
//             quantity: { type: Number, required: true, min: 1 },
//             price: { type: Number, required: true }, // Price per item
//             total: { type: Number, required: true }  // price * quantity
//         }
//     ],

//     // 4. Financials
//     subtotal: { type: Number, required: true },
//     tax: { type: Number, default: 0 },
//     totalAmount: { type: Number, required: true },

//     // 5. Takeaway Specifics
//     status: {
//         type: String,
//         enum: ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
//         default: 'Pending'
//     },
//     paymentStatus: {
//         type: String,
//         enum: ['Unpaid', 'Paid'],
//         default: 'Unpaid'
//     },
//     paymentMethod: {
//         type: String,
//         enum: ['Online', 'At Counter'],
//         required: true
//     },
    
//     // Allows customer to schedule a pickup or choose "As soon as possible"
//     scheduledPickupTime: {
//         type: Date,
//         default: Date.now
//     },

//     // 6. Kitchen Notes
//     specialInstructions: {
//         type: String,
//         trim: true
//     }
// }, { 
//     timestamps: true // This gives you 'createdAt' (Order Time) and 'updatedAt'
// });

// module.exports = mongoose.model('Order', OrderSchema);