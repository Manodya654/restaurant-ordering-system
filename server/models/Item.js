import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    image: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["Available", "Sold Out"], 
      default: "Available" 
    },
    calories: { 
    type: Number 
  },
  prepTime: { 
      type: String, 
      enum: ["5 - 10 mins", "10 - 15 mins", "15 - 20 mins", "20 - 30 mins", "30 - 45 mins", "Over 45 mins"], 
      default: "10 - 15 mins" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema); 
