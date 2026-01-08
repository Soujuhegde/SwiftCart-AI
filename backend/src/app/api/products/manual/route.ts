import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { name, userId, price } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
        }

        // 1. Search for existing product by name (fuzzy match matching could be better, but exact/contains for now)
        // For simplicity, we'll check if a product with this EXACT name exists, or create a custom one.
        // Actually, manual entry usually implies "I have an item without a barcode".
        // We'll create a custom product for this transaction or find one if we already made it.

        // Check if we have a custom product with this name
        let product = await prisma.product.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });

        if (!product) {
            // Create a custom product
            // Generate a pseudo-barcode for custom products
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 1000);
            product = await prisma.product.create({
                data: {
                    barcode: `CUSTOM-${timestamp}-${random}`,
                    name: name,
                    price: price || 0, // Allow price override or default to 0 (to be set later? user didn't specify flow for price)
                    // User said "If not found, create a custom product with store-defined price"
                    // We'll check if price is provided, else default.
                    isCustom: true,
                    category: 'Custom'
                }
            });
        }

        // 2. Add to Cart (Logic duplicate from scan route, could be refactored)
        const targetUserId = userId || 'demo-user-id';

        let cart = await prisma.cart.findFirst({
            where: {
                userId: targetUserId,
                status: 'ACTIVE'
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: targetUserId,
                    status: 'ACTIVE'
                }
            });
        }

        const cartItem = await prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: product.id
                }
            },
            update: {
                quantity: { increment: 1 }
            },
            create: {
                cartId: cart.id,
                productId: product.id,
                quantity: 1,
                price: product.price
            }
        });

        return NextResponse.json({
            success: true,
            product,
            cartItem,
            message: 'Product added to cart manually'
        });

    } catch (error) {
        console.error('Manual Entry API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
