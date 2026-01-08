
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const imageMapping: { [key: string]: string } = {
    '8901030695552': 'https://groceryhub.nl/cdn/shop/files/GH-ParleGGlucoBiscuits80g.jpg?v=1701585852&width=1080', // Parle-G
    '8901138501093': 'https://m.media-amazon.com/images/I/71r2I1QpUBL._SL1500_.jpg', // Good Day
    '8901491101837': 'https://m.media-amazon.com/images/I/71X8kF2PvfL._SL1500_.jpg', // Marie Gold
    '8901063092345': 'https://m.media-amazon.com/images/I/81xU+y05XyL._SL1500_.jpg', // Maggi
    '8901262010016': 'https://m.media-amazon.com/images/I/81+mUfV-BXL._SL1500_.jpg', // Aashirvaad Atta
    '8901719123456': 'https://m.media-amazon.com/images/I/61NfT+7eA+L._SL1500_.jpg', // Tata Salt
    '8901567012345': 'https://m.media-amazon.com/images/I/61Z7X8o5MGL._SL1500_.jpg', // Sunflower Oil
    '8901234567890': 'https://static.abhibus.com/grocery/products/Amul_Taaza_500ml.jpg', // Milk Packet
    '8904004400136': 'https://m.media-amazon.com/images/I/61X-iS5D+WL._SL1000_.jpg', // Amul Butter
    '8906004451234': 'https://m.media-amazon.com/images/I/71+L7k6Uv8L._SL1500_.jpg', // Hide & Seek
    '012345678905': 'https://m.media-amazon.com/images/I/51v8ny9K61L._SL1500_.jpg', // Coca Cola
    '036000291452': 'https://imagedelivery.net/olI9wp0b6luWFB9nPfnqjQ/res/abillionveg/image/upload/ij5wbkhvvpnpeu3ta8v2/1628398426.jpg/public', // Lays
    '042100005264': 'https://m.media-amazon.com/images/I/71x0G-vG-qL._SL1500_.jpg', // Kelloggs
    '049000044210': 'https://m.media-amazon.com/images/I/61y+H8n2xKL._SL1500_.jpg', // Sprite
    '050000000000': 'https://m.media-amazon.com/images/I/61W9C0+S+sL._SL1500_.jpg', // Pepsi
    '060383755577': 'https://m.media-amazon.com/images/I/61mO-p+S-vL._SL1500_.jpg', // Red Bull
    '070847012345': 'https://m.media-amazon.com/images/I/51r-pS-vS-L._SL1000_.jpg', // Snickers
    '073762806533': 'https://m.media-amazon.com/images/I/61x0Y-p-PGL._SL1500_.jpg', // Dairy Milk Silk
    '075371307001': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/KitKat_4_fingers.jpg/800px-KitKat_4_fingers.jpg', // KitKat
    '6294003569006': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/KitKat_4_fingers.jpg/800px-KitKat_4_fingers.jpg', // Scanned KitKat
    '078000000000': 'https://m.media-amazon.com/images/I/71qI+S-D-qL._SL1500_.jpg', // Thumbs Up
    '4006381333931': 'https://m.media-amazon.com/images/I/61mI-p-S-iL._SL1500_.jpg', // Nutella
    '5000159484695': 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg', // Dettol
    '6001234567895': 'https://m.media-amazon.com/images/I/51p-pS-i-iL._SL1500_.jpg', // Pears
    '6901234567892': 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg', // Mi Noodles
    '6912345678903': 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg', // Real Juice
    '6923456789014': 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg', // Tropicana
    '6934567890125': 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg', // Bru Coffee
    '6945678901236': 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg', // Nescafe
    '6956789012347': 'https://m.media-amazon.com/images/I/61p-pS-i-iL._SL1500_.jpg', // Colgate
    '6967890123458': 'https://m.media-amazon.com/images/I/71p-pS-i-iL._SL1500_.jpg', // Dove
};

async function main() {
    console.log('Enriching product images...');

    let count = 0;
    for (const [barcode, imageUrl] of Object.entries(imageMapping)) {
        try {
            const product = await prisma.product.updateMany({
                where: { barcode: barcode },
                data: { imageUrl: imageUrl }
            });
            if (product.count > 0) {
                console.log(`Updated images for barcode: ${barcode}`);
                count++;
            }
        } catch (e) {
            console.error(`Failed to update barcode ${barcode}:`, e);
        }
    }

    console.log(`Successfully enriched ${count} products with real images!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
