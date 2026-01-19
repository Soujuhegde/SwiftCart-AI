"use client";

import { Users, Clock, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import ClientOnly from '../ClientOnly';

const KPI_DATA = [
    {
        label: "Active Shoppers",
        value: 42,
        suffix: "",
        change: "+12%",
        trend: "up",
        icon: Users,
        color: "blue",
        chartData: [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 25 }, { v: 30 }, { v: 42 }]
    },
    {
        label: "Avg. Experience",
        value: 45,
        suffix: "s",
        change: "-5s",
        trend: "good",
        icon: Clock,
        color: "indigo",
        chartData: [{ v: 60 }, { v: 55 }, { v: 50 }, { v: 48 }, { v: 45 }, { v: 45 }, { v: 45 }]
    },
    {
        label: "Risk Alerts",
        value: 3,
        suffix: "",
        change: "+1",
        trend: "bad",
        icon: AlertTriangle,
        color: "rose",
        chartData: [{ v: 0 }, { v: 1 }, { v: 1 }, { v: 0 }, { v: 2 }, { v: 2 }, { v: 3 }]
    },
    {
        label: "Revenue Velocity",
        value: 84320,
        prefix: "₹",
        change: "+8.5%",
        trend: "up",
        icon: TrendingUp,
        color: "violet",
        chartData: [{ v: 5000 }, { v: 12000 }, { v: 25000 }, { v: 45000 }, { v: 60000 }, { v: 75000 }, { v: 84320 }]
    }
];

const DashboardKPIs = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KPI_DATA.map((kpi, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden group"
                >
                    <div className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                    {kpi.prefix}
                                    <CountUp end={kpi.value} duration={2} separator="," />
                                    {kpi.suffix}
                                </h3>
                            </div>
                            <div className={`p-2.5 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-600 ring-4 ring-${kpi.color}-50/50 transition-all group-hover:scale-110 group-hover:ring-${kpi.color}-100`}>
                                <kpi.icon size={20} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-bold 
                                ${kpi.trend === 'good' || kpi.trend === 'up' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'}
                            `}>
                                {kpi.change}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">vs last hour</span>
                        </div>
                    </div>

                    {/* Sparkline Chart Background */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-50 transition-opacity overflow-hidden min-w-[100px]">
                        <ClientOnly className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={kpi.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={kpi.color === 'blue' ? '#3b82f6' : kpi.color === 'indigo' ? '#6366f1' : kpi.color === 'rose' ? '#f43f5e' : '#8b5cf6'} stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="v"
                                        stroke={kpi.color === 'blue' ? '#3b82f6' : kpi.color === 'indigo' ? '#6366f1' : kpi.color === 'rose' ? '#f43f5e' : '#8b5cf6'}
                                        strokeWidth={2}
                                        fill={`url(#gradient-${idx})`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ClientOnly>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DashboardKPIs;
