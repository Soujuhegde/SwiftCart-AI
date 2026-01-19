"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Activity, ShieldCheck, Play, Server, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ClientOnly from './ClientOnly';
import TrustedBrands from './TrustedBrands';
import { SectionReveal, LivePulse } from './ui/motion/primitives';

const SESSIONS = [
    { id: "A102", items: 7, total: "₹540", status: "Paid", time: "Just now" },
    { id: "A103", items: 18, total: "₹1,920", status: "Verifying", time: "12s ago" },
    { id: "A104", items: 3, total: "₹120", status: "Scanning", time: "45s ago" },
];

const HeroSection = () => {
    const [activeSessions, setActiveSessions] = useState(SESSIONS);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSessions(prev => {
                const newId = `A${Math.floor(Math.random() * 900) + 100}`;
                const newSession = {
                    id: newId,
                    items: Math.floor(Math.random() * 10) + 1,
                    total: `₹${Math.floor(Math.random() * 2000) + 50}`,
                    status: Math.random() > 0.7 ? "Verifying" : "Scanning",
                    time: "Just now"
                };
                return [newSession, ...prev.slice(0, 2)];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-slate-50 pt-32 pb-24 lg:pt-48 lg:pb-32 selection:bg-indigo-500/30">

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50"></div>
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                {/* Soft Spotlights */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/10 rounded-full blur-[120px]"
                ></motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px]"
                ></motion.div>
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Editorial Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/60 border border-slate-200/60 backdrop-blur-sm shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-600">QUEUE-LESS BILLING • SCAN & GO</span>
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                            Turn Queueing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">into Revenue.</span>
                        </h1>

                        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl mb-4">
                            The Scan & Go platform that runs on your customer's phone. Shoppers scan, pay, and simply walk out with a digital receipt.
                        </p>
                        <p className="text-sm text-slate-500 font-bold mb-10">No hardware. Works with existing barcodes.</p>

                        <div className="flex flex-wrap items-center gap-4 mb-16">
                            <Link href="/retailer/dashboard">
                                <Button size="lg" className="h-14 px-8 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
                                    Start Pilot <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/customer/scan">
                                <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full text-slate-600 font-bold text-lg hover:bg-white/50 border border-slate-200/50 hover:border-slate-300 transition-all backdrop-blur-sm">
                                    <Play size={18} className="mr-2 fill-slate-600" /> Watch Demo
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Row */}
                        <div className="border-t border-slate-200/50 pt-8">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Trusted by modern retailers</p>
                            <TrustedBrands />
                        </div>
                    </motion.div>

                    {/* Layered Visual Composition */}
                    <div className="lg:w-1/2 relative perspective-large">
                        {/* Floating Chips - Left */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-20 -left-12 z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/20 ring-1 ring-slate-900/5 hidden lg:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Activity size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Throughput</p>
                                    <p className="text-sm font-bold text-slate-900">128/hr</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Chips - Right */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="absolute bottom-32 -right-8 z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/20 ring-1 ring-slate-900/5 hidden lg:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Server size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">System</p>
                                    <p className="text-sm font-bold text-indigo-600">Online</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Dashboard Card (Tilted) */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: -10, rotateX: 5, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: -6, rotateX: 2, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative z-20 rounded-2xl bg-white shadow-2xl shadow-indigo-900/20 border border-slate-200/60 overflow-hidden ring-1 ring-slate-900/5 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Fake Browser UI */}
                            <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                </div>
                                <div className="ml-4 h-5 bg-white rounded-md w-40 border border-slate-200"></div>
                            </div>

                            {/* Internal Dashboard */}
                            <div className="p-6 bg-slate-50/50 min-h-[400px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Layers size={16} className="text-indigo-600" /> Live Store Console
                                    </h3>
                                    <Button size="sm" variant="outline" className="h-7 text-xs bg-white">View All</Button>
                                </div>

                                {/* Active Sessions List */}
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {activeSessions.map((session) => (
                                            <motion.div
                                                key={session.id}
                                                layout
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {session.id}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-900">{session.items} items</p>
                                                        <p className="text-[10px] text-slate-400">{session.time}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-bold text-slate-900">{session.total}</p>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full 
                                                        ${session.status === 'Paid' ? 'bg-indigo-100 text-indigo-700' :
                                                            session.status === 'Verifying' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-blue-100 text-blue-700'}`}>
                                                        {session.status}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Simulated Chart Area */}
                                <div className="mt-6 pt-6 border-t border-slate-200/50">
                                    <div className="flex items-end gap-1 h-16 opacity-50">
                                        {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500 rounded-t-sm"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
