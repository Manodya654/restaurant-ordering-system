import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["Available", "Sold Out"], 
      default: "Available" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema); 
