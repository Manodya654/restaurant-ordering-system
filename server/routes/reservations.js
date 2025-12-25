import express from 'express';
import Table from '../models/table.js';
import Reservation from '../models/reservation.js';

const router = express.Router();

// GET: Fetch all reservations for Admin Dashboard
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { date, time, guests, name, email, requests, tableNumber, floor } = req.body;

        const newReservation = new Reservation({
            date, 
            time, 
            guests, 
            name,          // Maps to 'name' in Schema
            email, 
            specialNotes: requests, // Maps 'requests' from frontend to 'specialNotes' in DB
            tableNumber,
            floor,
            status: "Pending"
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH: Update reservation status (Confirm/Cancel)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedBooking = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Remove a reservation
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;