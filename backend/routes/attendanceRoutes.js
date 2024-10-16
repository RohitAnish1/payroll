// backend/routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all attendance records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendance ORDER BY attendance_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching attendance records:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET attendance by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM attendance WHERE attendance_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST add a new attendance record
router.post('/', async (req, res) => {
  const { employee_id, date, status, check_in, check_out } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO attendance (employee_id, date, status, check_in, check_out)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [employee_id, date, status, check_in || null, check_out || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT update attendance record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { employee_id, date, status, check_in, check_out } = req.body;
  try {
    const result = await pool.query(
      `UPDATE attendance SET employee_id = $1, date = $2, status = $3, check_in = $4, check_out = $5
       WHERE attendance_id = $6 RETURNING *`,
      [employee_id, date, status, check_in || null, check_out || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE attendance record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM attendance WHERE attendance_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
