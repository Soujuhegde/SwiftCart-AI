
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Using reliable placeholder service with product-specific branding
const imageMapping: { [key: string]: string } = {
    '8901030695552': 'https://placehold.co/400x400/FFD700/000000?text=Parle-G', // Parle-G (Gold)
    '8901138501093': 'https://placehold.co/400x400/FF6B35/FFFFFF?text=Good+Day', // Good Day (Orange)
    '8901491101837': 'https://placehold.co/400x400/FFE5B4/8B4513?text=Marie+Gold', // Marie Gold
    '8901063092345': 'https://placehold.co/400x400/FFD700/FF0000?text=Maggi', // Maggi (Yellow/Red)
    '8901262010016': 'https://placehold.co/400x400/8B4513/FFFFFF?text=Aashirvaad', // Aashirvaad (Brown)
    '8901719123456': 'https://placehold.co/400x400/0000FF/FFFFFF?text=Tata+Salt', // Tata Salt (Blue)
    '8901567012345': 'https://placehold.co/400x400/FFD700/000000?text=Fortune+Oil', // Fortune Oil
    '8901234567890': 'https://placehold.co/400x400/0066CC/FFFFFF?text=Amul+Milk', // Amul (Blue)
    '8904004400136': 'https://placehold.co/400x400/FFD700/0066CC?text=Amul+Butter', // Amul Butter
    '8906004451234': 'https://placehold.co/400x400/8B4513/FFD700?text=Hide+%26+Seek', // Hide & Seek
    '012345678905': 'https://placehold.co/400x400/FF0000/FFFFFF?text=Coca+Cola', // Coca Cola (Red)
    '036000291452': 'https://placehold.co/400x400/FFD700/FF0000?text=Lays', // Lays (Yellow/Red)
    '042100005264': 'https://placehold.co/400x400/FF0000/FFFFFF?text=Kelloggs', // Kelloggs (Red)
    '049000044210': 'https://placehold.co/400x400/00FF00/FFFFFF?text=Sprite', // Sprite (Green)
    '050000000000': 'https://placehold.co/400x400/0000FF/FF0000?text=Pepsi', // Pepsi (Blue/Red)
    '060383755577': 'https://placehold.co/400x400/FFD700/0000FF?text=Red+Bull', // Red Bull
    '070847012345': 'https://placehold.co/400x400/8B4513/FFFFFF?text=Snickers', // Snickers (Brown)
    '073762806533': 'https://placehold.co/400x400/800080/FFD700?text=Dairy+Milk', // Dairy Milk (Purple)
    '075371307001': 'https://placehold.co/400x400/FF0000/FFFFFF?text=KitKat', // KitKat (Red)
    '6294003569006': 'https://placehold.co/400x400/FF0000/FFFFFF?text=KitKat', // KitKat variant
    '078000000000': 'https://placehold.co/400x400/000000/FF0000?text=Thumbs+Up', // Thumbs Up (Black/Red)
    '4006381333931': 'https://placehold.co/400x400/8B4513/FFFFFF?text=Nutella', // Nutella (Brown)
    '5000159484695': 'https://placehold.co/400x400/00FF00/FFFFFF?text=Dettol', // Dettol (Green)
    '6001234567895': 'https://placehold.co/400x400/FFD700/00AA00?text=Pears', // Pears (Gold/Green)
    '6901234567892': 'https://placehold.co/400x400/FF6B35/FFFFFF?text=Mi+Noodles', // Mi Noodles
    '6912345678903': 'https://placehold.co/400x400/FF6B35/FFFFFF?text=Real+Juice', // Real Juice (Orange)
    '6923456789014': 'https://placehold.co/400x400/FF6B35/FFFFFF?text=Tropicana', // Tropicana (Orange)
    '6934567890125': 'https://placehold.co/400x400/8B4513/FFFFFF?text=Bru+Coffee', // Bru (Brown)
    '6945678901236': 'https://placehold.co/400x400/FF0000/FFFFFF?text=Nescafe', // Nescafe (Red)
    '6956789012347': 'https://placehold.co/400x400/FF0000/FFFFFF?text=Colgate', // Colgate (Red)
    '6967890123458': 'https://placehold.co/400x400/0000FF/FFFFFF?text=Dove', // Dove (Blue)
};

async function main() {
    console.log('Updating product images with working URLs...');

    let count = 0;
    for (const [barcode, imageUrl] of Object.entries(imageMapping)) {
        try {
            const product = await prisma.product.updateMany({
                where: { barcode: barcode },
                data: { imageUrl: imageUrl }
            });
            if (product.count > 0) {
                console.log(`✓ Updated ${barcode}`);
                count++;
            }
        } catch (e) {
            console.error(`✗ Failed ${barcode}:`, e);
        }
    }

    console.log(`\n✅ Successfully updated ${count} products with working image URLs!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
