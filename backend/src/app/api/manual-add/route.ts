import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, barcode, description, imageUrl, category } = body;

        // Validation
        if (!name) {
            return NextResponse.json(
                { error: 'Product name is required' },
                { status: 400 }
            );
        }

        if (price === undefined || price === null) {
            return NextResponse.json(
                { error: 'Price is required' },
                { status: 400 }
            );
        }

        // Generate barcode if not provided
        let productBarcode = barcode;
        if (!productBarcode) {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 10000);
            productBarcode = `MANUAL-${timestamp}-${random}`;
        }

        // Create product
        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                barcode: productBarcode,
                description: description || null,
                imageUrl: imageUrl || null,
                category: category || 'Manual',
                isCustom: true,
                source: 'manual', // Explicitly track source
            }
        });

        return NextResponse.json({
            success: true,
            product,
            message: 'Product created successfully'
        });

    } catch (error) {
        console.error('Manual Add API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
