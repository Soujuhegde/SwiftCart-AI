import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Await params in Next.js 15+
        const { id } = await params;

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Delete associated cart items first to avoid foreign key constraint violation
        await prisma.cartItem.deleteMany({
            where: { productId: id }
        });

        // Delete product
        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('Delete Product API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
