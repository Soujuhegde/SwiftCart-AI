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
import { CheckCircle, ShoppingCart, Lock, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { useCart } from "@/providers/CartContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

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
        const tableBody = lastOrder.items.map((item: any) => [
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
        const finalY = (doc as any).lastAutoTable.finalY || 150;
        doc.text("Thank you for shopping with SwiftCart AI!", 105, finalY + 20, { align: "center" });

        doc.save("swiftcart-receipt.pdf");
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900">
            <header className="flex items-center justify-center border-b border-slate-100 dark:border-slate-800 px-10 py-4 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <ShoppingCart className="text-blue-600" />
                    <h2 className="text-lg font-bold leading-tight tracking-tight">SwiftCart AI</h2>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-6 overflow-y-auto w-full max-w-md mx-auto">
                <div className="flex-1 flex flex-col items-center pt-6 text-center">
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

                    {/* Receipt Preview Section */}
                    {lastOrder && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full mt-8 text-left"
                        >
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Purchased Items</h3>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                                {lastOrder.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between p-3 text-sm">
                                        <div className="flex gap-3">
                                            <span className="font-medium text-slate-900 dark:text-white">{item.product?.name || item.name || 'Item'}</span>
                                            <span className="text-slate-500">x{item.quantity}</span>
                                        </div>
                                        <span className="font-semibold text-slate-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="p-3 flex justify-between font-bold text-base text-slate-900 dark:text-white">
                                    <span>Total</span>
                                    <span>₹{lastOrder.total.toFixed(2)}</span>
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
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-3 w-full">
                            <p className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">Exit Pass</p>
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <div className="w-32 h-32 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaL4k0z7LJZ_6fAb5GARk3UuBHWuf6Jkhg1GB1lrwycMKxgyHQgOJKOC7wagHjsF08MMS9fC5hqJeX90nF5dUPrkseLnDnPCgyqVTkatsJvJnikJ2jUw8rgvR5be1grCsaWvWsHEmznlVdOeq5yibVs1ZwzI2ulDWszeod_qjxL5SrqUPS7hjd8DZE3_02am76uI3pAT0RXu9dvLjPu7JQ7uNh08Wj7MkFk3Dwtf8yU_J8-_WAzhTwNHOk0HtCg2AWgN-slcZpBV01')] bg-contain bg-center bg-no-repeat"></div>
                            </div>
                            <p className="text-slate-400 text-[10px]">scan at the door if prompted</p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <div className="p-6 pb-8 space-y-6 bg-white dark:bg-slate-900">
                <Link href="/customer/scan">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20">
                        Back to Home
                    </Button>
                </Link>
                <div className="flex gap-3 mt-5">
                    <Button variant="outline" className="flex-1 gap-2 bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700" onClick={handleDownloadInvoice} disabled={!lastOrder}>
                        <Download size={16} />
                        Invoice
                    </Button>
                    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 gap-2 bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
                                <Mail size={16} />
                                Email
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
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
                                        className="col-span-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleSendEmail} disabled={isSending}>
                                    {isSending ? "Sending..." : "Send Receipt"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-50">
                    <Lock size={12} />
                    <p className="text-xs">Secured by SwiftCart AI</p>
                </div>
            </div>
        </div>
    );
}
