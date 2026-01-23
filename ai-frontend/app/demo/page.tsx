"use client";

import React, { useState } from "react";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RotateCcw, ShoppingCart, CreditCard, Box, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoControlPage() {
    const { addToCart, inventory, processPayment, resetDemo } = useDemo();


    const handleSimulateAdd = () => {
        const randomProduct = inventory[Math.floor(Math.random() * inventory.length)];
        addToCart(randomProduct);
        toast.success(`added ${randomProduct.name}`, {
            description: "Simulating shopper action...",
            icon: <ShoppingCart className="w-4 h-4 text-blue-600" />,
        });
    };

    const handleReset = () => {
        resetDemo();
        toast.info("Demo Reset", { description: "Session cleared." });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-3xl w-full text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white border border-blue-100 shadow-sm shadow-blue-500/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">Live Simulator</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Control the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Experience.</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                    Trigger real-time events to see how SwiftCart handles shoppers, inventory, and payments instantly.
                </p>
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
                <div className="p-8 md:p-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Activity className="text-blue-600" /> Simulation Studio
                            </h2>
                            <p className="text-slate-500 font-medium">Select an actor to trigger actions.</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                            className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-bold gap-2"
                        >
                            <RotateCcw size={14} /> Reset Session
                        </Button>
                    </div>

                    <Tabs defaultValue="customer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-10 h-14 bg-slate-50 p-1.5 rounded-2xl">
                            <TabsTrigger
                                value="customer"
                                className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm h-full"
                            >
                                Customer Actions
                            </TabsTrigger>
                            <TabsTrigger
                                value="retailer"
                                className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm h-full"
                            >
                                Retailer Events
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="customer" className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    onClick={handleSimulateAdd}
                                    className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-blue-50/50 border-2 border-dashed border-blue-200 hover:bg-blue-50 hover:border-blue-400 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                                        <ShoppingCart size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Add Item</h3>
                                    <p className="text-sm text-slate-500 font-medium">Random Product</p>
                                </button>

                                <button
                                    onClick={processPayment}
                                    className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-green-50/50 border-2 border-dashed border-green-200 hover:bg-green-50 hover:border-green-400 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                                        <CreditCard size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Checkout</h3>
                                    <p className="text-sm text-slate-500 font-medium">Process Payment</p>
                                </button>
                            </div>
                        </TabsContent>

                        <TabsContent value="retailer" className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-indigo-50/50 border-2 border-dashed border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                                        <Box size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Restock</h3>
                                    <p className="text-sm text-slate-500 font-medium">Add Inventory (+20)</p>
                                </button>

                                <button
                                    className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-amber-50/50 border-2 border-dashed border-amber-200 hover:bg-amber-50 hover:border-amber-400 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-amber-600 group-hover:scale-110 transition-transform">
                                        <Zap size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Price Surge</h3>
                                    <p className="text-sm text-slate-500 font-medium">Trigger Dynamic Pricing</p>
                                </button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer of Card */}
                <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Interactions sync across all active windows
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
