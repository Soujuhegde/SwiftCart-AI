import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function savePayment(payment: any) {
    try {
        let payments = [];
        if (fs.existsSync(PAYMENTS_FILE)) {
            const data = fs.readFileSync(PAYMENTS_FILE, 'utf-8');
            payments = JSON.parse(data);
        }
        payments.push(payment);
        fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
    } catch (e) {
        console.error("Failed to save payment to file", e);
    }
}

export async function POST(req: Request) {
    try {
        const { cartId, amount, method, transactionId } = await req.json();

        // Basic validation
        if (!amount || !method) {
            // Forcing Success even if cartId is missing for demo purposes, 
            // but usually cartId is required. 
            // If frontend sends it, we log it.
        }

        const newPayment = {
            id: `PAY-${Date.now()}`,
            cartId: cartId || 'GUEST-CART',
            amount,
            method,
            status: 'SUCCESS',
            transactionId: transactionId || `TXN-${Date.now()}`,
            createdAt: new Date().toISOString()
        };

        // Save to file
        savePayment(newPayment);

        return NextResponse.json({
            success: true,
            payment: newPayment,
            message: 'Payment processed successfully (File Backend)'
        });

    } catch (error) {
        console.error('Payment API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
