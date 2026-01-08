import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { cartId, amount, method, transactionId } = await req.json();

        if (!cartId || !amount || !method) {
            return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
        }

        // 1. Validate Cart exists and is active
        const cart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true }
        });

        if (!cart || cart.status !== 'ACTIVE') {
            return NextResponse.json({ error: 'Invalid or inactive cart' }, { status: 400 });
        }

        // 2. Create Payment Record
        // Note: In a real system, verify transaction with gateway.
        const payment = await prisma.payment.create({
            data: {
                cartId: cartId,
                amount: amount,
                method: method, // CASH, UPI, CARD
                status: 'SUCCESS', // Assume success for demo
                transactionId: transactionId || `TXN-${Date.now()}`
            }
        });

        // 3. Update Cart Status to COMPLETED
        await prisma.cart.update({
            where: { id: cartId },
            data: { status: 'COMPLETED' }
        });

        return NextResponse.json({
            success: true,
            payment,
            message: 'Payment successful, cart closed'
        });

    } catch (error) {
        console.error('Payment API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
