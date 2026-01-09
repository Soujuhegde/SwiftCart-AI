
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Using Google CDN image URLs
const imageMapping: { [key: string]: string } = {
    '8901030695552': 'https://annachi.fr/wp-content/uploads/2021/04/Parle-G-Biscuit-79.9-Grams-PhotoRoom.webp', // Parle-G
    '8901138501093': 'https://wbfoodbasket.com/wp-content/uploads/2025/04/aTk1MmxQandjKyt1QmJ2WlZjVHkyQT09-product_image.jpg', // Good Day
    '8901063092345': 'https://velocitymarketplace.in/wp-content/uploads/2024/08/8b6d83fb56ddb329d4656168533d6816.png', // Maggi
    '8901262010016': 'https://m.media-amazon.com/images/I/51+ke2DncqL.jpg', // Aashirvaad Atta
    '8901719123456': 'https://m.media-amazon.com/images/I/614mm2hYHyL.jpg', // Tata Salt
    '8901567012345': 'https://m.media-amazon.com/images/I/616gnRopZDL._AC_UF894,1000_QL80_.jpg', // Sunflower Oil
    '8901234567890': 'https://cdn.shopify.com/s/files/1/0523/9934/1736/files/FullSizeRender.jpg?v=1724562386', // Amul Milk
    '8904004400136': 'https://m.media-amazon.com/images/S/aplus-media/sota/95d868ed-6acd-4efc-990f-ee892ff3118d.__CR0,0,970,600_PT0_SX970_V1___.jpg', // Amul Butter
    '8906004451234': 'https://indiashopping.io/cdn/shop/files/parle-cookies-100-gms-parle-hide-seek-biscuit-100-gms-44306576441632.png?v=1737805232', // Hide & Seek
    '012345678905': 'https://cdn.uengage.io/uploads/18085/image-381513-1685703917.jpeg', // Coca Cola
    '036000291452': 'https://m.media-amazon.com/images/I/711vAJ8fWlL._AC_UF894,1000_QL80_.jpg', // Lays
    '042100005264': 'https://m.media-amazon.com/images/I/81jnU7BjO8L._AC_UF894,1000_QL80_.jpg', // Kelloggs
    '049000044210': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0bFLTG2QHPpGOHQ8HQYcLAuSKwK0T3sXsg&s', // Sprite
    '050000000000': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClqDeFclKdl2Aembi8Q67kc5nAV2BT-btxw&s', // Pepsi
    '060383755577': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa6Ix6A_4wFF6NHCS-2vxmRUPdmsFuCggmgA&s', // Red Bull
    '070847012345': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIag2e9ElrH-Jzr46RkAEV_WuizY6SZ96KxA&s', // Snickers
    '073762806533': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1GAiuqMi0Q4gchSeePSSt5TRj7eA5gKxdA&s', // Dairy Milk Silk
    '075371307001': 'https://www.bbassets.com/media/uploads/p/l/40122230_15-nestle-kitkat-crispy-wafer-bar.jpg', // KitKat
    '6294003569006': 'https://preview.redd.it/the-packaging-of-this-kitkat-v0-q7lkxkqmqyu91.jpg?width=640&crop=smart&auto=webp&s=f4c58016a68ddf925759e1b5e1c9f5999fc56ec5', // KitKat variant
    '078000000000': 'https://www.bbassets.com/media/uploads/p/xl/251014_12-thums-up-soft-drink.jpg', // Thumbs Up
    '4006381333931': 'https://thegifttree.in/wp-content/uploads/2021/07/Nutella-Ferrero-Hazelnut-Spread-With-Cocoa-350g.png', // Nutella (using placeholder)
    '5000159484695': 'https://d1s24u4ln0wd0i.cloudfront.net/med_op/167482321563d3c62f79a4c.webp', // Dettol
    '6001234567895': 'https://www.stylecraze.com/wp-content/uploads/2013/07/Benefits-Of-Pears_1200px.jpg.webp', // Pears
    '6901234567892': 'https://m.media-amazon.com/images/I/81YSjWhje0L._AC_UF894,1000_QL80_.jpg', // Mi/Yippee Noodles
    '6912345678903': 'https://www.daburshop.com/cdn/shop/files/1_44c433fb-9362-48aa-9cd4-7973a609ad4f.png?v=1762947617', // Real Juice
    '6923456789014': 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/6/24/6b8f60e5-384b-4ce4-a103-3fe8beffdded_347_1.png', // Tropicana
    '6934567890125': 'https://m.media-amazon.com/images/I/61L96Ywi7aL._AC_UF894,1000_QL80_.jpg', // Bru Coffee
    '6945678901236': 'https://freshclub.co.in/cdn/shop/products/71zxqbC1a-L._SL1500.jpg?v=1655986674&width=1946', // Nescafe
    '6956789012347': 'https://vrmshoppe.com/wp-content/uploads/2021/06/61nctAojOEL._SL1000_.jpg', // Colgate
    '6967890123458': 'https://assets.ajio.com/medias/sys_master/root/20230117/oopT/63c644c0aeb269c651e4a3e3/-473Wx593H-4900592600-multi-MODEL.jpg', // Dove
};

async function main() {
    console.log('Updating product images with Google CDN URLs...');

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

    console.log(`\n✅ Successfully updated ${count} products with Google CDN images!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
