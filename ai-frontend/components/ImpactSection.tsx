"use client";

import { TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import Link from 'next/link';
import ClientOnly from './ClientOnly';
import { SectionReveal, StaggerGrid, HoverCard } from './ui/motion/primitives';
import CountUp from 'react-countup';

const CHART_DATA = [
    { v: 10 }, { v: 15 }, { v: 12 }, { v: 25 }, { v: 35 }, { v: 50 }, { v: 65 }, { v: 80 }
];

const ImpactSection = () => {
    return (
        <section className="py-32 px-6 bg-[#0B1120] relative overflow-hidden text-white selection:bg-indigo-500/30">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

            <SectionReveal className="max-w-7xl mx-auto text-center mb-16 relative z-10">
                <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-500/20">PILOT INSIGHTS</div>
                <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter">
                    Built for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Busy Stores.</span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Efficiency targets for high-volume retail.
                </p>
            </SectionReveal>

            <StaggerGrid className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Metric 1 */}
                <HoverCard glowColor="blue" className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Avg. Checkout</div>
                    <div className="text-5xl font-black text-white mb-4">
                        <CountUp end={12} suffix="s" duration={2.5} enableScrollSpy scrollSpyOnce />
                    </div>
                    <p className="text-slate-500 font-medium text-xs mb-4">(Pilot Results)</p>
                    <div className="h-16 w-full opacity-50 min-w-[100px]">
                        <ClientOnly className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CHART_DATA}>
                                    <defs>
                                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="v"
                                        stroke="#60a5fa"
                                        fillOpacity={1}
                                        fill="url(#chartColor)"
                                        isAnimationActive={true}
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ClientOnly>
                    </div>
                </HoverCard>

                {/* Metric 2 */}
                <HoverCard glowColor="violet" className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Queues Removed</div>
                    <div className="text-5xl font-black text-white mb-4">
                        <CountUp end={100} suffix="%" duration={3} enableScrollSpy scrollSpyOnce />
                    </div>
                    <p className="text-slate-500 font-medium">(Target)</p>
                </HoverCard>

                {/* Metric 3 */}
                <HoverCard glowColor="indigo" className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Basket Size</div>
                    <div className="text-5xl font-black text-white mb-4 text-blue-400">
                        <CountUp end={15} prefix="+" suffix="%" duration={2.5} enableScrollSpy scrollSpyOnce />
                    </div>
                    <p className="text-slate-500 font-medium">Increased impulse buys. <span className="text-xs opacity-60 block mt-1">(Pilot Results)</span></p>
                </HoverCard>
            </StaggerGrid>

            {/* Giant CTA */}
            <SectionReveal className="max-w-4xl mx-auto mt-24 text-center">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 inline-block hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-shadow duration-500">
                    <Link href="/retailer/dashboard">
                        <button className="px-12 py-5 rounded-full bg-[#0B1120] text-white font-bold text-xl hover:bg-slate-900 transition-all flex items-center gap-3">
                            Deploy SwiftCart <ArrowRight />
                        </button>
                    </Link>
                </div>
                <div className="mt-8 flex justify-center gap-8 text-slate-500 text-sm font-bold opacity-60">
                    <span className="flex items-center gap-2"><ShieldCheck size={16} /> SOC2 Ready</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={16} /> 99.9% Uptime</span>
                </div>
            </SectionReveal>

        </section>
    );
};

export default ImpactSection;
