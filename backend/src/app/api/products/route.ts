import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch products with stock
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Get Products API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, price, stock, imageUrl, category, barcode } = await req.json();

        // Validation
        if (!name || price === undefined) {
            return NextResponse.json(
                { error: 'Product name and price are required' },
                { status: 400 }
            );
        }

        // Generate barcode if not provided
        const productBarcode = barcode || `CUSTOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Create product in inventory
        const product = await prisma.product.create({
            data: {
                barcode: productBarcode,
                name,
                price: Number(price),
                stock: Number(stock) || 0,
                imageUrl: imageUrl || null,
                category: category || 'General',
                isCustom: !barcode // Mark as custom if no barcode provided
            }
        });

        return NextResponse.json({
            success: true,
            product,
            message: 'Product added to inventory successfully'
        });

    } catch (error) {
        console.error('Add Product API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
