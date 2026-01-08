import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

// Helper to fetch from OpenFoodFacts
async function fetchFromOpenFoodFacts(barcode: string) {
    try {
        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        if (response.data && response.data.status === 1) {
            const product = response.data.product;
            return {
                name: product.product_name || 'Unknown Product',
                description: product.generic_name || '',
                imageUrl: product.image_url || '',
                // OpenFoodFacts doesn't provide price (it varies by store). 
                // We generate a simulated price for this demo.
                price: Math.floor(Math.random() * 140) + 10, // Random price between 10 and 150
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching from OpenFoodFacts:', error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const { barcode, userId } = await req.json();

        if (!barcode) {
            return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
        }

        // 1. Check if product exists in our DB
        let product = await prisma.product.findUnique({
            where: { barcode },
        });

        // 2. If not, fetch from OpenFoodFacts and create it
        if (!product) {
            console.log(`Product ${barcode} not found locally, fetching from OpenFoodFacts...`);
            const offData = await fetchFromOpenFoodFacts(barcode);

            if (!offData) {
                // Return 404 but allow client to prompt for manual entry
                return NextResponse.json({ error: 'Product not found', needManualEntry: true }, { status: 404 });
            }

            // Save to local DB for future lookups
            product = await prisma.product.create({
                data: {
                    barcode,
                    name: offData.name,
                    description: offData.description,
                    imageUrl: offData.imageUrl,
                    price: offData.price,
                    category: 'Grocery',
                    source: 'openfoodfacts'
                },
            });
            console.log(`Product ${barcode} cached to local DB.`);
        } else {
            console.log(`Product ${barcode} found in local DB.`);
        }

        // 3. Add to User's Active Cart
        // Find or create active cart for user (or a guest cart if no userId/using a default demo user)
        // For simplicity, if userId is not provided, we might fail or create a temporary one. 
        // Assuming userId is passed or we default to a test user for now.
        const targetUserId = userId || 'demo-user-id';

        // 3a. Ensure User Exists (to prevent P2003 Foreign Key Error)
        // In a real app, this would be handled by Auth middleware
        await prisma.user.upsert({
            where: { id: targetUserId },
            create: {
                id: targetUserId,
                email: `${targetUserId}@example.com`,
                name: 'Demo User'
            },
            update: {}
        });

        // 3b. Add to User's Active Cart

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

        // 4. Upsert CartItem
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
            message: 'Product added to cart'
        });

    } catch (error) {
        console.error('Scan API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
