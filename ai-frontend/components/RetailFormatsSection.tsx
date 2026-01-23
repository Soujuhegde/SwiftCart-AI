"use client";

import { motion } from 'framer-motion';
import { Store, ShoppingCart, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionReveal, StaggerGrid, RevealItem } from './ui/motion/primitives';

const FORMATS = [
    {
        label: "Small Grocery",
        headline: "Checkout without counters.",
        benefit: "Go live in < 15 mins. Zero hardware.",
        icon: Store,
        styles: {
            bg: "bg-sky-50",
            iconBg: "bg-white",
            text: "text-sky-900",
            accent: "text-sky-600",
            border: "group-hover:border-sky-200",
            button: "text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200"
        },
        bullets: [
            "Shoppers scan using their own phones",
            "Zero floor space or cabling required",
            "AI spot-checks ensure accuracy"
        ],
        cta: "See Small Store Setup"
    },
    {
        label: "Supermarket",
        headline: "Crush peak hour queues.",
        benefit: "Reduce front-end overhead by 40%.",
        icon: ShoppingCart,
        styles: {
            bg: "bg-violet-50",
            iconBg: "bg-white",
            text: "text-violet-900",
            accent: "text-violet-600",
            border: "group-hover:border-violet-200",
            button: "text-violet-700 bg-violet-50 hover:bg-violet-100 border-violet-200"
        },
        bullets: [
            "Self-service absorbs traffic spikes",
            "Reassign cashiers to customer service",
            "Smart gates verify every exit"
        ],
        cta: "View Supermarket Flow"
    },
    {
        label: "High-Footfall Retail",
        headline: "Secure without friction.",
        benefit: "Invisible security. Max conversion.",
        icon: ShoppingBag,
        styles: {
            bg: "bg-fuchsia-50",
            iconBg: "bg-white",
            text: "text-fuchsia-900",
            accent: "text-fuchsia-600",
            border: "group-hover:border-fuchsia-200",
            button: "text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200"
        },
        bullets: [
            "Real-time high-risk behavior detection",
            "Frictionless exit for verified shoppers",
            "Full conversion & dwell time analytics"
        ],
        cta: "Explore Security Controls"
    }
];

const RetailFormatsSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-[95%] 2xl:max-w-screen-2xl">
                <SectionReveal className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Built for Every <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-violet-600 to-fuchsia-600">Retail Environment.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Whether you run a corner shop or a hypermarket, SwiftCart adapts to your workflow—not the other way around.
                    </p>
                </SectionReveal>

                <StaggerGrid className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                    {FORMATS.map((format, idx) => (
                        <RevealItem key={idx} className={`rounded-[2.5rem] p-8 xl:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden bg-white`}>

                            {/* Subtle colored background wash at the top */}
                            <div className={`absolute top-0 left-0 w-full h-32 ${format.styles.bg} opacity-50`}></div>
                            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full ${format.styles.bg} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>

                            {/* Header */}
                            <div className="relative z-10 mb-8">
                                <div className={`w-16 h-16 rounded-2xl ${format.styles.iconBg} shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                    <format.icon size={32} className={format.styles.accent} strokeWidth={2} />
                                </div>

                                <span className={`inline-block py-1.5 px-3 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${format.styles.bg} ${format.styles.accent} bg-opacity-60`}>
                                    {format.label}
                                </span>

                                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1] mb-3 tracking-tight">
                                    {format.headline}
                                </h3>
                                <p className={`text-lg font-bold ${format.styles.accent} leading-snug`}>
                                    {format.benefit}
                                </p>
                            </div>

                            <div className="border-t border-slate-100 mb-8 relative z-10"></div>

                            {/* Bullets */}
                            <ul className="space-y-4 mb-10 flex-grow relative z-10">
                                {format.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-4 text-base font-medium text-slate-600">
                                        <CheckCircle2 size={20} className={`${format.styles.accent} mt-0.5 flex-shrink-0`} strokeWidth={2.5} />
                                        <span className="leading-snug">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a href="/retailer/dashboard">
                                <button className={`w-full py-4 rounded-xl border font-bold text-sm lg:text-base flex items-center justify-center gap-2 transition-all relative z-10 ${format.styles.button} group-hover:shadow-lg`}>
                                    {format.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </a>
                        </RevealItem>
                    ))}
                </StaggerGrid>
            </div>
        </section>
    );
};

export default RetailFormatsSection;
