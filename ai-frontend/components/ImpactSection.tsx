"use client";

import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ImpactSection = () => {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

                {/* Left Side: Stats */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2"
                >
                    <div className="flex items-center gap-2 text-green-600 font-bold text-xs tracking-widest uppercase mb-6 bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                        <CheckCircle2 size={14} /> Responsible & Compliant
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Innovation with Purpose.</h2>
                    <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                        SwiftCart AI is designed to solve real challenges. By optimizing inventory we reduce the 13 billion tons of annual food waste. By automating queues, we give time back to people.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="font-bold text-3xl text-gray-900 block mb-1">30%</span>
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Food Waste Reduction</span>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="font-bold text-3xl text-gray-900 block mb-1">&lt;100ms</span>
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Decision Latency</span>
                        </div>
                        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 col-span-1 sm:col-span-2 flex items-center justify-between">
                            <div>
                                <span className="font-bold text-2xl text-indigo-900 flex items-center gap-2">24/7 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span></span>
                                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Autonomous Operation</span>
                            </div>
                            <Zap className="text-indigo-300" size={32} />
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 font-medium flex items-center gap-2 border-t border-gray-100 pt-6">
                        <ShieldCheck size={16} className="text-gray-400" />
                        Responsible AI: Explainable · Auditable · Human Override
                    </div>
                </motion.div>

                {/* Right Side: CTA Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="lg:w-1/2 w-full"
                >
                    <div className="bg-[#0f172a] rounded-[32px] p-12 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20 group hover:scale-[1.02] transition-transform duration-500">
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/30 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-600/20 transition-colors duration-500"></div>

                        <h3 className="text-3xl font-bold text-white mb-4 relative z-10 leading-tight">See retail think for itself.</h3>
                        <p className="text-blue-200/80 mb-8 max-w-sm mx-auto relative z-10 text-sm font-medium">
                            Join the autonomous retail revolution.
                        </p>

                        <Link href="/demo" className="bg-azure-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 relative z-10 w-full sm:w-auto inline-block">
                            Launch Live Agent Demo
                        </Link>

                        <div className="mt-10 text-[10px] text-gray-500 font-mono relative z-10 uppercase tracking-widest border-t border-white/10 pt-6">
                            Microsoft Imagine Cup • AI for Good • Retail Innovation
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ImpactSection;
