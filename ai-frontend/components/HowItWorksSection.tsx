"use client";

import { Scan, ShoppingBag, CreditCard, Receipt, Store, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionReveal, StaggerGrid, RevealItem } from './ui/motion/primitives';

const HowItWorksSection = () => {
    const STEPS = [
        {
            icon: Store,
            title: "Scan Store QR",
            desc: "Start session instantly via Web App. No download required.",
            color: "blue"
        },
        {
            icon: Scan,
            title: "Scan Items",
            desc: "Add products to live cart using your phone camera.",
            color: "indigo"
        },
        {
            icon: CreditCard,
            title: "Pay Now",
            desc: "Checkout securely via UPI or Card in one tap.",
            color: "violet"
        },
        {
            icon: Receipt,
            title: "Exit with Receipt",
            desc: "Show your digital exit pass and walk out.",
            color: "blue"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-[1150px] mx-auto px-6">

                <SectionReveal className="text-center mb-12 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-3">
                            Zero Friction. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Zero Queues.</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                            A strictly phone-based workflow. No app download required.
                        </p>
                    </motion.div>
                </SectionReveal>

                <div className="relative">
                    {/* Subtle Connecting Line (Desktop) */}
                    <div className="absolute top-12 left-[10%] right-[10%] h-[1px] bg-slate-100 hidden lg:block rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                            className="h-full bg-slate-200"
                        />
                    </div>

                    <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative z-10">
                        {STEPS.map((step, idx) => (
                            <RevealItem
                                key={idx}
                                className="group flex flex-col items-center text-center"
                            >
                                <motion.div
                                    className="relative mb-6"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="w-24 h-24 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-center relative z-10 group-hover:border-blue-100 group-hover:shadow-blue-200/40 transition-all duration-300">
                                        <div className={`p-4 rounded-2xl bg-${step.color}-50 text-${step.color}-600 group-hover:bg-${step.color}-100 transition-colors duration-300`}>
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <step.icon size={32} strokeWidth={2} />
                                            </motion.div>
                                        </div>
                                    </div>
                                    {/* Connectivity Dot */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5 + (idx * 0.1) }}
                                        className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-blue-100 hidden lg:block translate-x-1/2"
                                    />
                                </motion.div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                                    {idx + 1}. {step.title}
                                </h3>
                                <p className="text-base text-slate-500 font-medium leading-relaxed max-w-[220px] mx-auto group-hover:text-slate-600 transition-colors duration-300">
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
