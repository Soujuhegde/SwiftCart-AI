
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
    { barcode: '8901030695552', name: 'Parle-G Biscuits', category: 'Biscuits', price: 10, stock: 100, imageUrl: 'https://m.media-amazon.com/images/I/51p0809xS5L._SL1000_.jpg' },
    { barcode: '8901138501093', name: 'Good Day Butter', category: 'Biscuits', price: 20, stock: 80, imageUrl: 'https://m.media-amazon.com/images/I/71r2I1QpUBL._SL1500_.jpg' },
    { barcode: '8901491101837', name: 'Marie Gold', category: 'Biscuits', price: 30, stock: 60, imageUrl: 'https://m.media-amazon.com/images/I/71X8kF2PvfL._SL1500_.jpg' },
    { barcode: '8901063092345', name: 'Maggi Noodles', category: 'Instant Food', price: 14, stock: 200, imageUrl: 'https://m.media-amazon.com/images/I/81xU+y05XyL._SL1500_.jpg' },
    { barcode: '8901262010016', name: 'Aashirvaad Atta', category: 'Flour', price: 350, stock: 40, imageUrl: 'https://m.media-amazon.com/images/I/81+mUfV-BXL._SL1500_.jpg' },
    { barcode: '8901719123456', name: 'Tata Salt', category: 'Spices', price: 28, stock: 150, imageUrl: 'https://m.media-amazon.com/images/I/61NfT+7eA+L._SL1500_.jpg' },
    { barcode: '8901567012345', name: 'Sunflower Oil', category: 'Oil', price: 180, stock: 50, imageUrl: 'https://m.media-amazon.com/images/I/61Z7X8o5MGL._SL1500_.jpg' },
    { barcode: '8901234567890', name: 'Milk Packet', category: 'Dairy', price: 28, stock: 100, imageUrl: 'https://static.abhibus.com/grocery/products/Amul_Taaza_500ml.jpg' },
    { barcode: '8904004400136', name: 'Amul Butter', category: 'Dairy', price: 52, stock: 70, imageUrl: 'https://m.media-amazon.com/images/I/61X-iS5D+WL._SL1000_.jpg' },
    { barcode: '8906004451234', name: 'Hide & Seek', category: 'Biscuits', price: 30, stock: 90, imageUrl: 'https://m.media-amazon.com/images/I/71+L7k6Uv8L._SL1500_.jpg' },
    { barcode: '012345678905', name: 'Coca Cola 500ml', category: 'Soft Drink', price: 40, stock: 120, imageUrl: 'https://m.media-amazon.com/images/I/51v8ny9K61L._SL1500_.jpg' },
    { barcode: '036000291452', name: 'Lays Chips Classic', category: 'Snacks', price: 20, stock: 110, imageUrl: 'https://m.media-amazon.com/images/I/71c2L-s84YL._SL1500_.jpg' },
    { barcode: '042100005264', name: 'Kelloggs Cornflakes', category: 'Cereals', price: 145, stock: 35, imageUrl: 'https://m.media-amazon.com/images/I/71x0G-vG-qL._SL1500_.jpg' },
    { barcode: '049000044210', name: 'Sprite 500ml', category: 'Soft Drink', price: 40, stock: 90, imageUrl: 'https://m.media-amazon.com/images/I/61y+H8n2xKL._SL1500_.jpg' },
    { barcode: '050000000000', name: 'Pepsi 500ml', category: 'Soft Drink', price: 40, stock: 85, imageUrl: 'https://m.media-amazon.com/images/I/61W9C0+S+sL._SL1500_.jpg' },
    { barcode: '060383755577', name: 'Red Bull Energy Drink', category: 'Beverage', price: 110, stock: 60, imageUrl: 'https://m.media-amazon.com/images/I/61mO-p+S-vL._SL1500_.jpg' },
    { barcode: '070847012345', name: 'Snickers Bar', category: 'Chocolate', price: 45, stock: 100, imageUrl: 'https://m.media-amazon.com/images/I/51r-pS-vS-L._SL1000_.jpg' },
    { barcode: '073762806533', name: 'Dairy Milk Silk', category: 'Chocolate', price: 80, stock: 75, imageUrl: 'https://m.media-amazon.com/images/I/61x0Y-p-PGL._SL1500_.jpg' },
    { barcode: '075371307001', name: 'KitKat', category: 'Chocolate', price: 20, stock: 140, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/KitKat_4_fingers.jpg/800px-KitKat_4_fingers.jpg' },
    { barcode: '6294003569006', name: 'KitKat (4 Finger)', category: 'Chocolate', price: 20, stock: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/KitKat_4_fingers.jpg/800px-KitKat_4_fingers.jpg' },
    { barcode: '078000000000', name: 'Thumbs Up 500ml', category: 'Soft Drink', price: 40, stock: 95, imageUrl: 'https://m.media-amazon.com/images/I/71qI+S-D-qL._SL1500_.jpg' },
    { barcode: '4006381333931', name: 'Nutella Ferrero', category: 'Spread', price: 399, stock: 25, imageUrl: 'https://m.media-amazon.com/images/I/61mI-p-S-iL._SL1500_.jpg' },
    { barcode: '5000159484695', name: 'Dettol Soap', category: 'Personal Care', price: 45, stock: 130, imageUrl: 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6001234567895', name: 'Pears Soap', category: 'Personal Care', price: 65, stock: 90, imageUrl: 'https://m.media-amazon.com/images/I/51p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6901234567892', name: 'Mi Instant Noodles', category: 'Instant Food', price: 60, stock: 70, imageUrl: 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6912345678903', name: 'Real Fruit Juice', category: 'Beverage', price: 110, stock: 55, imageUrl: 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6923456789014', name: 'Tropicana Juice', category: 'Beverage', price: 120, stock: 50, imageUrl: 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6934567890125', name: 'Bru Coffee', category: 'Beverage', price: 95, stock: 65, imageUrl: 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6945678901236', name: 'Nescafe Classic', category: 'Beverage', price: 145, stock: 40, imageUrl: 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6956789012347', name: 'Colgate Toothpaste', category: 'Personal Care', price: 95, stock: 85, imageUrl: 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg' },
    { barcode: '6967890123458', name: 'Dove Shampoo', category: 'Personal Care', price: 180, stock: 45, imageUrl: 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg' }
];

async function main() {
    console.log('Clearing database...');
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();

    console.log('Seeding real products...');
    for (const p of products) {
        await prisma.product.create({
            data: {
                barcode: p.barcode,
                name: p.name,
                category: p.category,
                price: p.price,
                stock: p.stock,
                imageUrl: p.imageUrl,
                isCustom: false,
                source: 'master-seed'
            }
        });
    }
    console.log(`Successfully seeded ${products.length} real products!`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
