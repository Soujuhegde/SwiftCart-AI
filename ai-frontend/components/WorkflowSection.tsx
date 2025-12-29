"use client";

import { Scan, Server, BrainCircuit, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowSection = () => {
    const steps = [
        {
            id: 1,
            title: "Sense",
            icon: <Scan size={24} className="text-blue-600" />,
            color: "bg-blue-50",
            desc: "Detect real-world signals",
        },
        {
            id: 2,
            title: "Analyze",
            icon: <Server size={24} className="text-purple-600" />,
            color: "bg-purple-50",
            desc: "Normalize & enrich data",
        },
        {
            id: 3,
            title: "Decide",
            icon: <BrainCircuit size={24} className="text-indigo-600" />,
            color: "bg-indigo-50",
            desc: "Predict + choose best action",
        },
        {
            id: 4,
            title: "Act",
            icon: <Zap size={24} className="text-orange-600" />,
            color: "bg-orange-50",
            desc: "Execute via ERP / Systems",
        },
    ];

    return (
        <section id="agentic-loop" className="py-24 px-6 bg-white relative">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-extrabold text-gray-900 mb-2 relative inline-block"
                >
                    The Agentic Workflow
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gray-500 mt-6 mb-16 max-w-2xl mx-auto font-medium"
                >
                    A closed-loop AI system that <span className="text-gray-900">thinks, decides, and acts</span> on its own.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative group">
                            {/* Connector Line */}
                            {index !== steps.length - 1 && (
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
                                    className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gray-100 z-0 origin-left"
                                ></motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10 flex flex-col items-center"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-inner`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 font-medium">{step.desc}</p>

                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
