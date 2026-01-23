"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
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
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#f43f5e'];

export default function AIIntelligencePage() {
    const [data, setData] = useState<{
        anomalyData: { time: string; score: number }[];
        categoryData: { name: string; value: number }[];
        insights: { peakTraffic: string; footfallIncrease: number; stockoutRisk: string };
    } | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const fetchData = async () => {
            try {
                const res = await fetch('/api/ai/intelligence');
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
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
            {/* Same header as before */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 gap-1.5 px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider">
                            <Sparkles size={12} fill="currentColor" /> AI Powered
                        </Badge>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Hub</h2>
                    <p className="text-slate-500 font-medium mt-1">Real-time insights and anomaly detection.</p>
                </div>
                <Button
                    className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-11 rounded-xl shadow-lg border border-slate-700 font-bold"
                    onClick={() => toast.info("Model configuration coming soon")}
                >
                    <Cpu size={18} />
                    Configure Models
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Real-time Insights Card */}
                <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                    {/* ... content ... */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shadow-inner border border-white/20">
                                <BrainCircuit size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tight">System Insights</h3>
                                <p className="text-indigo-200 text-sm font-medium">Live neural network analysis</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
                                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">Predicted Peak Traffic</p>
                                <p className="text-3xl font-black tracking-tight mb-1">{insights.peakTraffic}</p>
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={14} className="text-emerald-300" />
                                    <p className="text-xs text-indigo-100 font-medium">Expect +{insights.footfallIncrease}% footfall</p>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
                                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">Stockout Risk</p>
                                <p className={`text-3xl font-black tracking-tight mb-1 ${insights.stockoutRisk === 'High' ? 'text-amber-300' : 'text-emerald-300'}`}>{insights.stockoutRisk}</p>
                                <div className="flex items-center gap-2">
                                    <AlertOctagon size={14} className="text-amber-300" />
                                    <p className="text-xs text-indigo-100 font-medium">Banana inventory critically low</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Anomaly Detection Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[420px] lg:h-auto">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900">Anomaly Detection</h3>
                        <Badge variant="destructive" className="animate-pulse bg-rose-500 hover:bg-rose-600 border-rose-600">1 Active</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-6">Detecting unusual patterns in transaction volume.</p>
                    <div className="flex-1 w-full min-h-[150px]">
                        {isMounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={anomalyData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl">
                                <p className="text-slate-400 text-sm font-medium">Loading...</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex gap-3 items-start">
                        <AlertOctagon className="text-rose-600 shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="text-xs text-rose-700 font-bold mb-0.5">Unusual Activity Detected</p>
                            <p className="text-[10px] text-rose-600/80 font-medium leading-relaxed">High checkout abandonment rate recorded at 1:00 PM (Score: 85/100).</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Recommended Actions</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all border border-slate-100 hover:border-slate-200 cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <TrendingUp size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900">Restock &apos;Almond Milk&apos;</p>
                                    <p className="text-xs text-slate-500 font-medium">Predicted depletion in 2 hours.</p>
                                </div>
                                <Button size="sm" variant="outline" className="rounded-lg font-bold text-slate-600 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-200" onClick={() => toast.success("Recommendation applied!")}>Apply</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <h3 className="font-bold text-slate-900 mb-1">Category Performance</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">Real-time aggregated sales quantity.</p>
                    <div className="h-[200px] w-full flex items-center justify-center">
                        {isMounted ? (
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
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number | string | Array<number | string> | undefined) => [`${value} items`, 'Quantity'] as [string, string]}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                            <div className="text-center">
                                <p className="text-2xl font-black text-slate-900">1.2k</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
