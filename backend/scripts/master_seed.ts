
require('dotenv').config();
import { PrismaClient } from '../src/generated/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
    { barcode: '8901030695552', name: 'Parle-G Biscuits', category: 'Biscuits', price: 10, stock: 100, imageUrl: 'https://annachi.fr/wp-content/uploads/2021/04/Parle-G-Biscuit-79.9-Grams-PhotoRoom.webp' },
    { barcode: '8901138501093', name: 'Good Day Butter', category: 'Biscuits', price: 20, stock: 80, imageUrl: 'https://wbfoodbasket.com/wp-content/uploads/2025/04/aTk1MmxQandjKyt1QmJ2WlZjVHkyQT09-product_image.jpg' },
    { barcode: '8901491101837', name: 'Marie Gold', category: 'Biscuits', price: 30, stock: 60, imageUrl: 'https://m.media-amazon.com/images/I/71X8kF2PvfL._SL1500_.jpg' },
    { barcode: '8901063092345', name: 'Maggi Noodles', category: 'Instant Food', price: 14, stock: 200, imageUrl: 'https://velocitymarketplace.in/wp-content/uploads/2024/08/8b6d83fb56ddb329d4656168533d6816.png' },
    { barcode: '8901262010016', name: 'Aashirvaad Atta', category: 'Flour', price: 350, stock: 40, imageUrl: 'https://m.media-amazon.com/images/I/51+ke2DncqL.jpg' },
    { barcode: '8901719123456', name: 'Tata Salt', category: 'Spices', price: 28, stock: 150, imageUrl: 'https://m.media-amazon.com/images/I/614mm2hYHyL.jpg' },
    { barcode: '8901567012345', name: 'Sunflower Oil', category: 'Oil', price: 180, stock: 50, imageUrl: 'https://m.media-amazon.com/images/I/616gnRopZDL._AC_UF894,1000_QL80_.jpg' },
    { barcode: '8901234567890', name: 'Milk Packet', category: 'Dairy', price: 28, stock: 100, imageUrl: 'https://cdn.shopify.com/s/files/1/0523/9934/1736/files/FullSizeRender.jpg?v=1724562386' },
    { barcode: '8904004400136', name: 'Amul Butter', category: 'Dairy', price: 52, stock: 70, imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/sota/95d868ed-6acd-4efc-990f-ee892ff3118d.__CR0,0,970,600_PT0_SX970_V1___.jpg' },
    { barcode: '8906004451234', name: 'Hide & Seek', category: 'Biscuits', price: 30, stock: 90, imageUrl: 'https://indiashopping.io/cdn/shop/files/parle-cookies-100-gms-parle-hide-seek-biscuit-100-gms-44306576441632.png?v=1737805232' },
    { barcode: '012345678905', name: 'Coca Cola 500ml', category: 'Soft Drink', price: 40, stock: 120, imageUrl: 'https://cdn.uengage.io/uploads/18085/image-381513-1685703917.jpeg' },
    { barcode: '036000291452', name: 'Lays Chips Classic', category: 'Snacks', price: 20, stock: 110, imageUrl: 'https://m.media-amazon.com/images/I/711vAJ8fWlL._AC_UF894,1000_QL80_.jpg' },
    { barcode: '042100005264', name: 'Kelloggs Cornflakes', category: 'Cereals', price: 145, stock: 35, imageUrl: 'https://m.media-amazon.com/images/I/81jnU7BjO8L._AC_UF894,1000_QL80_.jpg' },
    { barcode: '049000044210', name: 'Sprite 500ml', category: 'Soft Drink', price: 40, stock: 90, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0bFLTG2QHPpGOHQ8HQYcLAuSKwK0T3sXsg&s' },
    { barcode: '050000000000', name: 'Pepsi 500ml', category: 'Soft Drink', price: 40, stock: 85, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClqDeFclKdl2Aembi8Q67kc5nAV2BT-btxw&s' },
    { barcode: '060383755577', name: 'Red Bull Energy Drink', category: 'Beverage', price: 110, stock: 60, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa6Ix6A_4wFF6NHCS-2vxmRUPdmsFuCggmgA&s' },
    { barcode: '070847012345', name: 'Snickers Bar', category: 'Chocolate', price: 45, stock: 100, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIag2e9ElrH-Jzr46RkAEV_WuizY6SZ96KxA&s' },
    { barcode: '073762806533', name: 'Dairy Milk Silk', category: 'Chocolate', price: 80, stock: 75, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1GAiuqMi0Q4gchSeePSSt5TRj7eA5gKxdA&s' },
    { barcode: '075371307001', name: 'KitKat', category: 'Chocolate', price: 20, stock: 140, imageUrl: 'https://www.bbassets.com/media/uploads/p/l/40122230_15-nestle-kitkat-crispy-wafer-bar.jpg' },
    { barcode: '6294003569006', name: 'KitKat (4 Finger)', category: 'Chocolate', price: 20, stock: 50, imageUrl: 'https://preview.redd.it/the-packaging-of-this-kitkat-v0-q7lkxkqmqyu91.jpg?width=640&crop=smart&auto=webp&s=f4c58016a68ddf925759e1b5e1c9f5999fc56ec5' },
    { barcode: '078000000000', name: 'Thumbs Up 500ml', category: 'Soft Drink', price: 40, stock: 95, imageUrl: 'https://www.bbassets.com/media/uploads/p/xl/251014_12-thums-up-soft-drink.jpg' },
    { barcode: '4006381333931', name: 'Nutella Ferrero', category: 'Spread', price: 399, stock: 25, imageUrl: 'https://thegifttree.in/wp-content/uploads/2021/07/Nutella-Ferrero-Hazelnut-Spread-With-Cocoa-350g.png' },
    { barcode: '5000159484695', name: 'Dettol Soap', category: 'Personal Care', price: 45, stock: 130, imageUrl: 'https://d1s24u4ln0wd0i.cloudfront.net/med_op/167482321563d3c62f79a4c.webp' },
    { barcode: '6001234567895', name: 'Pears Soap', category: 'Personal Care', price: 65, stock: 90, imageUrl: 'https://www.stylecraze.com/wp-content/uploads/2013/07/Benefits-Of-Pears_1200px.jpg.webp' },
    { barcode: '6901234567892', name: 'Mi Instant Noodles', category: 'Instant Food', price: 60, stock: 70, imageUrl: 'https://m.media-amazon.com/images/I/81YSjWhje0L._AC_UF894,1000_QL80_.jpg' },
    { barcode: '6912345678903', name: 'Real Fruit Juice', category: 'Beverage', price: 110, stock: 55, imageUrl: 'https://www.daburshop.com/cdn/shop/files/1_44c433fb-9362-48aa-9cd4-7973a609ad4f.png?v=1762947617' },
    { barcode: '6923456789014', name: 'Tropicana Juice', category: 'Beverage', price: 120, stock: 50, imageUrl: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/6/24/6b8f60e5-384b-4ce4-a103-3fe8beffdded_347_1.png' },
    { barcode: '6934567890125', name: 'Bru Coffee', category: 'Beverage', price: 95, stock: 65, imageUrl: 'https://m.media-amazon.com/images/I/61L96Ywi7aL._AC_UF894,1000_QL80_.jpg' },
    { barcode: '6945678901236', name: 'Nescafe Classic', category: 'Beverage', price: 145, stock: 40, imageUrl: 'https://freshclub.co.in/cdn/shop/products/71zxqbC1a-L._SL1500.jpg?v=1655986674&width=1946' },
    { barcode: '6956789012347', name: 'Colgate Toothpaste', category: 'Personal Care', price: 95, stock: 85, imageUrl: 'https://vrmshoppe.com/wp-content/uploads/2021/06/61nctAojOEL._SL1000_.jpg' },
    { barcode: '6967890123458', name: 'Dove Shampoo', category: 'Personal Care', price: 180, stock: 45, imageUrl: 'https://assets.ajio.com/medias/sys_master/root/20230117/oopT' }
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
