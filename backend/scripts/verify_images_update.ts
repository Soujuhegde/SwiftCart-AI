import 'dotenv/config';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
    console.log('Verifying updated products...');
    const barcodesToCheck = ['8901030695552', '8901138501093', '075371307001'];

    for (const barcode of barcodesToCheck) {
        const product = await prisma.product.findUnique({
            where: { barcode }
        });
        if (product) {
            console.log(`Product: ${product.name} (${barcode})`);
            console.log(`ImageUrl: ${product.imageUrl}`);
        } else {
            console.log(`Product with barcode ${barcode} not found!`);
        }
    }
}

verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
