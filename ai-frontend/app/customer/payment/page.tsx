"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, Wallet, CheckCircle, ArrowRight, Lock, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";


import { CartItem } from "@/lib/api";

export default function PaymentPage() {
    const { cartTotal, cart, checkout } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [method, setMethod] = useState<"card" | "wallet">("card");

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const success = await checkout(total, method.toUpperCase());

            if (success) {
                toast.success('Payment successful!');
                router.push("/customer/success");
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 min-h-screen font-sans">
            <header className="flex-none flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100 shadow-sm z-10 sticky top-0">
                <Link href="/customer/scan" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <ChevronLeft size={20} />
                    <span className="font-bold text-sm">Back</span>
                </Link>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-slate-900 tracking-tight">Checkout</h1>
                </div>
                <div className="w-10"></div> {/* Spacer for centering */}
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                {/* Order Summary */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-extrabold text-slate-900">Order Summary</h3>
                        <Link href="/customer/scan" className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full transition-colors">Edit Cart</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {cart?.items?.map((item: CartItem) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.product?.imageUrl || '/placeholder.png'} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate text-slate-900">{item.product?.name}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payment Method */}
                <section>
                    <h3 className="text-base font-extrabold text-slate-900 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <label className="cursor-pointer relative group" onClick={() => setMethod("card")}>
                            <motion.div
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-24 ${method === "card" ? "border-blue-600 bg-blue-50/50" : "border-white bg-white shadow-sm hover:border-slate-200"}`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <CreditCard className={`mb-2 ${method === "card" ? "text-blue-600" : "text-slate-400"}`} size={28} />
                                <span className={`text-sm font-bold ${method === "card" ? "text-blue-900" : "text-slate-500"}`}>Card</span>
                            </motion.div>
                            {method === "card" && (
                                <div className="absolute top-3 right-3 text-blue-600">
                                    <CheckCircle size={18} className="fill-current" />
                                </div>
                            )}
                        </label>
                        <label className="cursor-pointer relative group" onClick={() => setMethod("wallet")}>
                            <motion.div
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-24 ${method === "wallet" ? "border-blue-600 bg-blue-50/50" : "border-white bg-white shadow-sm hover:border-slate-200"}`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Wallet className={`mb-2 ${method === "wallet" ? "text-blue-600" : "text-slate-400"}`} size={28} />
                                <span className={`text-sm font-bold ${method === "wallet" ? "text-blue-900" : "text-slate-500"}`}>Wallet</span>
                            </motion.div>
                            {method === "wallet" && (
                                <div className="absolute top-3 right-3 text-blue-600">
                                    <CheckCircle size={18} className="fill-current" />
                                </div>
                            )}
                        </label>
                    </div>

                    {method === "card" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                        >
                            <div className="relative">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 mb-2 block">Card Number</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <CreditCard size={20} />
                                    </span>
                                    <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-base font-bold text-slate-900 transition-all placeholder:font-normal" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 grayscale">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 mb-2 block">Expiry</label>
                                    <input className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-base font-bold text-slate-900 text-center" placeholder="MM/YY" defaultValue="12/25" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 mb-2 block">CVC</label>
                                    <input className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-base font-bold text-slate-900 text-center" placeholder="123" defaultValue="123" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </section>

                {/* Cost breakdown */}
                <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                            <span>Tax (8%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px w-full bg-slate-100 my-2"></div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-slate-900">Total</span>
                            <span className="font-black text-xl text-slate-900 tracking-tight">₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="absolute bottom-0 w-full p-4 pb-8 border-t border-slate-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 rounded-t-[2rem] flex flex-col items-center justify-center">
                <Button className="w-64 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-full flex items-center justify-between px-6 group transition-all hover:scale-[1.05] active:scale-[0.95]" onClick={handlePayment} disabled={isProcessing || !cart || !cart.items || cart.items.length === 0}>
                    {isProcessing ? (
                        <div className="w-full flex items-center justify-center gap-3">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        <>
                            <span>Pay ₹{total.toFixed(2)}</span>
                            <div className="flex items-center gap-2">
                                <Lock size={14} className="text-blue-200" />
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </>
                    )}
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                    <Lock size={10} />
                    <p>Secured by SwiftCart AI</p>
                </div>
            </footer>
        </div >
    );
}
