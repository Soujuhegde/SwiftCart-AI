import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, barcode, description, imageUrl, category, stock } = body;

        if (!name || price === undefined || price === null) {
            return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
        }

        let productBarcode = barcode;
        if (!productBarcode) {
            productBarcode = `MANUAL-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        }

        const result = await query(
            'INSERT INTO "Product" (id, barcode, name, price, description, "imageUrl", category, stock, "isCustom", source, "updatedAt") ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *',
            [
                `prod-${Date.now()}`,
                productBarcode,
                name,
                parseFloat(price),
                description || null,
                imageUrl || null,
                category || 'Manual',
                stock !== undefined ? parseInt(stock) : 0,
                true,
                'manual'
            ]
        );

        return NextResponse.json({
            success: true,
            product: result.rows[0],
            message: 'Product created successfully'
        });

    } catch (error: any) {
        console.error('Manual Add API Error (Raw SQL):', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
