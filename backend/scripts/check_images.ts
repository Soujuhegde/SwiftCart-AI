
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const products = await prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    console.log('Sample products from database:');
    products.forEach(p => {
        console.log(`\nName: ${p.name}`);
        console.log(`ImageURL: ${p.imageUrl}`);
        console.log(`Has Image: ${!!p.imageUrl}`);
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
