import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ status: 'ok', message: 'SwiftCart Backend running on Next.js' });
}
