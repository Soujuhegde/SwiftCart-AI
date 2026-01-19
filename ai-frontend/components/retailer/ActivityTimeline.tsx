"use client";

import { CheckCircle2, ShoppingCart, UserPlus, LogOut, ArrowRight, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';

const EVENTS = [
    { type: 'exit', time: 'Just now', user: 'S-9011', desc: 'Paid & Exited' },
    { type: 'scan', time: '20s ago', user: 'S-9013', desc: 'Scanned Milk (2L)' },
    { type: 'enter', time: '1m ago', user: 'Guest', desc: 'Started Session' },
    { type: 'pay', time: '2m ago', user: 'S-9010', desc: 'Payment Success' },
    { type: 'scan', time: '3m ago', user: 'S-9012', desc: 'Scanned Bread' },
    { type: 'enter', time: '5m ago', user: 'S-9014', desc: 'Started Session' },
];

const ActivityTimeline = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Live Floor Feed</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                    Live
                </div>
            </div>

            <div className="relative">
                {/* Horizontal Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 w-full z-0"></div>

                <div className="flex gap-4 overflow-x-auto pb-4 relative z-10 scrollbar-hide">
                    {EVENTS.map((ev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex-shrink-0 flex flex-col items-center gap-3 w-24 group cursor-pointer"
                        >
                            <div className="relative">
                                {/* Base Icon/Avatar */}
                                <div className={`
                                    w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 overflow-hidden relative
                                    ${ev.type === 'exit' ? 'bg-indigo-500 text-white' : ''}
                                    ${ev.type === 'pay' ? 'bg-indigo-500 text-white' : ''}
                                    ${ev.type === 'scan' ? 'bg-blue-500 text-white' : ''}
                                    ${ev.type === 'enter' ? 'bg-slate-800 text-white' : ''}
                                `}>
                                    {/* Use Avatar for Users if available, else Icon */}
                                    {(ev.type === 'enter' || ev.type === 'exit') ? (
                                        <img
                                            src={idx % 2 === 0 ? "/shopper_avatar_1.png" : "/shopper_avatar_2.png"}
                                            alt="Shopper"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            {ev.type === 'exit' && <LogOut size={14} />}
                                            {ev.type === 'pay' && <CheckCircle2 size={14} />}
                                            {ev.type === 'scan' && <ScanLine size={14} />}
                                        </>
                                    )}
                                </div>

                                {/* Tiny Badge Indicator */}
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white
                                    ${ev.type === 'scan' ? 'bg-blue-500' : ev.type === 'pay' ? 'bg-green-500' : 'bg-slate-900'}
                                `}>
                                    {ev.type === 'scan' ? '+' : ev.type === 'pay' ? '✓' : '•'}
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] font-bold text-gray-400 mb-0.5">{ev.time}</p>
                                <p className="text-xs font-bold text-gray-900 leading-tight group-hover:text-blue-600 line-clamp-2 min-h-[2.5em]">{ev.desc}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{ev.user}</p>
                            </div>
                        </motion.div>
                    ))}

                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 opacity-50">
                        <ArrowRight size={16} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ActivityTimeline;
