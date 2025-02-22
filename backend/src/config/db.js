import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: process.env.DB_URL.includes("neon.tech")
        ? { rejectUnauthorized: false } 
        : false, 
});

export default pool;
