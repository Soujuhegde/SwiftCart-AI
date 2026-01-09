"use client";

import { Cloud, Database, Cpu, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AzureSection = () => {
    const services = [
        {
            title: "Azure OpenAI",
            icon: <Cpu size={24} className="text-blue-400" />,
            description: "Powering demand prediction & reasoning with GPT-4 models."
        },
        {
            title: "Azure Cosmos DB",
            icon: <Database size={24} className="text-purple-400" />,
            description: "Serverless NoSQL database for real-time state management."
        },
        {
            title: "Azure Functions",
            icon: <Cloud size={24} className="text-cyan-400" />,
            description: "Event-driven architecture for autonomous workflow triggers."
        },
        {
            title: "App Service",
            icon: <Globe size={24} className="text-green-400" />,
            description: "Secure, auto-scaling hosting for the Next.js frontend."
        }
    ];

    const dataFlow = ["Shopper App", "Azure Functions", "Azure OpenAI", "Cosmos DB", "Action"];

    return (
        <section id="azure" className="py-24 px-6 bg-[#0B1120] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase border border-blue-900/50 px-3 py-1 rounded-full bg-blue-900/20"
                >
                    Powered by Microsoft
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-6"
                >
                    Built entirely on Azure
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-12"
                >
                    Leveraging the full power of the Microsoft Cloud to deliver enterprise-grade scalability, security, and responsible AI.
                </motion.p>

                {/* Reference Architecture Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mb-16 flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-gray-400 font-mono bg-white/5 p-4 rounded-xl border border-white/10 inline-flex mx-auto"
                >
                    {dataFlow.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <span className={index % 2 === 0 ? "text-blue-300" : "text-purple-300"}>{item}</span>
                            {index !== dataFlow.length - 1 && <ArrowRight size={14} className="text-gray-600" />}
                        </div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors text-left group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/5 group-hover:border-white/20 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-200 group-hover:text-white transition-colors">{service.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Built using Microsoft-recommended reference architecture for agentic AI.
                </div>
            </div>
        </section>
    );
};

export default AzureSection;
