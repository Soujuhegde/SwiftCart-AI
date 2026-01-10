
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Cpu, BrainCircuit, Sparkles, TrendingUp, AlertOctagon } from "lucide-react";
import { toast } from "sonner";

const ANOMALY_DATA = [
    { time: '10:00', score: 20 },
    { time: '11:00', score: 25 },
    { time: '12:00', score: 30 },
    { time: '13:00', score: 85 }, // Anomaly
    { time: '14:00', score: 28 },
    { time: '15:00', score: 22 },
];

const CATEGORY_DATA = [
    { name: 'Produce', value: 400 },
    { name: 'Dairy', value: 300 },
    { name: 'Bakery', value: 300 },
    { name: 'Meat', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AIIntelligencePage() {
    const [data, setData] = useState<{
        anomalyData: any[];
        categoryData: any[];
        insights: any;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
                const res = await fetch(`${apiUrl}/api/ai/intelligence`);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch intelligence data", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const anomalyData = data ? data.anomalyData : ANOMALY_DATA;
    const categoryData = data ? data.categoryData : CATEGORY_DATA;
    const insights = data ? data.insights : {
        peakTraffic: '5:30 PM',
        footfallIncrease: 45,
        stockoutRisk: 'High'
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 gap-1">
                            <Sparkles size={12} /> AI Powered
                        </Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Intelligence Hub</h2>
                    <p className="text-slate-500 mt-1">AI-driven insights and anomaly detection.</p>
                </div>
                <Button
                    className="bg-slate-900 hover:bg-slate-800 text-white gap-2"
                    onClick={() => toast.info("Model configuration coming soon")}
                >
                    <Cpu size={18} />
                    Configure Models
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Real-time Insights Card */}
                <div className="col-span-1 lg:col-span-2 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <BrainCircuit size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Live Insights</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                                <p className="text-indigo-100 text-sm mb-1">Predicted Peak Traffic</p>
                                <p className="text-2xl font-bold">{insights.peakTraffic}</p>
                                <p className="text-xs text-indigo-200 mt-2">Expect +{insights.footfallIncrease}% footfall</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                                <p className="text-indigo-100 text-sm mb-1">Stockout Risk</p>
                                <p className={`text-2xl font-bold ${insights.stockoutRisk === 'High' ? 'text-orange-300' : 'text-green-300'}`}>{insights.stockoutRisk}</p>
                                <p className="text-xs text-indigo-200 mt-2">Organic Bananas critically low</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Anomaly Detection Chart */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">Anomaly Detection</h3>
                        <Badge variant="destructive" className="animate-pulse">1 Active</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Detects unusual patterns in sales speed or transaction volume.</p>
                    <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={anomalyData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip />
                                <Area type="monotone" dataKey="score" stroke="#ef4444" fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg flex gap-3">
                        <AlertOctagon className="text-red-500 shrink-0" size={20} />
                        <div>
                            <p className="text-xs text-red-700 dark:text-red-300 font-bold">Unusual Activity Detected</p>
                            <p className="text-[10px] text-red-600 dark:text-red-400">High checkout abandonment rate at 1:00 PM.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recommended Actions</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                    <TrendingUp size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Restock 'Almond Milk'</p>
                                    <p className="text-xs text-slate-500">Predicted depletion in 2 hours.</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => toast.success("Recommendation applied!")}>Apply</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Category Performance</h3>
                    <p className="text-xs text-slate-500 mb-4">Real-time aggregated sales quantity by category.</p>
                    <div className="h-[200px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number | undefined) => [`${value || 0} items`, 'Quantity']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">Total</p>
                                <p className="text-xs text-slate-500">Sales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
