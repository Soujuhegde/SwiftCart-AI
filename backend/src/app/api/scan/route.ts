import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import axios from 'axios';

export const dynamic = 'force-dynamic';

async function fetchFromOpenFoodFacts(barcode: string) {
    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, { timeout: 5000 });
        if (response.data?.status !== 1) return null;
        const product = response.data.product;
        return {
            name: product.product_name_en || product.product_name || `Item ${barcode}`,
            description: product.generic_name_en || product.generic_name || '',
            imageUrl: product.image_front_url || product.image_url || '',
            price: Math.floor(Math.random() * 140) + 10,
        };
    } catch (error) {
        console.error('OpenFoodFacts error:', error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { barcode, userId } = body;
        // Keep original characters for alphanumeric support (e.g. manual-add codes)
        barcode = String(barcode || '').trim();

        if (!barcode || barcode.length < 3) {
            return NextResponse.json({ error: 'Invalid code entered/scanned' }, { status: 400 });
        }

        // 1. Find or create product
        let productResult = await query('SELECT * FROM "Product" WHERE barcode = $1', [barcode]);
        let product = productResult.rows[0];

        if (!product) {
            const offData = await fetchFromOpenFoodFacts(barcode);
            const data = offData || {
                name: `Item ${barcode}`,
                description: 'Auto-detected item',
                imageUrl: 'https://placehold.co/400x400?text=Item',
                price: Math.floor(Math.random() * 140) + 10,
            };

            const insertResult = await query(
                'INSERT INTO "Product" (id, barcode, name, description, "imageUrl", price, category, source, "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
                [`prod-${Date.now()}`, barcode, data.name, data.description, data.imageUrl, data.price, 'Grocery', offData ? 'openfoodfacts' : 'manual-auto']
            );
            product = insertResult.rows[0];
        }

        // 2. User Handling
        const targetUserId = userId || 'demo-user-id';
        await query(
            'INSERT INTO "User" (id, email, name, "updatedAt") VALUES ($1, $2, $3, NOW()) ON CONFLICT (id) DO NOTHING',
            [targetUserId, `${targetUserId}@example.com`, 'Demo User']
        );

        // 3. Cart Handling
        let cartResult = await query('SELECT * FROM "Cart" WHERE "userId" = $1 AND status = \'ACTIVE\' LIMIT 1', [targetUserId]);
        let cart = cartResult.rows[0];

        if (!cart) {
            const newCartResult = await query(
                'INSERT INTO "Cart" (id, "userId", status, "updatedAt") VALUES ($1, $2, $3, NOW()) RETURNING *',
                [`cart-${Date.now()}`, targetUserId, 'ACTIVE']
            );
            cart = newCartResult.rows[0];
        }

        // 4. Cart Item Upsert
        const itemResult = await query(
            'INSERT INTO "CartItem" (id, "cartId", "productId", quantity, price, "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT ("cartId", "productId") DO UPDATE SET quantity = "CartItem".quantity + 1 RETURNING *',
            [`item-${Date.now()}`, cart.id, product.id, 1, product.price]
        );

        return NextResponse.json({
            success: true,
            product,
            cartItem: itemResult.rows[0],
            message: 'Product scanned and added to cart',
        });
    } catch (error: any) {
        console.error('Scan API Error (Raw SQL):', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
