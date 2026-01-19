"use client";

import { Smartphone, ScanLine, Tag, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal, StaggerGrid, RevealItem } from './ui/motion/primitives';

const ShopperSection = () => {
    return (
        <section className="py-32 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-24">

                    {/* Copy */}
                    <div className="lg:w-1/2">
                        <SectionReveal>
                            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wide mb-6">FOR SHOPPERS</div>
                            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tighter mb-8">
                                A Checkout <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">That Disappears.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 font-medium">Give your customers the autonomy they want.</p>
                        </SectionReveal>

                        <StaggerGrid className="space-y-6 mb-10">
                            {[
                                "Web App (No download needed)",
                                "Real-time cart with taxes/offers",
                                "Pay via UPI / Apple Pay",
                                "Shareable digital receipt"
                            ].map((item, i) => (
                                <RevealItem key={i} className="flex items-center gap-3 text-lg text-slate-600 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {item}
                                </RevealItem>
                            ))}
                        </StaggerGrid>

                        <SectionReveal delay={0.3}>
                            <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 duration-200">
                                Try the Simulator <ArrowRight size={18} />
                            </button>
                        </SectionReveal>
                    </div>

                    {/* Visual */}
                    <div className="lg:w-1/2 relative flex justify-center">
                        {/* Spotlight */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px]"></div>

                        {/* Phone Mockup */}
                        <motion.div
                            initial={{ y: 50, opacity: 0, rotate: -6 }}
                            whileInView={{ y: 0, opacity: 1, rotate: -6 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            whileHover={{ rotate: 0, scale: 1.02 }}
                            className="relative z-10 w-[320px] h-[640px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl ring-1 ring-slate-900/10 cursor-pointer"
                        >
                            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                                {/* App Header */}
                                <div className="bg-slate-50 border-b border-slate-100 p-6 pt-12">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 flex items-center justify-center">
                                                <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold bg-slate-200 px-2 py-1 rounded">Cart: 3</div>
                                    </div>
                                </div>
                                {/* Product List */}
                                <div className="p-4 space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4 p-3 border border-slate-100 rounded-xl shadow-sm">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg"></div>
                                            <div className="flex-1">
                                                <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                                                <div className="h-3 w-12 bg-slate-100 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Floating Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-24">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full h-14 bg-black rounded-2xl flex items-center justify-center text-white font-bold shadow-xl"
                                    >
                                        Swipe to Pay
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Callouts */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-24 -right-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 lg:block hidden"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-violet-100 text-violet-600 rounded-lg"><Tag size={20} /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Price Check</p>
                                    <p className="text-sm font-bold text-slate-900">₹85.00</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-40 -left-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 lg:block hidden"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ScanLine size={20} /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Scanner</p>
                                    <p className="text-sm font-bold text-slate-900">Active</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopperSection;
