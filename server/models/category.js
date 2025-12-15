// backend/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    // You could add a description or color code here if needed
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;