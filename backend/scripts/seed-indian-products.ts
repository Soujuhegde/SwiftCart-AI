import 'dotenv/config';
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
    // Biscuits & Snacks
    { barcode: '8901030695552', name: 'Parle-G Biscuits', brand: 'Parle', category: 'Biscuits', price: 10 },
    { barcode: '8901063092345', name: 'Maggi Noodles', brand: 'Nestle', category: 'Instant Food', price: 14 },
    { barcode: '8901491101837', name: 'Marie Gold', brand: 'Britannia', category: 'Biscuits', price: 30 },
    { barcode: '8901138501093', name: 'Good Day Butter', brand: 'Britannia', category: 'Biscuits', price: 20 },
    { barcode: '8901138836526', name: 'Jim Jam Biscuits', brand: 'Britannia', category: 'Biscuits', price: 35 },
    { barcode: '8901063029457', name: 'KitKat 4 Finger', brand: 'Nestle', category: 'Chocolate', price: 25 },
    { barcode: '8901262140133', name: 'Bingo Mad Angles', brand: 'ITC', category: 'Snacks', price: 20 },
    { barcode: '8901491502016', name: 'Little Hearts', brand: 'Britannia', category: 'Biscuits', price: 15 },
    { barcode: '8901063032228', name: 'Munch', brand: 'Nestle', category: 'Chocolate', price: 10 },
    { barcode: '8901725132220', name: 'Kurkure Masala Munch', brand: 'Pepsico', category: 'Snacks', price: 20 },
    { barcode: '8901725181235', name: 'Lays Magic Masala', brand: 'Lays', category: 'Snacks', price: 20 },
    { barcode: '8901725192347', name: 'Doritos Nacho Cheese', brand: 'Doritos', category: 'Snacks', price: 30 },
    { barcode: '8901512456012', name: 'Haldiram Aloo Bhujia', brand: 'Haldiram', category: 'Snacks', price: 55 },
    { barcode: '8901030713447', name: 'Krackjack', brand: 'Parle', category: 'Biscuits', price: 20 },
    { barcode: '8901030723453', name: 'Monaco', brand: 'Parle', category: 'Biscuits', price: 20 },
    { barcode: '8901030695002', name: 'Hide & Seek', brand: 'Parle', category: 'Biscuits', price: 30 },
    { barcode: '8901262070146', name: 'Dark Fantasy', brand: 'ITC', category: 'Biscuits', price: 40 },
    { barcode: '8901491103329', name: 'Bourbon Biscuit', brand: 'Britannia', category: 'Biscuits', price: 25 },
    { barcode: '8901063152520', name: 'Nestle Classic Coffee', brand: 'Nestle', category: 'Beverage', price: 20 },
    { barcode: '0762220198889', name: 'Oreo Original', brand: 'Cadbury', category: 'Biscuits', price: 30 },

    // Beverages
    { barcode: '012345678905', name: 'Coca Cola 500ml', brand: 'Coca Cola', category: 'Soft Drink', price: 40 },
    { barcode: '049000044210', name: 'Sprite 500ml', brand: 'Coca Cola', category: 'Soft Drink', price: 40 },
    { barcode: '050000000000', name: 'Pepsi 500ml', brand: 'PepsiCo', category: 'Soft Drink', price: 40 },
    { barcode: '8901764032230', name: 'Maaza 600ml', brand: 'Maaza', category: 'Beverage', price: 45 },
    { barcode: '8901764042345', name: 'Fanta 500ml', brand: 'Coca Cola', category: 'Soft Drink', price: 40 },
    { barcode: '8901764123456', name: 'Limca 500ml', brand: 'Coca Cola', category: 'Soft Drink', price: 40 },
    { barcode: '060383755577', name: 'Red Bull Energy Drink', brand: 'Red Bull', category: 'Beverage', price: 125 },
    { barcode: '8901262170345', name: 'Sunfeast Milkshake', brand: 'ITC', category: 'Beverage', price: 35 },
    { barcode: '8901000210010', name: 'Amul Lassi', brand: 'Amul', category: 'Dairy', price: 25 },
    { barcode: '8901236015697', name: 'Real Mixed Fruit Juice', brand: 'Real', category: 'Beverage', price: 110 },
    { barcode: '8901236025696', name: 'Tropicana Orange', brand: 'Tropicana', category: 'Beverage', price: 120 },
    { barcode: '8901058863456', name: 'Horlicks 500g', brand: 'GSK', category: 'Health Drink', price: 245 },
    { barcode: '8901058823450', name: 'Bournvita 500g', brand: 'Cadbury', category: 'Health Drink', price: 230 },
    { barcode: '8901000100007', name: 'Amul Kool', brand: 'Amul', category: 'Dairy', price: 25 },
    { barcode: '8901207012345', name: 'Frooti 600ml', brand: 'Parle', category: 'Beverage', price: 40 },

    // Staples & Grocery
    { barcode: '8901262010016', name: 'Aashirvaad Atta 5kg', brand: 'ITC', category: 'Flour', price: 245 },
    { barcode: '8901262012027', name: 'Aashirvaad Salt', brand: 'ITC', category: 'Spices', price: 24 },
    { barcode: '8901719123456', name: 'Tata Salt', brand: 'Tata', category: 'Spices', price: 28 },
    { barcode: '8901567012345', name: 'Fortune Sunlite Oil 1L', brand: 'Adani Wilmar', category: 'Oil', price: 165 },
    { barcode: '8901567001455', name: 'Dhara Mustard Oil 1L', brand: 'Dhara', category: 'Oil', price: 175 },
    { barcode: '8906004451235', name: 'Daawat Basmati Rice', brand: 'Daawat', category: 'Rice', price: 150 },
    { barcode: '8901000000001', name: 'Amul Butter 100g', brand: 'Amul', category: 'Dairy', price: 56 },
    { barcode: '8901000000002', name: 'Amul Cheese Slices', brand: 'Amul', category: 'Dairy', price: 140 },
    { barcode: '8901000000003', name: 'Amul Fresh Cream', brand: 'Amul', category: 'Dairy', price: 70 },
    { barcode: '8901234567890', name: 'Toned Milk 1L', brand: 'Amul', category: 'Dairy', price: 58 },
    { barcode: '8904043901004', name: 'Saffola Gold Oil', brand: 'Marico', category: 'Oil', price: 195 },
    { barcode: '8906010500234', name: 'Everest Chicken Masala', brand: 'Everest', category: 'Spices', price: 45 },
    { barcode: '8906010500241', name: 'MDH Chaat Masala', brand: 'MDH', category: 'Spices', price: 68 },

    // Personal Care
    { barcode: '8901030800123', name: 'Dettol Soap', brand: 'Reckitt', category: 'Personal Care', price: 42 },
    { barcode: '8901030800124', name: 'Lifebuoy Soap', brand: 'Unilever', category: 'Personal Care', price: 38 },
    { barcode: '8901030800125', name: 'Lux Soap', brand: 'Unilever', category: 'Personal Care', price: 45 },
    { barcode: '8901030800126', name: 'Dove Soap', brand: 'Unilever', category: 'Personal Care', price: 65 },
    { barcode: '8901030800127', name: 'Pears Soap', brand: 'Unilever', category: 'Personal Care', price: 60 },
    { barcode: '8901314010502', name: 'Colgate Strong Teeth', brand: 'Colgate', category: 'Personal Care', price: 95 },
    { barcode: '8901000000123', name: 'Pepsodent', brand: 'Unilever', category: 'Personal Care', price: 85 },
    { barcode: '8901088012345', name: 'Close Up', brand: 'Unilever', category: 'Personal Care', price: 90 },
    { barcode: '8904000100234', name: 'Himalaya Face Wash', brand: 'Himalaya', category: 'Personal Care', price: 145 },
    { barcode: '8901248102345', name: 'Nivea Men Deodorant', brand: 'Nivea', category: 'Personal Care', price: 220 },
    { barcode: '8901058000123', name: 'Sensodyne Toothpaste', brand: 'GSK', category: 'Personal Care', price: 180 },
    { barcode: '8904250700123', name: 'Mamaearth Face Wash', brand: 'Mamaearth', category: 'Personal Care', price: 350 },
    { barcode: '8901088123001', name: 'Sunsilk Shampoo', brand: 'Unilever', category: 'Personal Care', price: 190 },
    { barcode: '8901088123002', name: 'Clinic Plus Shampoo', brand: 'Unilever', category: 'Personal Care', price: 160 },
    { barcode: '8901425001234', name: 'Head & Shoulders', brand: 'P&G', category: 'Personal Care', price: 420 },

    // Household
    { barcode: '8901088005678', name: 'Vim Dishwash Bar', brand: 'Unilever', category: 'Household', price: 20 },
    { barcode: '8901088005679', name: 'Rin Detergent Bar', brand: 'Unilever', category: 'Household', price: 30 },
    { barcode: '8901088005680', name: 'Surf Excel', brand: 'Unilever', category: 'Household', price: 140 },
    { barcode: '8901396123456', name: 'Ariel Matic', brand: 'P&G', category: 'Household', price: 280 },
    { barcode: '8902102123456', name: 'Harpic Toilet Cleaner', brand: 'Reckitt', category: 'Household', price: 99 },
    { barcode: '8902102123457', name: 'Lizol Floor Cleaner', brand: 'Reckitt', category: 'Household', price: 195 },
    { barcode: '8905110001234', name: 'Odonil Room Freshner', brand: 'Dabur', category: 'Household', price: 65 },
    { barcode: '8901088000999', name: 'Comfort Fabric Conditioner', brand: 'Unilever', category: 'Household', price: 220 },
    { barcode: '8901234000888', name: 'Good Knight Refill', brand: 'Godrej', category: 'Household', price: 85 },
    { barcode: '8901234000999', name: 'Hit Cockroach Spray', brand: 'Godrej', category: 'Household', price: 130 },

    // More Snacks for Simulation Variety
    { barcode: '8901063099999', name: 'Nestle Foxs Candy', brand: 'Nestle', category: 'Snacks', price: 150 },
    { barcode: '0708470123456', name: 'Snickers Bar', brand: 'Mars', category: 'Chocolate', price: 50 },
    { barcode: '8901262030012', name: 'Yippee Noodles', brand: 'ITC', category: 'Instant Food', price: 12 },
    { barcode: '8901548123012', name: 'Haldiram Soan Papdi', brand: 'Haldiram', category: 'Sweets', price: 120 },
    { barcode: '8901262040012', name: 'Mom Magic Biscuits', brand: 'ITC', category: 'Biscuits', price: 35 }
];

async function main() {
    console.log(`Starting massive seed of ${products.length} Indian products...`);

    let count = 0;
    for (const p of products) {
        try {
            await prisma.product.upsert({
                where: { barcode: p.barcode },
                update: {
                    name: p.name,
                    price: parseFloat(p.price.toString()),
                    category: p.category,
                    description: `${p.brand} - Rs. ${p.price}`,
                    source: 'bulk-seed-indian'
                },
                create: {
                    barcode: p.barcode,
                    name: p.name,
                    price: parseFloat(p.price.toString()),
                    category: p.category,
                    description: `${p.brand} - Rs. ${p.price}`,
                    source: 'bulk-seed-indian',
                    isCustom: true
                }
            });
            count++;
            if (count % 10 === 0) console.log(`Processed ${count} products...`);
        } catch (e: any) {
            console.error(`Failed to upsert ${p.name}: ${e.message}`);
        }
    }

    console.log(`Seeding completed. ${count} products available locally.`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
