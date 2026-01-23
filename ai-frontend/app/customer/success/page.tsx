"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ShoppingCart, Lock, Download, Mail, ArrowRight, Store } from "lucide-react";
import { motion } from "framer-motion";

import { useCart } from "@/providers/CartContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";


interface OrderItem {
    name?: string;
    product?: { name: string };
    quantity: number;
    price: number;
}

export default function OrderSuccessPage() {
    const { lastOrder } = useCart();
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendEmail = async () => {
        if (!email) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSending(true);
        try {
            const res = await fetch('http://localhost:3002/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    orderDetails: lastOrder
                })
            });

            if (res.ok) {
                toast.success(`Receipt sent to ${email}`);
                setIsEmailOpen(false);
                setEmail("");
            } else {
                toast.error("Failed to send email");
            }
        } catch (error) {
            console.error("Email send error", error);
            toast.error("Failed to send email");
        } finally {
            setIsSending(false);
        }
    };

    const handleDownloadInvoice = () => {
        if (!lastOrder) return;

        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text("SwiftCart AI - Receipt", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.text(`Date: ${lastOrder.date}`, 14, 30);
        doc.text(`Transaction ID: #${Math.floor(Math.random() * 1000000)}`, 14, 35);

        // Items Table
        const tableBody = lastOrder.items.map((item: OrderItem) => [
            item.product?.name || item.name || 'Unknown',
            item.quantity.toString(),
            `Rs. ${item.price.toFixed(2)}`,
            `Rs. ${(item.price * item.quantity).toFixed(2)}`
        ]);

        autoTable(doc, {
            startY: 45,
            head: [["Item", "Qty", "Price", "Total"]],
            body: tableBody,
            foot: [
                ["", "", "Subtotal", `Rs. ${(lastOrder.total / 1.08).toFixed(2)}`],
                ["", "", "Tax (8%)", `Rs. ${(lastOrder.total - (lastOrder.total / 1.08)).toFixed(2)}`],
                ["", "", "Total", `Rs. ${lastOrder.total.toFixed(2)}`]
            ],
            theme: 'grid',
            headStyles: { fillColor: [37, 99, 235] }, // Blue-600
        });

        // Footer
        const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 150;
        doc.text("Thank you for shopping with SwiftCart AI!", 105, finalY + 20, { align: "center" });

        doc.save("swiftcart-receipt.pdf");
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 min-h-screen font-sans">
            <header className="flex items-center justify-center border-b border-slate-100 px-10 py-6 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3 text-slate-900">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <ShoppingCart size={20} />
                    </div>
                    <h2 className="text-lg font-black leading-tight tracking-tight">SwiftCart AI</h2>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-6 overflow-y-auto w-full max-w-md mx-auto items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center gap-6 mt-8"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping duration-1000"></div>
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6 text-white shadow-2xl shadow-green-500/30">
                            <CheckCircle2 size={64} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-slate-900 text-3xl font-black tracking-tight leading-tight">Payment Successful!</h1>
                        <p className="text-slate-500 font-medium text-base max-w-xs">
                            You&apos;re all set. You may now exit the store without any alarms.
                        </p>
                    </div>
                </motion.div>

                {/* Receipt Preview Section */}
                {lastOrder && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full mt-10"
                    >
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                            <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Store size={14} className="text-slate-400" /> Receipt
                                </h3>
                                <div className="text-xs font-mono text-slate-400">#{Math.floor(Math.random() * 100000)}</div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {lastOrder.items.map((item: OrderItem, idx: number) => (
                                    <div key={idx} className="flex justify-between p-4 text-sm bg-white hover:bg-slate-50 transition-colors">
                                        <div className="flex gap-3">
                                            <span className="font-bold text-slate-900">{item.product?.name || item.name || 'Item'}</span>
                                            <span className="text-slate-400 text-xs py-0.5 px-1.5 bg-slate-100 rounded-md font-bold">x{item.quantity}</span>
                                        </div>
                                        <span className="font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-lg">
                                <span className="text-slate-500 font-medium">Total Paid</span>
                                <span className="font-black text-slate-900">₹{lastOrder.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full mt-6"
                >
                    <div className="bg-slate-900 p-5 rounded-2xl shadow-xl flex flex-col items-center gap-3 w-full relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>

                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] relative z-10">Digital Exit Pass</p>
                        <div className="bg-white p-3 rounded-xl shadow-inner relative z-10">
                            {/* Dynamic QR Code for the exit gate */}
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                                    JSON.stringify({
                                        type: 'EXIT_PASS',
                                        orderId: lastOrder?.id || 'GUEST',
                                        total: lastOrder?.total
                                    })
                                )}&color=000000&bgcolor=ffffff`}
                                alt="Exit QR Code"
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                        <p className="text-blue-200 text-[10px] font-medium animate-pulse relative z-10">Show this at the exit gate</p>
                    </div>
                </motion.div>
            </main>

            <div className="p-6 pb-10 space-y-4 bg-white border-t border-slate-100 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                <Link href="/customer/scan">
                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/20 rounded-xl">
                        Start New Order
                    </Button>
                </Link>
                <div className="flex gap-3 mt-3">
                    <Button variant="outline" className="flex-1 gap-2 h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-bold text-slate-600" onClick={handleDownloadInvoice} disabled={!lastOrder}>
                        <Download size={16} />
                        Invoice
                    </Button>
                    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 gap-2 h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-bold text-slate-600">
                                <Mail size={16} />
                                Email
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-2xl">
                            <DialogHeader>
                                <DialogTitle>Email Receipt</DialogTitle>
                                <DialogDescription>
                                    Enter your email address to receive a digital copy of your bill.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="col-span-3 rounded-xl"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleSendEmail} disabled={isSending} className="rounded-xl w-full">
                                    {isSending ? "Sending..." : "Send Receipt"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest font-bold pt-2">
                    <Lock size={10} />
                    <p>Secured by SwiftCart AI</p>
                </div>
            </div>
        </div>
    );
}
