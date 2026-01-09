import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const now = new Date();
    const currentHour = now.getHours();

    const anomalyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(now);
        date.setHours(currentHour - 5 + i);
        const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const isAnomaly = Math.random() > 0.8;
        return {
            time: timeStr,
            score: Math.floor(Math.random() * 30) + (isAnomaly ? 50 : 10)
        };
    });

    // Fetch real category data from database
    const cartItems = await prisma.cartItem.findMany({
        include: {
            product: {
                select: { category: true }
            }
        }
    });

    const categoryMap = new Map<string, number>();

    cartItems.forEach(item => {
        const cat = item.product.category || 'Uncategorized';
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + item.quantity);
    });

    // Convert to array format for Recharts
    const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));

    // Fallback if DB is empty
    const finalCategoryData = categoryData.length > 0 ? categoryData : [
        { name: 'No Data', value: 100 }
    ];

    return NextResponse.json({
        anomalyData,
        categoryData: finalCategoryData,
        insights: {
            peakTraffic: `${(currentHour + 2) % 12 || 12}:30 ${currentHour + 2 >= 12 ? 'PM' : 'AM'}`,
            footfallIncrease: Math.floor(Math.random() * 30) + 20,
            stockoutRisk: Math.random() > 0.5 ? 'High' : 'Medium'
        }
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
