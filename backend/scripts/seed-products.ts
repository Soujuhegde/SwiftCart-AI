import 'dotenv/config';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
    { barcode: '8901030695552', name: 'Parle-G Biscuits', brand: 'Parle', category: 'Biscuits', price: 10, quantity: 100 },
    { barcode: '8901138501093', name: 'Good Day Butter', brand: 'Britannia', category: 'Biscuits', price: 20, quantity: 80 },
    { barcode: '8901491101837', name: 'Marie Gold', brand: 'Britannia', category: 'Biscuits', price: 30, quantity: 60 },
    { barcode: '8901063092345', name: 'Maggi Noodles', brand: 'Nestle', category: 'Instant Food', price: 14, quantity: 200 },
    { barcode: '8901262010016', name: 'Aashirvaad Atta', brand: 'ITC', category: 'Flour', price: 350, quantity: 40 },
    { barcode: '8901719123456', name: 'Tata Salt', brand: 'Tata', category: 'Spices', price: 28, quantity: 150 },
    { barcode: '8901567012345', name: 'Sunflower Oil', brand: 'Fortune', category: 'Oil', price: 180, quantity: 50 },
    { barcode: '8901234567890', name: 'Milk Packet', brand: 'Amul', category: 'Dairy', price: 28, quantity: 100 },
    { barcode: '8904004400136', name: 'Amul Butter', brand: 'Amul', category: 'Dairy', price: 52, quantity: 70 },
    { barcode: '8906004451234', name: 'Hide & Seek', brand: 'Parle', category: 'Biscuits', price: 30, quantity: 90 },
    { barcode: '012345678905', name: 'Coca Cola 500ml', brand: 'Coca Cola', category: 'Soft Drink', price: 40, quantity: 120 },
    { barcode: '036000291452', name: 'Lays Chips Classic', brand: 'Lays', category: 'Snacks', price: 20, quantity: 110 },
    { barcode: '042100005264', name: "Kellogg's Cornflakes", brand: 'Kelloggs', category: 'Cereals', price: 145, quantity: 35 },
    { barcode: '049000044210', name: 'Sprite 500ml', brand: 'Sprite', category: 'Soft Drink', price: 40, quantity: 90 },
    { barcode: '050000000000', name: 'Pepsi 500ml', brand: 'Pepsi', category: 'Soft Drink', price: 40, quantity: 85 },
    { barcode: '060383755577', name: 'Red Bull Energy Drink', brand: 'Red Bull', category: 'Beverage', price: 110, quantity: 60 },
    { barcode: '070847012345', name: 'Snickers Bar', brand: 'Snickers', category: 'Chocolate', price: 45, quantity: 100 },
    { barcode: '073762806533', name: 'Dairy Milk Silk', brand: 'Cadbury', category: 'Chocolate', price: 80, quantity: 75 },
    { barcode: '075371307001', name: 'KitKat', brand: 'Cadbury', category: 'Chocolate', price: 20, quantity: 140 },
    { barcode: '078000000000', name: 'Thumbs Up 500ml', brand: 'Thumbs Up', category: 'Soft Drink', price: 40, quantity: 95 },
    { barcode: '4006381333931', name: 'Nutella Ferrero', brand: 'Ferrero', category: 'Spread', price: 399, quantity: 25 },
    { barcode: '5000159484695', name: 'Dettol Soap', brand: 'Dettol', category: 'Personal Care', price: 45, quantity: 130 },
    { barcode: '6001234567895', name: 'Pears Soap', brand: 'Pears', category: 'Personal Care', price: 65, quantity: 90 },
    { barcode: '6901234567892', name: 'Mi Instant Noodles', brand: 'Mi', category: 'Instant Food', price: 60, quantity: 70 },
    { barcode: '6912345678903', name: 'Real Fruit Juice', brand: 'Real', category: 'Beverage', price: 110, quantity: 55 },
    { barcode: '6923456789014', name: 'Tropicana Juice', brand: 'Tropicana', category: 'Beverage', price: 120, quantity: 50 },
    { barcode: '6934567890125', name: 'Bru Coffee', brand: 'Bru', category: 'Beverage', price: 95, quantity: 65 },
    { barcode: '6945678901236', name: 'Nescafe Classic', brand: 'Nescafe', category: 'Beverage', price: 145, quantity: 40 },
    { barcode: '6956789012347', name: 'Colgate Toothpaste', brand: 'Colgate', category: 'Personal Care', price: 95, quantity: 85 },
    { barcode: '6967890123458', name: 'Dove Shampoo', brand: 'Dove', category: 'Personal Care', price: 180, quantity: 45 }
];

async function main() {
    console.log(`Starting seed of ${products.length} products...`);

    for (const p of products) {
        try {
            await prisma.product.upsert({
                where: { barcode: p.barcode },
                update: {
                    name: p.name,
                    price: parseFloat(p.price.toString()),
                    category: p.category,
                    description: `${p.brand} - Stock: ${p.quantity}`,
                    source: 'bulk-seed'
                },
                create: {
                    barcode: p.barcode,
                    name: p.name,
                    price: parseFloat(p.price.toString()),
                    category: p.category,
                    description: `${p.brand} - Stock: ${p.quantity}`,
                    source: 'bulk-seed',
                    isCustom: true
                }
            });
            console.log(`Upserted: ${p.name}`);
        } catch (e: any) {
            console.error(`Failed to upsert ${p.name}: ${e.message}`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
