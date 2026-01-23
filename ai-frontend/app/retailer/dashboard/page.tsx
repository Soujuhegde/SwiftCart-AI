"use client";

import React from "react";
import DashboardKPIs from "@/components/retailer/DashboardKPIs";
import LiveActivityTable from "@/components/retailer/LiveActivityTable";
import ExceptionsPanel from "@/components/retailer/ExceptionsPanel";
import DeviceHealthWidget from "@/components/retailer/DeviceHealthWidget";
import ActivityTimeline from "@/components/retailer/ActivityTimeline";
import ThroughputGauge from "@/components/retailer/ThroughputGauge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Calendar, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <div className="max-w-[1800px] mx-auto space-y-6 pb-10">

            {/* Header & Date Range */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-1"
                >
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Operations Command Center</h2>
                    <p className="text-sm text-slate-500 font-medium">Welcome back, Sarah. Store traffic is <span className="text-emerald-600 font-bold">+15%</span> today.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <Button variant="outline" className="h-9 gap-2 bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm">
                        <Calendar size={14} /> Today
                    </Button>
                    <Button variant="outline" className="h-9 gap-2 bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm">
                        <Download size={14} /> Export Report
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                        <RefreshCcw size={16} />
                    </Button>
                </motion.div>
            </div>

            {/* Row 1: KPI Grid */}
            <DashboardKPIs />

            {/* Row 2: Main Operations + Wow Factors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

                {/* Left Col: Activity Table (Width 8) */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full">
                    {/* Live Table */}
                    <div className="flex-1 min-h-0">
                        <LiveActivityTable />
                    </div>
                    {/* Timeline (Wow Factor) */}
                    <div className="h-40 flex-shrink-0">
                        <ActivityTimeline />
                    </div>
                </div>

                {/* Right Col: Exceptions & Status (Width 4) */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    {/* Exceptions (Crucial) */}
                    <div className="flex-1 min-h-[300px]">
                        <ExceptionsPanel />
                    </div>

                    {/* Gauge & Health Split */}
                    <div className="h-40 grid grid-cols-2 gap-6 flex-shrink-0">
                        <ThroughputGauge />
                        <DeviceHealthWidget />
                    </div>
                </div>
            </div>
        </div>
    );
}
