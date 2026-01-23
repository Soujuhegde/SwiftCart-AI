"use client";

import { AlertTriangle, ShieldAlert, CreditCard, ChevronRight, XOctagon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EXCEPTIONS = [
    { type: "age_check", title: "Age Verify Needed", desc: "Alcohol detected in Cart #S-9014", time: "2m", severity: "medium" },
    { type: "payment_fail", title: "Payment Declined", desc: "Card ended in 4242 (Insufficient Funds)", time: "5m", severity: "high" },
    { type: "unusual_qty", title: "Bulk Quantity Alert", desc: "15x Dairy Milk (S-9012)", time: "12m", severity: "low" },
    { type: "void_item", title: "Suspicious Void", desc: "Removed expensive item at exit", time: "18m", severity: "medium" },
];

const ExceptionsPanel = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl border border-rose-100/50 shadow-xl shadow-rose-100/20 flex flex-col h-full overflow-hidden"
        >
            <div className="p-5 border-b border-rose-50 bg-rose-50/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                        <ShieldAlert size={18} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 tracking-tight text-sm uppercase">Active Alerts</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    <span className="bg-white text-rose-700 text-xs font-bold px-2 py-0.5 rounded-md border border-rose-100 shadow-sm">{EXCEPTIONS.length} Issues</span>
                </div>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50/30">
                {EXCEPTIONS.map((ex, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${ex.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>

                        <div className="flex items-start justify-between mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border flex items-center gap-1.5
                                ${ex.severity === 'high' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'}
                            `}>
                                {ex.severity === 'high' && <img src="/security_alert_thumbnail.png" alt="Alert" className="w-3 h-3 object-contain" />}
                                {ex.type.replace('_', ' ')}
                            </span>
                            <span className="text-xs font-mono text-gray-400">{ex.time} ago</span>
                        </div>

                        <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight group-hover:text-blue-600 transition-colors">{ex.title}</h4>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{ex.desc}</p>

                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-gray-200"
                            >
                                Ignore
                            </Button>
                            <Button
                                size="sm"
                                className="h-8 text-xs font-semibold bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-900/10"
                            >
                                Resolve
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ExceptionsPanel;
