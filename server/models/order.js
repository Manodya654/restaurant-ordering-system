import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    pickupCode: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 6).toUpperCase()
    },

    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true },
            subtotal: { type: Number, required: true },
        }
    ],

    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    },
    paymentMethod: {
        type: String,
        enum: ['Online', 'At Counter'],
        required: true
    },
    
    // Allows customer to schedule a pickup or choose "As soon as possible"
    scheduledPickupTime: {
        type: Date,
        default: Date.now
    },

    specialInstructions: {
        type: String,
        trim: true
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Order', OrderSchema);