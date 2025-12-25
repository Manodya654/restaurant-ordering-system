import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  number: { type: String, required: true }, 
  floor: { type: String, required: true },  
  capacity: { type: Number, required: true },
  isLocked: { type: Boolean, default: false }, // For real-time "double-click" prevention
});

const Table = mongoose.model("Table", tableSchema);

export default Table;