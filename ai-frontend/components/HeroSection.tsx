"use client";

import { ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 text-blue-700 text-xs font-bold tracking-wide uppercase border border-blue-100/50"
            >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Agentic Power on Azure Real-time Decisions
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 max-w-4xl"
            >
                Retail doesn't need more apps. <br className="hidden md:block" />
                It needs <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient">autonomous intelligence.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed font-medium"
            >
                SwiftCart AI predicts demand spikes in <span className="font-semibold text-gray-900">real-time</span> and triggers
                <span className="font-semibold text-gray-900"> autonomous actions</span> to optimize inventory — powered by Microsoft Azure AI.
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col items-center gap-2 mb-20"
            >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="bg-azure-blue text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group">
                        Watch the Agent Orchestrate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="bg-white text-gray-700 border border-gray-200 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all">
                        View Retailer Dashboard
                    </button>
                </div>
                <p className="text-xs text-gray-400 font-medium">
                    Live demo · Decisions made without human intervention
                </p>
            </motion.div>

            {/* Agent Cards Visual */}
            <div className="relative w-full max-w-6xl">
                {/* Flow Connectors */}
                <div className="absolute top-1/2 left-1/3 w-16 h-[2px] bg-gradient-to-r from-gray-200 to-gray-400 -translate-y-1/2 hidden md:block z-0"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-[2px] bg-gradient-to-r from-gray-400 to-gray-200 -translate-y-1/2 hidden md:block z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
                    {/* Card 1: Sense */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 text-left relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-1 pt-1 h-full bg-blue-500 rounded-l-2xl"></div>
                        <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sense Signal</span>
                            <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">20:42:15 UTC</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" />
                            Scan Freq. Spike
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 ml-6">Zone 4 (Beverages)</p>
                        <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                            <div className="text-xs font-mono text-blue-800 leading-relaxed">
                                &gt; "Soft Drinks" scan rate<br />&gt; 2.5x vs historical
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Predict (Focus) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.08 }}
                        className="bg-[#0f172a] p-6 rounded-2xl shadow-2xl shadow-blue-900/20 border border-gray-800 text-left relative overflow-hidden z-20"
                    >
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>

                        <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-2">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Agent Reasoning</span>
                            <span className="text-[10px] text-gray-500 font-mono bg-gray-900 px-1.5 py-0.5 rounded">84ms</span>
                        </div>
                        <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                            Demand Prediction
                        </h3>
                        <div className="space-y-3 relative">
                            <div className="text-xs text-gray-400 leading-relaxed pl-3 border-l-2 border-gray-700">
                                <span className="text-gray-500 font-semibold block mb-0.5">Reasoning:</span>
                                Spike matches 'Sat 2024' baseline. High confidence deviation.
                            </div>
                            <div className="text-xs text-blue-100 leading-relaxed pl-3 border-l-2 border-blue-500 bg-blue-900/10 py-1 rounded-r">
                                <span className="text-blue-400 font-semibold block mb-0.5">Decision:</span>
                                Lock stock & trigger restock.
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-full font-medium border border-green-500/20"
                            >
                                Confidence: 98%
                            </motion.div>
                            <div className="text-[10px] text-gray-500 font-mono">
                                Model: GPT-4o
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Act */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 text-left relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-2xl"></div>
                        <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action Execution</span>
                            <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">20:42:16 UTC</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-600" />
                            Restock Triggered
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 ml-6">Warehouse Workflow #94A</p>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                ERP Stock Updated (Real-time)
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                Alert Sent to Floor Mgr
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Connection Arrows Visualization (Visible on Desktop) */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden md:block pointer-events-none z-0">
                    {/* Line 1: Sense to Reason */}
                    <div className="absolute left-[32%] top-0 w-[10%] h-[2px] bg-gray-100 overflow-hidden">
                        <div className="w-full h-full bg-blue-400 animate-flow"></div>
                    </div>

                    {/* Line 2: Reason to Act */}
                    <div className="absolute right-[32%] top-0 w-[10%] h-[2px] bg-gray-100 overflow-hidden">
                        <div className="w-full h-full bg-green-400 animate-flow" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
