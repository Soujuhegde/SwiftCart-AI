import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

/* ----------------------------------------------------
   Helper: Fetch product from OpenFoodFacts
---------------------------------------------------- */
async function fetchFromOpenFoodFacts(barcode: string) {
    try {
        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
            { timeout: 5000 }
        );

        if (response.data?.status !== 1) return null;

        const product = response.data.product;

        return {
            name:
                product.product_name_en ||
                product.product_name ||
                `Item ${barcode}`,
            description:
                product.generic_name_en ||
                product.generic_name ||
                '',
            imageUrl:
                product.image_front_url ||
                product.image_url ||
                '',
            price: Math.floor(Math.random() * 140) + 10, // simulated price
        };
    } catch (error) {
        console.error('OpenFoodFacts error:', error);
        return null;
    }
}

/* ----------------------------------------------------
   POST: Scan Barcode
---------------------------------------------------- */
export async function POST(req: Request) {
    try {
        let { barcode, userId } = await req.json();

        /* ---------- CLEAN & VALIDATE BARCODE ---------- */
        barcode = String(barcode || '')
            .trim()
            .replace(/\D/g, ''); // remove non-numeric chars

        if (!barcode || barcode.length < 8) {
            return NextResponse.json(
                { error: 'Invalid barcode scanned' },
                { status: 400 }
            );
        }

        /* ---------- FIND PRODUCT LOCALLY ---------- */
        let product = await prisma.product.findUnique({
            where: { barcode },
        });

        /* ---------- FETCH FROM OPENFOODFACTS ---------- */
        if (!product) {
            const offData = await fetchFromOpenFoodFacts(barcode);

            if (offData) {
                product = await prisma.product.create({
                    data: {
                        barcode,
                        name: offData.name,
                        description: offData.description,
                        imageUrl: offData.imageUrl,
                        price: offData.price,
                        category: 'Grocery',
                        source: 'openfoodfacts',
                    },
                });
            } else {
                // fallback auto-create product
                product = await prisma.product.create({
                    data: {
                        barcode,
                        name: `Item ${barcode}`,
                        description: 'Auto-detected item',
                        imageUrl:
                            'https://placehold.co/400x400?text=Item',
                        price: Math.floor(Math.random() * 140) + 10,
                        category: 'General',
                        source: 'manual-auto',
                    },
                });
            }
        }

        /* ---------- USER HANDLING ---------- */
        const targetUserId = userId || 'demo-user-id';

        await prisma.user.upsert({
            where: { id: targetUserId },
            create: {
                id: targetUserId,
                email: `${targetUserId}@example.com`,
                name: 'Demo User',
            },
            update: {},
        });

        /* ---------- CART HANDLING ---------- */
        let cart = await prisma.cart.findFirst({
            where: {
                userId: targetUserId,
                status: 'ACTIVE',
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: targetUserId,
                    status: 'ACTIVE',
                },
            });
        }

        /* ---------- CART ITEM UPSERT ---------- */
        const cartItem = await prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: product.id,
                },
            },
            update: {
                quantity: { increment: 1 },
            },
            create: {
                cartId: cart.id,
                productId: product.id,
                quantity: 1,
                price: product.price,
            },
        });

        return NextResponse.json({
            success: true,
            product,
            cartItem,
            message: 'Product scanned and added to cart',
        });
    } catch (error) {
        console.error('Scan API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
