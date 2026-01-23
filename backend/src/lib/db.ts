import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export async function query(text: string, params?: any[]) {
    return pool.query(text, params);
}

export default pool;
