
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingCart, Lock, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900">
            <header className="flex items-center justify-center border-b border-slate-100 dark:border-slate-800 px-10 py-4 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <ShoppingCart className="text-blue-600" />
                    <h2 className="text-lg font-bold leading-tight tracking-tight">SwiftCart AI</h2>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping"></div>
                        <div className="relative bg-blue-600/10 rounded-full p-6 text-blue-600">
                            <CheckCircle size={64} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Payment Successful!</h1>
                        <p className="text-slate-500 text-sm max-w-xs">
                            You're all set. You may now exit the store without any alarms.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full mt-10"
                >
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3 w-full">
                        <p className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">Exit Pass</p>
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <div className="w-32 h-32 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaL4k0z7LJZ_6fAb5GARk3UuBHWuf6Jkhg1GB1lrwycMKxgyHQgOJKOC7wagHjsF08MMS9fC5hqJeX90nF5dUPrkseLnDnPCgyqVTkatsJvJnikJ2jUw8rgvR5be1grCsaWvWsHEmznlVdOeq5yibVs1ZwzI2ulDWszeod_qjxL5SrqUPS7hjd8DZE3_02am76uI3pAT0RXu9dvLjPu7JQ7uNh08Wj7MkFk3Dwtf8yU_J8-_WAzhTwNHOk0HtCg2AWgN-slcZpBV01')] bg-contain bg-center bg-no-repeat"></div>
                        </div>
                        <p className="text-slate-400 text-[10px]">Scan at the door if prompted</p>
                    </div>
                </motion.div>
            </main>

            <div className="p-6 pb-8 space-y-3">
                <Link href="/customer/scan">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                        Back to Home
                    </Button>
                </Link>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2 bg-slate-50 border-slate-200">
                        <Download size={16} />
                        Invoice
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 bg-slate-50 border-slate-200">
                        <Mail size={16} />
                        Email
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-50">
                    <Lock size={12} />
                    <p className="text-xs">Secured by SwiftCart AI</p>
                </div>
            </div>
        </div>
    );
}
