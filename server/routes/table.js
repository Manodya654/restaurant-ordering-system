import express from 'express';
import Table from '../models/table.js';

const router = express.Router();

// GET: Fetch all tables to show on the floor map
router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;