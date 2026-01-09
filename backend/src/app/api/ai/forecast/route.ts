import { NextResponse } from 'next/server';

export async function GET() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const forecastData = days.map((day, index) => {
        const baseValue = 2000 + Math.floor(Math.random() * 2000);
        const hasActual = index < 5;

        return {
            day,
            actual: hasActual ? baseValue : null,
            projected: Math.floor(baseValue * (0.9 + Math.random() * 0.3))
        };
    });

    return NextResponse.json(forecastData, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
