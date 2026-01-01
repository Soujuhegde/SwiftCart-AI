
"use client";

import React from "react";
import { useDemo } from "@/providers/DemoProvider";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Download, FileText, ShoppingBag, CreditCard, DollarSign } from "lucide-react";

// Mock data for the chart
const HOURLY_DATA = [
    { hour: '9a', sales: 12 },
    { hour: '10a', sales: 18 },
    { hour: '11a', sales: 25 },
    { hour: '12p', sales: 42 },
    { hour: '1p', sales: 38 },
    { hour: '2p', sales: 30 },
    { hour: '3p', sales: 22 },
    { hour: '4p', sales: 28 },
    { hour: '5p', sales: 35 },
    { hour: '6p', sales: 45 },
    { hour: '7p', sales: 32 },
    { hour: '8p', sales: 15 },
];

export default function DashboardPage() {
    const { salesStats, inventory } = useDemo();

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Today's Performance</h2>
                    <p className="text-slate-500 mt-1">Real-time store analytics as of {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download size={18} />
                        Export
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <FileText size={18} />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value={`$${salesStats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    change="5.2%"
                    trend="up"
                    icon={<DollarSign size={20} />}
                    iconBgInfo="green"
                />
                <MetricCard
                    title="Transactions"
                    value={salesStats.transactions.toString()}
                    change="1.2%"
                    trend="up"
                    icon={<CreditCard size={20} />}
                    iconBgInfo="blue"
                />
                <MetricCard
                    title="Avg. Basket Size"
                    value={`$${(salesStats.revenue / Math.max(1, salesStats.transactions)).toFixed(2)}`}
                    change="-0.5%"
                    trend="down"
                    icon={<ShoppingBag size={20} />}
                    iconBgInfo="orange"
                />
            </div>

            {/* Charts & Alerts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Peak Sales Time</h3>
                            <p className="text-sm text-slate-500">Hourly transaction volume (9 AM - 9 PM)</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={HOURLY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory Alerts */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Inventory Snapshots</h3>
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Low Stock Items logic */}
                        {inventory.filter(i => i.stock < 20).map(item => (
                            <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded text-red-600">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">Low Stock: {item.name}</p>
                                    <p className="text-sm text-slate-500 mt-0.5">{item.stock} items remaining.</p>
                                </div>
                            </div>
                        ))}
                        {inventory.every(i => i.stock >= 20) && (
                            <div className="flex items-center justify-center h-40 text-slate-400">
                                <p>All stock levels normal.</p>
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-500">Total Products</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{inventory.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 text-right">Low Stock</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white text-right">{inventory.filter(i => i.stock < 20).length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
