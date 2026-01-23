
require('dotenv').config();
const { PrismaClient } = require('../src/generated/client');

const prisma = new PrismaClient();

async function main() {
    const barcode = '8901192001207';

    console.log(`Checking for product with barcode ${barcode}...`);

    const existingProduct = await prisma.product.findUnique({
        where: { barcode },
    });

    if (existingProduct) {
        console.log(`Product already exists: ${existingProduct.name}`);
    } else {
        console.log('Product not found. Adding Catch Black Salt Sprinklers...');
        const product = await prisma.product.create({
            data: {
                barcode,
                name: 'Catch Black Salt Sprinklers',
                description: 'Catch Black Salt Sprinklers 200 g',
                price: 60,
                imageUrl: 'https://m.media-amazon.com/images/I/61NKu6+rWtL.jpg',
                stock: 100,
                isCustom: true,
                source: 'manual-script'
            },
        });
        console.log(`Successfully added product: ${product.name}`);
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
