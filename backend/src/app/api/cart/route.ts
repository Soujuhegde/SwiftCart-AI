import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId,
                status: 'ACTIVE'
            },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!cart) {
            // Return empty structure if no cart found
            return NextResponse.json({ items: [], total: 0 });
        }

        const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return NextResponse.json({ ...cart, total });
    } catch (error) {
        console.error('Get Cart API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { cartItemId, quantity } = await req.json();

        if (!cartItemId || quantity === undefined) {
            return NextResponse.json({ error: 'Cart Item ID and quantity are required' }, { status: 400 });
        }

        // If quantity is 0 or less, might remove item, but usually explicit delete is better.
        // Here we'll handle remove if quantity <= 0
        if (quantity <= 0) {
            await prisma.cartItem.delete({
                where: { id: cartItemId }
            });
            return NextResponse.json({ success: true, message: 'Item removed from cart' });
        }

        const updatedItem = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity }
        });

        return NextResponse.json({ success: true, item: updatedItem });

    } catch (error) {
        console.error('Update Cart API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const cartItemId = searchParams.get('cartItemId');

        if (!cartItemId) {
            return NextResponse.json({ error: 'Cart Item ID is required' }, { status: 400 });
        }

        await prisma.cartItem.delete({
            where: { id: cartItemId }
        });

        return NextResponse.json({ success: true, message: 'Item removed from cart' });

    } catch (error) {
        console.error('Delete Cart Item API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
