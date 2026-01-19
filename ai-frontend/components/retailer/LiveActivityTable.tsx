"use client";

import { MoreHorizontal, Smartphone, AlertCircle, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const SESSIONS = [
    { id: "S-9012", status: "scanning", items: 5, total: "₹450", time: "12m", shopper: "Guest (App)", risk: "low" },
    { id: "S-9013", status: "payment_pending", items: 12, total: "₹1,240", time: "28m", shopper: "Rajiv M.", risk: "med" },
    { id: "S-9014", status: "flagged", items: 3, total: "₹2,100", time: "5m", shopper: "Guest (App)", risk: "high" },
    { id: "S-9011", status: "completed", items: 8, total: "₹890", time: "15m", shopper: "Anita S.", risk: "low" },
    { id: "S-9010", status: "completed", items: 2, total: "₹150", time: "4m", shopper: "Guest (App)", risk: "low" },
];

const LiveActivityTable = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden flex flex-col h-full ring-1 ring-gray-100"
        >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <h3 className="font-extrabold text-gray-900 tracking-tight text-lg">Live Floor Activity</h3>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 uppercase tracking-wide">
                    View All <ChevronRight size={14} className="ml-1" />
                </Button>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
                        <tr>
                            <th className="px-6 py-4">Session ID</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {SESSIONS.map((session, idx) => (
                            <motion.tr
                                key={session.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                                className="group hover:bg-gray-50/80 transition-all cursor-pointer"
                            >
                                <td className="px-6 py-5 font-bold text-gray-900 flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <Smartphone size={16} />
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-gray-400 font-normal">ID</div>
                                        {session.id}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className={`
                                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border
                                        ${session.status === 'scanning' ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                                        ${session.status === 'payment_pending' ? 'bg-purple-50 text-purple-700 border-purple-100' : ''}
                                        ${session.status === 'flagged' ? 'bg-rose-50 text-rose-700 border-rose-100' : ''}
                                        ${session.status === 'completed' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : ''}
                                    `}>
                                        <span className={`w-1.5 h-1.5 rounded-full 
                                            ${session.status === 'scanning' ? 'bg-blue-500' : ''}
                                            ${session.status === 'payment_pending' ? 'bg-purple-500' : ''}
                                            ${session.status === 'flagged' ? 'bg-rose-500' : ''}
                                            ${session.status === 'completed' ? 'bg-indigo-500' : ''}
                                        `}></span>
                                        {session.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="font-bold text-gray-700">{session.items}</span>
                                    <span className="text-xs text-gray-400 ml-1 font-medium">items</span>
                                </td>
                                <td className="px-6 py-5 font-bold text-gray-900 tabular-nums">{session.total}</td>
                                <td className="px-6 py-5 text-gray-500 flex items-center gap-1.5">
                                    <Clock size={14} className="text-gray-400" />
                                    {session.time}
                                </td>
                                <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                        <MoreHorizontal size={16} />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default LiveActivityTable;
