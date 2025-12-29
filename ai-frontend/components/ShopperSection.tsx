"use client";

import { Smartphone, ShoppingCart, CreditCard, Receipt, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopperSection = () => {
    const features = [
        { title: "Scan & Go", icon: <Smartphone size={20} />, description: "Use your own phone." },
        { title: "Real-time Cart", icon: <ShoppingCart size={20} />, description: "No surprises at checkout." },
        { title: "Instant Payload", icon: <CreditCard size={20} />, description: "One tap checkout." },
        { title: "Digital Receipt", icon: <Receipt size={20} />, description: "Eco-friendly records." },
    ];

    return (
        <section id="shoppers" className="py-24 px-6 bg-gray-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2"
                >
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Shopping that disappears.</h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                        Give your customers the "Just Walk Out" experience they crave, <span className="font-semibold text-gray-900">without cameras, gates, or store retrofitting.</span>
                    </p>

                    <div className="space-y-4">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {feature.icon}
                                    </div>
                                    <span className="font-semibold text-gray-900">{feature.title}</span>
                                </div>
                                <span className="text-sm text-gray-400 font-medium group-hover:text-blue-600 transition-colors">{feature.description}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-azure-blue font-bold mt-8 transition-all"
                    >
                        Try the Shopper App Demo &rarr;
                    </motion.a>
                </motion.div>

                {/* Right Content - Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 50, rotate: 6 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="lg:w-1/2 flex justify-center"
                >
                    <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[40px] shadow-2xl p-3 border-4 border-slate-800 ring-1 ring-gray-900/5">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>

                        {/* Screen */}
                        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative flex flex-col font-sans">
                            {/* Header */}
                            <div className="h-16 bg-white border-b border-gray-100 flex items-end pb-3 px-5 justify-between shadow-sm z-10">
                                <span className="font-extrabold text-gray-900 tracking-tight text-lg">SwiftCart</span>
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">JD</div>
                            </div>

                            {/* App Content Placeholder */}
                            <div className="flex-1 p-5 space-y-4 bg-gray-50">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Your Cart</div>
                                    <div className="text-2xl font-bold text-gray-900">$24.50</div>
                                </div>

                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + (i * 0.2) }}
                                            className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
                                        >
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                            <div className="flex-1 space-y-1">
                                                <div className="h-2.5 bg-gray-200 w-24 rounded"></div>
                                                <div className="h-2 bg-gray-100 w-12 rounded"></div>
                                            </div>
                                            <div className="font-bold text-gray-900 text-sm">$4.50</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Bar */}
                            <div className="p-4 bg-white border-t border-gray-100 z-10">
                                <div className="w-full h-14 bg-black rounded-2xl flex items-center justify-between px-1 text-white shadow-xl cursor-pointer group overflow-hidden relative">
                                    <div className="absolute left-1 top-1 bottom-1 w-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:w-full transition-all duration-500">
                                        <ArrowRight size={20} className="text-white" />
                                    </div>
                                    <span className="w-full text-center font-bold text-sm tracking-wide z-10 pl-8 pointer-events-none">Swipe to Pay</span>
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ShopperSection;
