"use client";

import { Scan, ShoppingBag, CreditCard, Receipt, Store, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal, StaggerGrid, RevealItem } from './ui/motion/primitives';

const HowItWorksSection = () => {
    const STEPS = [
        {
            icon: Store,
            title: "Scan Store QR",
            desc: "Start session instantly via Web App. No download needed.",
            color: "blue"
        },
        {
            icon: Scan,
            title: "Scan Items",
            desc: "Add products to live cart using phone camera.",
            color: "indigo"
        },
        {
            icon: CreditCard,
            title: "Pay Now",
            desc: "Pay via UPI or Card in one tap.",
            color: "violet"
        },
        {
            icon: Receipt,
            title: "Exit with Receipt",
            desc: "Show digital exit pass if requested. Walk out.",
            color: "blue"
        }
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <SectionReveal className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Zero Friction. <br />
                        <span className="text-indigo-600">Zero Queues.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        A strictly phone-based workflow. No app download required.
                    </p>
                </SectionReveal>

                <div className="relative max-w-6xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-10 left-4 right-4 h-[2px] bg-indigo-50 hidden lg:block rounded-full overflow-hidden">
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full h-full bg-gradient-to-r from-indigo-100 via-blue-100 to-indigo-100"
                        />
                    </div>

                    <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {STEPS.map((step, idx) => (
                            <RevealItem
                                key={idx}
                                className="group flex flex-col items-center text-center pt-0"
                            >
                                <div className={`w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 ring-[12px] ring-white`}>
                                    <div className={`p-3.5 rounded-xl bg-${step.color}-50 text-${step.color}-600 group-hover:bg-${step.color}-100 transition-colors`}>
                                        <step.icon size={28} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {idx + 1}. {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[180px] mx-auto">
                                    {step.desc}
                                </p>
                            </RevealItem>
                        ))}
                    </StaggerGrid>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
