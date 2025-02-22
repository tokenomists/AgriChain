import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const salesAnalytics = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "SalesData"'); 
        res.json(result.rows);
        console.log(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export default salesAnalytics;
