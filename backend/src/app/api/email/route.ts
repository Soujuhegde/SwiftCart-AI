import { NextResponse } from 'next/server';
import { sendInvoiceEmail } from '@/lib/sendInvoiceEmail';
import { generateInvoiceHtml } from '@/lib/generateInvoiceHtml';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, orderDetails } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Generate invoice HTML
        const invoiceHtml = generateInvoiceHtml(orderDetails);

        // Send invoice email
        await sendInvoiceEmail(email, invoiceHtml);

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: `Failed to send email: ${errorMessage}` }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
