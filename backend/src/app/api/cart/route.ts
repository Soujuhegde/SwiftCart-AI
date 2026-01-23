import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Get Cart
        const cartResult = await query('SELECT * FROM "Cart" WHERE "userId" = $1 AND status = \'ACTIVE\' LIMIT 1', [userId]);
        const cart = cartResult.rows[0];

        if (!cart) {
            return NextResponse.json({ items: [], total: 0 });
        }

        // Get Cart Items with Product Details
        const itemsResult = await query(
            'SELECT ci.*, json_build_object(\'id\', p.id, \'name\', p.name, \'price\', p.price, \'imageUrl\', p."imageUrl", \'barcode\', p.barcode, \'isCustom\', p."isCustom") as product ' +
            'FROM "CartItem" ci JOIN "Product" p ON ci."productId" = p.id ' +
            'WHERE ci."cartId" = $1 ORDER BY ci."createdAt" DESC',
            [cart.id]
        );

        const items = itemsResult.rows;
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return NextResponse.json({ ...cart, items, total });
    } catch (error: any) {
        console.error('Get Cart API Error (Raw SQL):', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { cartItemId, quantity } = await req.json();

        if (!cartItemId || quantity === undefined) {
            return NextResponse.json({ error: 'Cart Item ID and quantity are required' }, { status: 400 });
        }

        if (quantity <= 0) {
            await query('DELETE FROM "CartItem" WHERE id = $1', [cartItemId]);
            return NextResponse.json({ success: true, message: 'Item removed from cart' });
        }

        const result = await query(
            'UPDATE "CartItem" SET quantity = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *',
            [quantity, cartItemId]
        );

        return NextResponse.json({ success: true, item: result.rows[0] });

    } catch (error: any) {
        console.error('Update Cart API Error (Raw SQL):', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const cartItemId = searchParams.get('cartItemId');

        if (!cartItemId) {
            return NextResponse.json({ error: 'Cart Item ID is required' }, { status: 400 });
        }

        await query('DELETE FROM "CartItem" WHERE id = $1', [cartItemId]);

        return NextResponse.json({ success: true, message: 'Item removed from cart' });

    } catch (error: any) {
        console.error('Delete Cart Item API Error (Raw SQL):', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
