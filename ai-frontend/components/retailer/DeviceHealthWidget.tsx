"use client";

import { CheckCircle2, Wifi, Zap, Server, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const DeviceHealthWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-xl p-5 text-white relative overflow-hidden"
        >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="font-bold text-slate-200 mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-blue-400" />
                System Health
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                            <Zap size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Stripe Payments</p>
                            <p className="text-[10px] text-slate-400 font-medium">99.9% Uptime</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div> Online
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                            <Wifi size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Store WiFi</p>
                            <p className="text-[10px] text-slate-400 font-medium">AP-South-1</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Stable
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DeviceHealthWidget;
