"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, Download, TrendingUp, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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

interface ForecastItem {
    day: string;
    actual: number | null;
    projected: number;
}

export default function DemandForecastPage() {
    const [forecastData, setForecastData] = useState<ForecastItem[]>(FORECAST_DATA);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const fetchData = async () => {
            try {
                // Use relative path to leverage Next.js rewrites and avoid CORS
                const res = await fetch('/api/ai/forecast');
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

    // ... (rest of render until chart) ...

    return (
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
            {/* ... header ... */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider">
                            <TrendingUp size={12} fill="currentColor" /> Growth Trends
                        </Badge>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Demand Forecasting</h2>
                    <p className="text-slate-500 font-medium mt-1">Projected sales trends based on historical data and seasonality.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 rounded-xl font-bold shadow-sm" onClick={() => toast.info("Date range filter coming soon")}>
                        <Calendar size={18} />
                        Next 7 Days
                    </Button>
                    <Button variant="outline" className="gap-2 bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 rounded-xl font-bold shadow-sm" onClick={() => toast.warning("Forecast export not yet implemented")}>
                        <Download size={18} />
                        Export Data
                    </Button>
                </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <TrendingUp size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-emerald-900">Positive Outlook</p>
                    <p className="text-xs font-medium text-emerald-700">
                        Forecast indicates a <span className="font-black">12% growth trend</span> over the next week compared to last period.
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 size={18} className="text-slate-400" />
                            Sales Projection (7 Days)
                        </h3>
                        <p className="text-sm text-slate-500 font-medium ml-6">Comparing actual sales vs. AI-predicted volume.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-200"></div>
                            Actual
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
                            Projected
                        </div>
                    </div>
                </div>
                <div className="h-[450px] w-full">
                    {isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#dbeafe" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="projected"
                                    stroke="#93c5fd"
                                    fillOpacity={1}
                                    fill="url(#colorProjected)"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorActual)"
                                    strokeWidth={3}
                                    activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl">
                            <p className="text-slate-400 text-sm font-medium">Loading chart...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
