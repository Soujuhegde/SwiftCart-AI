"use client";

import { Map, ShieldCheck, BarChart3, Lock, Settings2, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerGrid, RevealItem, HoverCard, SectionReveal } from './ui/motion/primitives';

const WorkflowSection = () => {
    return (
        <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F8FAFC]">
                <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:flex justify-between items-end">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4">FOR RETAILERS</div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Control Center for <br />
                            Queue-less Billing.
                        </h2>
                    </div>
                    <p className="text-lg text-slate-500 font-medium max-w-md mt-6 md:mt-0">
                        Manage verification, exceptions, and store rules from one place.
                    </p>
                </div>

                {/* Asymmetric Bento Grid */}
                <StaggerGrid className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">

                    {/* Card 1: Real-time Store Pulse (Large, 3x2) */}
                    <HoverCard
                        glowColor="blue"
                        className="md:col-span-3 md:row-span-2 bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Activity size={24} />
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide border border-green-100">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Monitor Store Pulse</h3>
                            <p className="text-slate-500 font-medium">Track every active cart, item scan, and checkout in real-time.</p>
                        </div>
                        {/* Abstract Map Visual */}
                        <div className="mt-8 bg-slate-50 rounded-xl flex-1 border border-slate-100 relative overflow-hidden p-6">
                            {/* Simulator Elements */}
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-bold text-slate-600">
                                42 Active Shoppers
                            </div>

                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-4 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                Cart #A102 • ₹1,240
                            </div>

                            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
                            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150"></div>

                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        </div>
                    </HoverCard>

                    {/* Card 2: Prevent Theft (2x1) */}
                    <HoverCard
                        glowColor="violet"
                        className="md:col-span-2 md:row-span-1 bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-800 relative overflow-hidden text-white"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/10 rounded-xl"><ShieldCheck size={24} className="text-indigo-400" /></div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-slate-400 uppercase mb-1">Risk Score</span>
                                <span className="text-lg font-bold text-emerald-400">Low (98%)</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Prevent Theft</h3>
                        <p className="text-slate-400 text-sm font-medium">Smart verification flags high-risk carts automatically without slowing down loyal customers.</p>
                    </HoverCard>

                    {/* Card 3: Growth Insights (1x1) */}
                    <HoverCard
                        className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4 relative">
                            <BarChart3 size={28} />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                                +12%
                            </div>
                        </div>
                        <div className="text-xl font-black text-slate-900 mb-1">Growth</div>
                        <div className="text-xs font-medium text-slate-400">Revenue & Footfall</div>
                    </HoverCard>

                    {/* Card 4: Staff Control (1x1) */}
                    <HoverCard
                        className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center"
                    >
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">
                                    {(i === 3) ? '+' : ''}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-bold text-slate-900">Staff Access</div>
                        <div className="text-xs font-medium text-slate-400">Role-based Controls</div>
                    </HoverCard>

                    {/* Card 5: Smart Refunds (2x1) */}
                    <HoverCard
                        glowColor="indigo"
                        className="md:col-span-2 md:row-span-1 bg-indigo-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-500/30 border border-indigo-500 relative overflow-hidden text-white"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-indigo-500/50 rounded-lg"><Zap size={24} className="text-white" /></div>
                            <div>
                                <h3 className="text-xl font-bold">Instant Resolution</h3>
                                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wide">Refunds & Voids</p>
                            </div>
                        </div>
                        <p className="text-indigo-100 text-sm font-medium">Handle exceptions in seconds directly from the dashboard.</p>
                    </HoverCard>

                </StaggerGrid>
            </div>
        </section>
    );
};

export default WorkflowSection;
