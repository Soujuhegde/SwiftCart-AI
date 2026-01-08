import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const userId = 'demo-user-id';

        const cart = await prisma.cart.findFirst({
            where: {
                userId,
                status: 'ACTIVE'
            }
        });

        if (cart) {
            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id }
            });
            return NextResponse.json({ success: true, message: 'Cart cleared' });
        }

        return NextResponse.json({ success: true, message: 'No active cart to clear' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
