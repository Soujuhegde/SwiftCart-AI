import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { query } from '@/lib/db';

export async function GET() {
    try {
        // Fallback to raw SQL because Prisma engine crashes on experimental Node.js versions
        const result = await query('SELECT * FROM "Product" ORDER BY "createdAt" DESC');
        return NextResponse.json({
            success: true,
            products: result.rows
        });
    } catch (error: any) {
        console.error('Get Products API Error (Raw SQL):', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, price, stock, imageUrl, category, barcode } = await req.json();

        if (!name || price === undefined) {
            return NextResponse.json({ error: 'Product name and price are required' }, { status: 400 });
        }

        const productBarcode = barcode || `CUSTOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const result = await query(
            'INSERT INTO "Product" (id, barcode, name, price, stock, "imageUrl", category, "isCustom", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
            [`prod-${Date.now()}`, productBarcode, name, Number(price), Number(stock) || 0, imageUrl || null, category || 'General', !barcode]
        );

        return NextResponse.json({
            success: true,
            product: result.rows[0],
            message: 'Product added to inventory successfully'
        });

    } catch (error: any) {
        console.error('Add Product API Error (Raw SQL):', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
