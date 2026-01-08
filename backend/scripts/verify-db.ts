import 'dotenv/config';
import axios from 'axios';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
    console.log('Starting verification...');
    const barcode = '5449000000996'; // Coca Cola
    const url = 'http://localhost:3000/api/scan';
    const userId = 'test-user-db';

    // 0. Ensure user exists
    try {
        await prisma.user.upsert({
            where: { email: 'test@example.com' },
            create: { id: userId, email: 'test@example.com', name: 'Test User' },
            update: {}
        });
        console.log('Test user ensured.');
    } catch (e: any) {
        console.error('Failed to create user:', e.message);
    }

    // 1. Clear text product
    try {
        await prisma.product.delete({ where: { barcode } });
        console.log('Cleared test product.');
    } catch (e) {
        console.log('Product did not exist, skipping delete.');
    }

    // 2. First Scan
    console.log('Performing 1st Scan (External)...');
    const t1 = Date.now();
    try {
        await axios.post(url, { barcode, userId });
    } catch (e: any) {
        console.error('Scan 1 failed:', e.response?.data || e.message);
    }
    console.log(`Scan 1 time: ${Date.now() - t1}ms`);

    // 3. Verify Source
    const p = await prisma.product.findUnique({ where: { barcode } });
    console.log(`Product source: ${p ? p.source : 'NOT FOUND'}`);

    // 4. Second Scan
    console.log('Performing 2nd Scan (Local)...');
    const t2 = Date.now();
    try {
        await axios.post(url, { barcode, userId });
    } catch (e: any) {
        console.error('Scan 2 failed:', e.response?.data || e.message);
    }
    console.log(`Scan 2 time: ${Date.now() - t2}ms`);

    // 5. Products API
    try {
        const res = await axios.get('http://localhost:3000/api/products');
        console.log(`Total Products: ${res.data.products?.length ?? 'Invalid Format'}`);
    } catch (e: any) {
        console.error('Products API failed:', e.response?.data || e.message);
    }
}

run();
