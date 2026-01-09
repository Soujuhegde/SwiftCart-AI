
require('dotenv').config();
// Direct instantiation to avoid import resolution issues in standalone script
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const categories = ['Grocery', 'Electronics', 'Stationery', 'Snacks', 'Beverages', 'Personal Care'];
const productNames = [
    'Amul Butter 100g', 'Britannia Bread', 'Colgate Toothpaste', 'Dove Soap', 'Eggs (Dozen)',
    'Fortune Oil 1L', 'Green Tea', 'Haldiram Bhujia', 'Ice Cream Vanilla', 'Jam Kissan',
    'Kelloggs Cornflakes', 'Lays Chips', 'Maggi Noodles', 'Nutella', 'Oreo Biscuits',
    'Parle-G', 'Quaker Oats', 'Red Label Tea', 'Sugar 1kg', 'Tata Salt',
    'Urad Dal 1kg', 'Vim Dishwash Bar', 'Wheat Flour 5kg', 'Xylitol Gum', 'Yogurt',
    'Zandu Balm', 'Apple Shimla', 'Banana Robusta', 'Coke 500ml', 'Diet Pepsi',
    'Eveready Batteries', 'Fanta Orange', 'Gatorade', 'Heinz Ketchup', 'Ink Pen Parker',
    'Juice Real Orange', 'KitKat 4 Finger', 'Lipton Iced Tea', 'Milk Amul Gold', 'Notebook Classmate',
    'Olive Oil Figaro', 'Paper Boat Aamras', 'Q-Tips', 'Rice Basmati 5kg', 'Sprite 750ml',
    'Tissue Box', 'Umbrella', 'Vaseline Jelly', 'Water Bottle 1L', 'Xerox Paper A4'
];

async function main() {
    console.log('Seeding 50 products...');

    const products = productNames.map((name, index) => {
        // Generate a pseudo-random 13-digit barcode (EAN-13 style)
        // Starting with 890 (India) for realism
        const barcode = `890${100000000 + index}`;
        const category = categories[index % categories.length];
        const price = Math.floor(Math.random() * 500) + 10; // Price between 10 and 510

        return {
            barcode,
            name,
            description: `Premium ${name} - Top Quality`,
            price,
            stock: 50 + Math.floor(Math.random() * 50), // Stock between 50 and 100
            imageUrl: `https://placehold.co/400x400?text=${encodeURIComponent(name.split(' ')[0])}`,
            category,
            source: 'seed-script',
            isCustom: false
        };
    });

    // Using createMany for efficiency
    // Note: createMany is supported in Prisma for Postgres
    const result = await prisma.product.createMany({
        data: products,
        skipDuplicates: true, // In case barcode already exists
    });

    console.log(`Successfully added ${result.count} products!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
