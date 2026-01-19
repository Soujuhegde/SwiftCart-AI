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

                    {/* Card 1: Live Sessions (Large, 3x2) */}
                    <HoverCard
                        glowColor="blue"
                        className="md:col-span-3 md:row-span-2 bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                <Activity size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Live Sessions</h3>
                            <p className="text-slate-500 font-medium">Real-time tracking of every active shopper.</p>
                        </div>
                        {/* Abstract Map Visual */}
                        <div className="mt-8 bg-slate-50 rounded-xl flex-1 border border-slate-100 relative overflow-hidden p-6">
                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>

                            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
                            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150"></div>

                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        </div>
                    </HoverCard>

                    {/* Card 2: Exit Verification (2x1) */}
                    <HoverCard
                        glowColor="violet"
                        className="md:col-span-2 md:row-span-1 bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-800 relative overflow-hidden text-white"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/10 rounded-xl"><ShieldCheck size={24} className="text-indigo-400" /></div>
                            <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full">Active</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Exit Verification</h3>
                        <p className="text-slate-400 text-sm font-medium">Random checks & risk scoring.</p>
                    </HoverCard>

                    {/* Card 3: Reports (1x1) */}
                    <HoverCard
                        className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                            <BarChart3 size={28} />
                        </div>
                        <div className="text-2xl font-black text-slate-900">Reports</div>
                        <div className="text-xs font-bold text-slate-400 uppercase">Throughput</div>
                    </HoverCard>

                    {/* Card 4: Rules & Roles (1x1) */}
                    <HoverCard
                        className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center"
                    >
                        <div className="flex -space-x-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                        </div>
                        <div className="text-sm font-bold text-slate-900">Rules & Roles</div>
                        <div className="text-xs font-medium text-slate-400">Staff Control</div>
                    </HoverCard>

                    {/* Card 5: Refunds & Voids (2x1) */}
                    <HoverCard
                        glowColor="indigo"
                        className="md:col-span-2 md:row-span-1 bg-indigo-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-500/30 border border-indigo-500 relative overflow-hidden text-white"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Zap size={24} className="text-indigo-200" />
                            <h3 className="text-xl font-bold">Refunds & Voids</h3>
                        </div>
                        <p className="text-indigo-100 text-sm font-medium">Full transaction management.</p>
                    </HoverCard>

                </StaggerGrid>
            </div>
        </section>
    );
};

export default WorkflowSection;
