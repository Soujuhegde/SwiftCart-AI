"use client";

import { Button } from '@/components/ui/button';
import { Activity, Play, Server, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TrustedBrands from './TrustedBrands';

const SESSIONS = [
    { id: "A102", items: 7, total: "₹540", status: "Paid", time: "Just now" },
    { id: "A103", items: 18, total: "₹1,920", status: "Verifying", time: "12s ago" },
    { id: "A104", items: 3, total: "₹120", status: "Scanning", time: "45s ago" },
];

const HeroSection = () => {
    const [activeSessions, setActiveSessions] = useState(SESSIONS);
    const idCounter = useRef(200);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSessions(prev => {
                idCounter.current = (idCounter.current + 1) % 1000; // Keep it 3 digits but loop safely
                const newId = `A${idCounter.current}`;
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
            {/* Cinematic Background (Enhanced Colors) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-indigo-50/80"></div>
                {/* Vibrant Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-400/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Content */}
                    <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white border border-blue-100 shadow-sm shadow-blue-500/10"
                        >
                            <span className="flex h-1.5 w-1.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">Retail Tech • Scan & Go</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
                        >
                            Reduce Checkout <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Time by 80%.</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-lg mb-10"
                        >
                            Reduce checkout time by 80% with our hardware-free scan & go platform. Works with your existing barcodes.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
                        >
                            <Link href="/retailer/dashboard">
                                <Button size="lg" className="h-12 px-8 rounded-full bg-blue-900 text-white font-bold text-base hover:bg-blue-800 shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                                    Start SwiftCart
                                </Button>
                            </Link>
                            <Link href="/customer/scan">
                                <Button size="lg" variant="ghost" className="h-12 px-8 rounded-full text-slate-600 font-bold text-base hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                                    <Play size={16} className="mr-2 fill-current" /> Watch Demo
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Trust Signals - Scrolling Marquee */}
                        <div className="w-full max-w-sm lg:max-w-md overflow-hidden relative">
                            <TrustedBrands />
                        </div>
                    </div>

                    {/* Right Column: Dashboard Visual */}
                    <div className="lg:w-1/2 w-full relative perspective-large mt-12 lg:mt-0">
                        {/* Floating Chips - Left */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-10 -left-4 z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 ring-1 ring-blue-900/5 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity size={18} /></div>
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
                            className="absolute bottom-16 -right-8 z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 ring-1 ring-blue-900/5 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Server size={18} /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">System</p>
                                    <p className="text-sm font-bold text-indigo-600">Online</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Dashboard Card */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: -12, rotateX: 5, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: -6, rotateX: 2, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative z-20 rounded-2xl bg-white shadow-2xl shadow-indigo-900/15 border border-slate-100 overflow-hidden ring-1 ring-slate-900/5 transform-gpu"
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
                            <div className="p-6 bg-slate-50/40 min-h-[400px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Layers size={16} className="text-indigo-600" /> Live Store Console
                                    </h3>
                                    <Button size="sm" variant="outline" className="h-7 text-xs bg-white hover:bg-blue-50 hover:text-blue-600 border-slate-200">View All</Button>
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
                                                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
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
                                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"></div>
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
