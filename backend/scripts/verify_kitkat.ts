
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const kitkat = await prisma.product.findFirst({
        where: {
            OR: [
                { barcode: '6294003569006' },
                { name: { contains: 'KitKat', mode: 'insensitive' } }
            ]
        }
    });
    console.log('KitKat DB Record:', kitkat);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
