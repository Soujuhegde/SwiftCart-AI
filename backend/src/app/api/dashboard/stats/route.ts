import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        revenue: 12500,
        transactions: 142,
        itemsSold: 356
    });
}
