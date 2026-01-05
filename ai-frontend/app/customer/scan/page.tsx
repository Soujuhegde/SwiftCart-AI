
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Barcode, Keyboard, X, Plus, Minus, Store, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {
    const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, inventory } = useDemo();
    const [isScanning, setIsScanning] = React.useState(true);
    const scannerRef = React.useRef<Html5Qrcode | null>(null);

    // Mock scan function - adds random item from mock inventory that isn't in cart yet or just a specific one
    const simulateScan = () => {
        // Pick a random product from inventory
        const randomProduct = inventory[Math.floor(Math.random() * inventory.length)];
        addToCart(randomProduct);
        // Also verify the scanner logic works by trying to "simulate" a success if possible, 
        // but for now we just keep the button as a fallback.
    };

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        // Stop scanning to verify/process
        if (scannerRef.current && scannerRef.current.isScanning) {
            scannerRef.current.pause();
            setIsScanning(false);
        }

        // For this demo, we can just pick a random product or "find" one based on the code.
        // Since we don't have real barcodes mapped, let's just use the simulate logic
        // but adding a toast or something would be nice. For now:
        const randomProduct = inventory[Math.floor(Math.random() * inventory.length)];
        // Ideally we would look up: inventory.find(p => p.id === decodedText)
        addToCart(randomProduct);

        // Resume scanning after a delay
        setTimeout(() => {
            if (scannerRef.current) {
                scannerRef.current.resume();
                setIsScanning(true);
            }
        }, 2000);
    };

    React.useEffect(() => {
        let isMounted = true;

        const initScanner = async () => {
            try {
                // Dynamic import to avoid SSR issues if any, though standard import works
                const { Html5Qrcode } = await import("html5-qrcode");

                // If unmounted during import, stop
                if (!isMounted) return;

                // Extra safety: Clear generic container content if something got stuck
                const element = document.getElementById("reader");
                if (element) element.innerHTML = "";

                const scanner = new Html5Qrcode("reader");
                scannerRef.current = scanner;

                const config = {
                    fps: 10,
                    aspectRatio: 1.333333
                };

                await scanner.start(
                    { facingMode: "environment" },
                    config,
                    onScanSuccess,
                    (errorMessage) => {
                        // console.log(errorMessage); // Ignore frame errors
                    }
                );
            } catch (err) {
                console.error("Error starting scanner", err);
                if (isMounted) setIsScanning(false);
            }
        };

        // Small timeout to allow previous cleanup to finish if in strict mode
        const timer = setTimeout(() => {
            initScanner();
        }, 100);

        return () => {
            isMounted = false;
            clearTimeout(timer);
            if (scannerRef.current) {
                // We need to capture the current ref processing in a way that doesn't leak
                const scannerToStop = scannerRef.current;
                scannerRef.current = null;

                scannerToStop.stop().then(() => {
                    scannerToStop.clear();
                }).catch(err => {
                    console.log("Scanner stop error", err);
                    // Force clear if stop fails typically means it wasn't running fully yet
                    // manually clearing innerHTML might be needed if library fails
                    const element = document.getElementById("reader");
                    if (element) element.innerHTML = "";
                });
            }
        };
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 pb-20">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-20">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <ShoppingCart size={18} />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">SwiftCart AI</h1>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Store size={12} />
                            <span>Downtown Market</span>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <HelpCircle size={18} className="text-slate-500" />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Scanner Viewfinder */}
                <div className="relative w-full overflow-hidden shadow-lg group rounded-xl bg-black">
                    {/* The reader div where the camera stream renders */}
                    <div id="reader" className="w-full h-full min-h-[300px] overflow-hidden rounded-xl"></div>

                    {/* Scanner Overlay UI - Positioned absolutely over the reader */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
                        <div className="relative w-64 h-64 rounded-lg flex items-center justify-center">
                            <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-l-4 border-t-4 border-blue-500"></div>
                            <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-r-4 border-t-4 border-blue-500"></div>
                            <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-l-4 border-b-4 border-blue-500"></div>
                            <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-r-4 border-b-4 border-blue-500"></div>
                            <div className="w-full h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
                        </div>
                        <p className="mt-4 text-white text-sm font-medium drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            {isScanning ? "Point at barcode to scan" : "Processing..."}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-base font-bold shadow-blue-500/20 shadow-lg" onClick={simulateScan}>
                        <Barcode className="mr-2 h-5 w-5" />
                        Simulate Scan
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-16 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <Keyboard className="h-5 w-5 text-slate-500" />
                    </Button>
                </div>

                {/* Cart Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Cart</h2>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{cart.reduce((a, b) => a + b.qty, 0)} items</Badge>
                    </div>

                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {cart.length === 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 opacity-50">
                                    <ShoppingCart size={48} className="text-slate-300 mb-2" />
                                    <p className="text-slate-500 text-sm">Cart is empty</p>
                                </motion.div>
                            )}
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">${item.price.toFixed(2)} / unit</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 p-1">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="flex items-end justify-between mt-2">
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 h-8">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-base text-slate-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Footer Checkout */}
            <div className="absolute bottom-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-30">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Tax (8%)</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-slate-200">
                        <span className="font-bold text-slate-900 dark:text-white">Total</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                </div>
                <Link href="/customer/payment">
                    <Button className="w-full h-14 text-lg font-bold bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white shadow-xl" disabled={cart.length === 0}>
                        checkout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
