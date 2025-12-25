import Table from '../models/table.js';

export const createTable = async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ... add exports for getTables, updateTable, etc.