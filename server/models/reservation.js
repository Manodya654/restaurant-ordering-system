import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  floor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true }, // Changed from customerName to name
  email: { type: String, required: true },
  specialNotes: { type: String, default: "" }, // Added this field
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' // Recommended to start as Pending for Admin to approve
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;