"use client";

import { Activity, ShieldCheck, Server, ChevronRight, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionReveal, LivePulse, HoverCard } from './ui/motion/primitives';

const CommandCenterStrip = () => {
    return (
        <section className="bg-slate-950 py-16 border-y border-white/10 relative overflow-hidden">
            {/* Background Detail */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <div className="max-w-7xl mx-auto px-6">
                <SectionReveal>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <LivePulse color="blue" />
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Live Store Console</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">Real-time Operations</h2>
                            <p className="text-slate-400 font-medium">Monitor every active shopper and transaction as it happens.</p>
                        </div>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-full px-6 transition-all hover:scale-105">
                            Explore Full Dashboard <ChevronRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Panel 1: Live Sessions (Table) */}
                    <HoverCard
                        glowColor="blue"
                        className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 backdrop-blur-sm group col-span-1 md:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                <Activity size={20} />
                            </div>
                            <h3 className="font-bold text-slate-200">Live Sessions</h3>
                        </div>
                        <div className="space-y-2">
                            {/* Header */}
                            <div className="grid grid-cols-5 text-[10px] uppercase font-bold text-slate-500 mb-2 px-2">
                                <span>ID</span>
                                <span>Items</span>
                                <span>Total</span>
                                <span>Status</span>
                                <span className="text-right">Action</span>
                            </div>
                            {/* Rows with staggered entrance */}
                            {[
                                { id: "S-102", items: 5, total: "₹450", status: "Scanning", color: "blue" },
                                { id: "S-103", items: 12, total: "₹1,240", status: "Payment", color: "violet" },
                                { id: "S-104", items: 3, total: "₹2,100", status: "Flagged", color: "amber" }, // amber is ok for warning
                                { id: "S-101", items: 8, total: "₹890", status: "Paid", color: "indigo" }
                            ].map((row, i) => (
                                <motion.div
                                    key={row.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="grid grid-cols-5 items-center py-2 px-2 border-b border-white/5 last:border-0 text-sm hover:bg-white/5 transition-colors rounded-lg"
                                >
                                    <span className="font-mono text-slate-400">{row.id}</span>
                                    <span className="text-white font-bold">{row.items}</span>
                                    <span className="text-slate-300">{row.total}</span>
                                    <div>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-${row.color}-500/10 text-${row.color}-500 border-${row.color}-500/20`}>
                                            {row.status}
                                        </span>
                                    </div>
                                    <span className={`text-right text-xs text-${row.color === 'amber' ? 'amber-500' : 'blue-400'} font-bold cursor-pointer hover:underline opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        {row.status === 'Scanning' ? 'View' : row.status === 'Payment' ? 'Assist' : row.status === 'Flagged' ? 'Check' : 'Verify'}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </HoverCard>

                    {/* Panel 3: System Health */}
                    <HoverCard
                        glowColor="indigo"
                        className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 backdrop-blur-sm group"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                <Server size={20} />
                            </div>
                            <h3 className="font-bold text-slate-200">System Health</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Payment Gateway</span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                                    <Check size={12} /> Online
                                </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-slate-400">API Latency</span>
                                <span className="text-xs font-bold text-blue-400">45ms</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "80%" }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="bg-blue-500 h-full rounded-full"
                                />
                            </div>
                        </div>
                    </HoverCard>

                </div>
            </div>
        </section>
    );
};

export default CommandCenterStrip;
