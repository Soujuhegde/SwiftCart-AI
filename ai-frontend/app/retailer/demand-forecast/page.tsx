
"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";

// Mock projection data
const FORECAST_DATA = [
    { day: 'Mon', actual: 4000, projected: 4100 },
    { day: 'Tue', actual: 3000, projected: 3200 },
    { day: 'Wed', actual: 2000, projected: 2400 },
    { day: 'Thu', actual: 2780, projected: 2900 },
    { day: 'Fri', actual: 1890, projected: 2100 },
    { day: 'Sat', actual: 2390, projected: 2500 },
    { day: 'Sun', actual: 3490, projected: 3800 },
    { day: 'Next Mon', actual: null, projected: 4200 },
    { day: 'Next Tue', actual: null, projected: 3300 },
];

export default function DemandForecastPage() {
    const [forecastData, setForecastData] = useState<any[]>(FORECAST_DATA);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
                const res = await fetch(`${apiUrl}/api/ai/forecast`);
                if (res.ok) {
                    const json = await res.json();
                    setForecastData(json);
                }
            } catch (error) {
                console.error("Failed to fetch forecast data", error);
            }
        };

        fetchData();
        // Refresh every minute
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Demand Forecasting</h2>
                    <p className="text-slate-500 mt-1">Projected sales trends based on historical data and seasonality.</p>
                    <p className="text-sm font-medium text-emerald-600 mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                        <TrendingUp size={14} className="inline mr-1" />
                        Forecast indicates a 12% growth trend over the next week.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => toast.info("Date range filter coming soon")}>
                        <Calendar size={18} />
                        Next 7 Days
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={() => toast.warning("Forecast export not yet implemented")}>
                        <Download size={18} />
                        Export Data
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Projection (7 Days)</h3>
                        <p className="text-sm text-slate-500">Comparing actual sales vs. AI-predicted volume.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            Actual
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                            Projected
                        </div>
                    </div>
                </div>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={forecastData}>
                            <defs>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bfdbfe" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#bfdbfe" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} label={{ value: 'Timeline', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'Sales Volume', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="projected" stroke="#bfdbfe" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={2} strokeDasharray="5 5" />
                            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
