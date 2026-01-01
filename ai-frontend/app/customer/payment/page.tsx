
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, CreditCard, Wallet, CheckCircle, ArrowRight, Lock } from "lucide-react";

export default function PaymentPage() {
    const { cartTotal, processPayment, cart } = useDemo();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [method, setMethod] = useState<"card" | "wallet">("card");

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;
    // Simulating an AI discount or similar if needed, but sticking to simple logic for now
    // Design has "AI Discount" shown in html mock, let's implement it if logical
    const aiDiscount = 0.0;

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        processPayment(); // Updates inventory, sales, clears cart
        setIsProcessing(false);
        router.push("/customer/success");
    };

    if (cart.length === 0 && !isProcessing) {
        // If refreshed and cart empty, redirect back or show empty
        // But demo flow might need persistence. 
        // For now, let's just let it be, or simple check
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
            <header className="flex-none flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10 sticky top-0">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
                        <ShoppingCart size={18} />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold uppercase text-slate-500">SwiftCart AI</h2>
                        <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">Checkout</h1>
                    </div>
                </Link>
                <Link href="/customer/scan" className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
                    Cancel
                </Link>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Order Summary */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Order Summary</h3>
                        <Link href="/customer/scan" className="text-xs font-semibold text-blue-600 hover:underline">Edit</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-800 border border-transparent hover:border-slate-200 transition-all shadow-sm">
                                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-slate-900 dark:text-white">{item.name}</p>
                                    <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                                </div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payment Method */}
                <section>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <label className="cursor-pointer relative group" onClick={() => setMethod("card")}>
                            <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-20 ${method === "card" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700"}`}>
                                <CreditCard className={`mb-1 ${method === "card" ? "text-blue-600" : "text-slate-400"}`} />
                                <span className={`text-xs font-semibold ${method === "card" ? "text-blue-600" : "text-slate-400"}`}>Card</span>
                            </div>
                            {method === "card" && (
                                <div className="absolute top-2 right-2 text-blue-600">
                                    <CheckCircle size={16} className="fill-current" />
                                </div>
                            )}
                        </label>
                        <label className="cursor-pointer relative group" onClick={() => setMethod("wallet")}>
                            <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-20 ${method === "wallet" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-700"}`}>
                                <Wallet className={`mb-1 ${method === "wallet" ? "text-blue-600" : "text-slate-400"}`} />
                                <span className={`text-xs font-semibold ${method === "wallet" ? "text-blue-600" : "text-slate-400"}`}>Wallet</span>
                            </div>
                            {method === "wallet" && (
                                <div className="absolute top-2 right-2 text-blue-600">
                                    <CheckCircle size={16} className="fill-current" />
                                </div>
                            )}
                        </label>
                    </div>

                    {method === "card" && (
                        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="relative">
                                <label className="text-xs font-medium text-slate-500 ml-1 mb-1 block">Card Number</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <CreditCard size={18} />
                                    </span>
                                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-all" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70">
                                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH01yJCUn7kYFZJlYOunxeth2PNCvrCP53ul7pQsLJHIo4NJxoBE8yU-m8tP_p9t4mjCIXicokLwv3iS4Zp2R5U1F3pYUpZtSJjAoBK4RSMr4HEfVQpqEAGUGsRdSKpiBqkkH81mF1W-o3dzSBSfVcJmHpopGSzePNQkzugKHf2ReI2auV43ysRMdu96q2U9ZCtcP1Jp2hx9tKbRvygFq8Mr3fqkGEW-QtyAo_Qdclwyv0_e8LL2DWgImpflEyBbDZHtS9WZJ9vzcM" alt="Mastercard" className="h-5" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 ml-1 mb-1 block">Expiry</label>
                                    <input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" placeholder="MM/YY" defaultValue="12/25" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 ml-1 mb-1 block">CVC</label>
                                    <input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" placeholder="123" defaultValue="123" />
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Cost breakdown */}
                <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-slate-500">
                            <span>Tax (8%)</span>
                            <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-slate-900 dark:text-white">Total</span>
                            <span className="font-extrabold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="flex-none p-6 border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10 flex flex-col gap-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" onClick={handlePayment} disabled={isProcessing || cart.length === 0}>
                    {isProcessing ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : (
                        <>
                            <span>Pay ${total.toFixed(2)}</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                    <Lock size={12} />
                    <p>Secured by <strong>SwiftCart AI</strong></p>
                </div>
            </footer>
        </div>
    );
}
