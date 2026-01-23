'use client';

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const ImpactSection = () => {
    return (
        <section id="retailer-benefits" className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                        Measurable Impact
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        See how SwiftCart AI is transforming retail efficiency and customer satisfaction.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Revenue Growth', value: 35, suffix: '%', context: 'Across 50+ stores' },
                        { label: 'Wait Time Reduction', value: 80, suffix: '%', context: 'During peak hours' },
                        { label: 'Customer Satisfaction', value: 4.8, suffix: '/5', decimals: 1, context: 'Based on 10k+ ratings' },
                        { label: 'Active Retailers', value: 500, suffix: '+', context: 'Pan-India deployment' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-4xl font-extrabold text-slate-900 mb-2">
                                <CountUp
                                    end={stat.value}
                                    duration={2.5}
                                    decimals={stat.decimals || 0}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <div className="text-slate-600 font-bold mb-2">
                                {stat.label}
                            </div>
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                {stat.context}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
