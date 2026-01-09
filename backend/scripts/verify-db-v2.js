const axios = require('axios');
const { PrismaClient } = require('../src/generated/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
    console.log('Starting verification...');
    const barcode = '5449000000996';
    const url = 'http://localhost:3000/api/scan';

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
        await axios.post(url, { barcode, userId: 'test' });
    } catch (e) {
        console.error('Scan 1 failed:', e.message);
    }
    console.log(`Scan 1 time: ${Date.now() - t1}ms`);

    // 3. Verify Source
    const p = await prisma.product.findUnique({ where: { barcode } });
    console.log(`Product source: ${p ? p.source : 'NOT FOUND'}`);

    // 4. Second Scan
    console.log('Performing 2nd Scan (Local)...');
    const t2 = Date.now();
    try {
        await axios.post(url, { barcode, userId: 'test' });
    } catch (e) {
        console.error('Scan 2 failed:', e.message);
    }
    console.log(`Scan 2 time: ${Date.now() - t2}ms`);
}

run();
