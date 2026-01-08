
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const csvData = `8901030695552,Parle-G Biscuits,Parle,Biscuits,10,100
8901138501093,Good Day Butter,Britannia,Biscuits,20,80
8901491101837,Marie Gold,Britannia,Biscuits,30,60
8901063092345,Maggi Noodles,Nestle,Instant Food,14,200
8901262010016,Aashirvaad Atta,ITC,Flour,350,40
8901719123456,Tata Salt,Tata,Spices,28,150
8901567012345,Sunflower Oil,Fortune,Oil,180,50
8901234567890,Milk Packet,Amul,Dairy,28,100
8904004400136,Amul Butter,Amul,Dairy,52,70
8906004451234,Hide & Seek,Parle,Biscuits,30,90
012345678905,Coca Cola 500ml,Coca Cola,Soft Drink,40,120
036000291452,Lays Chips Classic,Lays,Snacks,20,110
042100005264,Kellogg's Cornflakes,Kelloggs,Cereals,145,35
049000044210,Sprite 500ml,Sprite,Soft Drink,40,90
050000000000,Pepsi 500ml,Pepsi,Soft Drink,40,85
060383755577,Red Bull Energy Drink,Red Bull,Beverage,110,60
070847012345,Snickers Bar,Snickers,Chocolate,45,100
073762806533,Dairy Milk Silk,Cadbury,Chocolate,80,75
075371307001,KitKat,Cadbury,Chocolate,20,140
078000000000,Thumbs Up 500ml,Thumbs Up,Soft Drink,40,95
4006381333931,Nutella Ferrero,Ferrero,Spread,399,25
5000159484695,Dettol Soap,Dettol,Personal Care,45,130
6001234567895,Pears Soap,Pears,Personal Care,65,90
6901234567892,Mi Instant Noodles,Mi,Instant Food,60,70
6912345678903,Real Fruit Juice,Real,Beverage,110,55
6923456789014,Tropicana Juice,Tropicana,Beverage,120,50
6934567890125,Bru Coffee,Bru,Beverage,95,65
6945678901236,Nescafe Classic,Nescafe,Beverage,145,40
6956789012347,Colgate Toothpaste,Colgate,Personal Care,95,85
6967890123458,Dove Shampoo,Dove,Personal Care,180,45`;

async function main() {
    console.log('Seeding real products...');

    const lines = csvData.split('\n');
    const products = [];

    for (const line of lines) {
        if (!line.trim()) continue;
        const [barcode, name, brand, category, price, quantity] = line.split(',');

        products.push({
            barcode: barcode.trim(),
            name: name.trim(),
            // brand is not in schema directly but useful for description
            category: category.trim(),
            price: parseFloat(price.trim()),
            stock: parseInt(quantity.trim()),
            // Generate a nice placeholder image based on name
            imageUrl: `https://placehold.co/400x400?text=${encodeURIComponent(name.trim().split(' ')[0])}`,
            isCustom: false,
            source: 'csv-import'
        });
    }

    // Use upsert to update if exists, or create if new
    // createMany with skipDuplicates is faster but upsert handles updates better if price changed
    // However, for bulk, createMany is better. We'll stick to createMany for speed.

    // Actually, let's use a loop of upserts to ensure we update prices/stock if they already exist
    let count = 0;
    for (const p of products) {
        await prisma.product.upsert({
            where: { barcode: p.barcode },
            update: {
                name: p.name,
                price: p.price,
                stock: p.stock,
                category: p.category,
                imageUrl: p.imageUrl
            },
            create: p
        });
        count++;
    }

    console.log(`Successfully processed ${count} products!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
