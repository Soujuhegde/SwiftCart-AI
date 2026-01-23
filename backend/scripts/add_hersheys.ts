import 'dotenv/config';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Adding Hershey\'s Whole Almonds...');
    const product = await prisma.product.upsert({
        where: { barcode: '8901071705769' },
        update: {
            name: 'Hershey\'s Whole Almonds',
            category: 'Chocolates',
            price: 100, // Estimated price
            stock: 50,
            imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQLQqpG2yOPFM0ezqscncIA6OGs_TWHYg2iZqoXlcYJJuOMvHRLTvKt-HFN3GRrsF-knJHCSFPHv_GsDZ1RxvuWZk5q033zQzWzfMh52M0HsZwVpAgxao1TBg',
            source: 'manual-script-user-request'
        },
        create: {
            barcode: '8901071705769',
            name: 'Hershey\'s Whole Almonds',
            category: 'Chocolates',
            price: 100,
            stock: 50,
            imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQLQqpG2yOPFM0ezqscncIA6OGs_TWHYg2iZqoXlcYJJuOMvHRLTvKt-HFN3GRrsF-knJHCSFPHv_GsDZ1RxvuWZk5q033zQzWzfMh52M0HsZwVpAgxao1TBg',
            isCustom: true,
            source: 'manual-script-user-request'
        }
    });
    console.log('Successfully added/updated:', product);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
