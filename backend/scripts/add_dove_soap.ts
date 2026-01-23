import 'dotenv/config';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Adding Dove Soap...');
    const product = await prisma.product.upsert({
        where: { barcode: '8901030712999' },
        update: {
            name: 'Dove Soap',
            category: 'Personal Care',
            price: 65, // Standard price estimate
            stock: 100,
            imageUrl: 'https://m.media-amazon.com/images/I/514mVfEU7FL.jpg',
            source: 'manual-script-user-request'
        },
        create: {
            barcode: '8901030712999',
            name: 'Dove Soap',
            category: 'Personal Care',
            price: 65,
            stock: 100,
            imageUrl: 'https://m.media-amazon.com/images/I/514mVfEU7FL.jpg',
            isCustom: true,
            source: 'manual-script-user-request'
        }
    });
    console.log('Successfully added/updated:', product);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
