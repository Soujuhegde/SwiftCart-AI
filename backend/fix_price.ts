
import { PrismaClient } from './src/generated/client/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Fixing KitKat prices...');

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: 'KitKat',
                mode: 'insensitive',
            },
        },
    });

    console.log(`Found ${products.length} KitKat products.`);

    for (const product of products) {
        const updated = await prisma.product.update({
            where: { id: product.id },
            data: { price: 20 }
        });
        console.log(`Updated ${updated.name} (Barcode: ${updated.barcode}) price to ₹20`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
