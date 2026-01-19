"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Completed', value: 75 },
    { name: 'Remaining', value: 25 },
];
const COLORS = ['#6366f1', '#f3f4f6'];

const ThroughputGauge = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center relative overflow-hidden"
        >
            <h3 className="absolute top-5 left-5 text-xs font-bold text-gray-500 uppercase tracking-wide">Throughput</h3>

            <div className="relative w-32 h-32 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={55}
                            startAngle={180}
                            endAngle={0}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-2">
                    <span className="text-2xl font-extrabold text-gray-900 block leading-none">3.2</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Shop/Min</span>
                </div>
            </div>

            <div className="text-center mt-[-20px]">
                <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">
                    Top 5% of Stores
                </p>
            </div>
        </motion.div>
    );
};

export default ThroughputGauge;
