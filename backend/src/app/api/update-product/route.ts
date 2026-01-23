
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { barcode, imageUrl } = await req.json();

        const result = await query(
            'UPDATE "Product" SET "imageUrl" = $1, "updatedAt" = NOW() WHERE barcode = $2 RETURNING *',
            [imageUrl, barcode]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, product: result.rows[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
