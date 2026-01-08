"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Barcode, Keyboard, X, Plus, Minus, Store, HelpCircle, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scanProduct } from "@/lib/api";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";

// Declare BarcodeDetector on global window for TypeScript if needed, 
// though we'll try to use the native one or polyfill directly.
declare global {
    interface Window {
        BarcodeDetector: any;
    }
}

export default function ScanPage() {
    const { cart, refreshCart, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
    const [isScanning, setIsScanning] = React.useState(true);
    const [showManualInput, setShowManualInput] = React.useState(false);
    const [manualBarcode, setManualBarcode] = React.useState("");
    const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
    const [cameraStatus, setCameraStatus] = React.useState("Initializing...");

    const inputRef = React.useRef<HTMLInputElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const requestRef = React.useRef<number | undefined>(undefined);
    const processingRef = React.useRef(false);

    // Focus input when shown
    React.useEffect(() => {
        if (showManualInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showManualInput]);

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (manualBarcode.trim()) {
            await onScanSuccess(manualBarcode.trim());
            setManualBarcode("");
            setShowManualInput(false);
        }
    };

    // Simulate scan function removed. Using real camera/manual input only.

    const onScanSuccess = async (decodedText: string) => {
        // Prevent duplicate scans in short window
        if (!isScanning && !showManualInput) return; // Logic check - manual input overrides scanning lock
        if (processingRef.current) return; // Double safety

        console.log(`Scan result: ${decodedText}`);

        // DEBUG: Alert user what was scanned (User reported mismatch)
        toast.info(`Scanned Barcode: ${decodedText}`);

        processingRef.current = true;
        setIsScanning(false);

        // Optional: vibrate
        if (navigator.vibrate) navigator.vibrate(200);

        try {
            toast.loading("Adding product...");
            const data = await scanProduct(decodedText);

            if (data.success) {
                toast.dismiss();
                toast.success(`Added ${data.product.name}`);
                await refreshCart();
            } else {
                toast.dismiss();
                toast.error("Failed to add product");
            }

        } catch (error: any) {
            // Check for expected "Product Not Found" (404)
            if (error.response && error.response.status === 404) {
                console.log("Product not found in DB or External API.");
                toast.dismiss();
                toast.error("Product not found. Please add it manually.", {
                    action: {
                        label: "Add Manual",
                        onClick: () => setShowManualInput(true)
                    }
                });
            } else {
                console.error("Scan failed:", error);
                toast.dismiss();
                toast.error(error.response?.data?.error || "Scan failed. Check connection.");
            }
        } finally {
            // Resume scanning after delay
            setTimeout(() => {
                processingRef.current = false;
                setIsScanning(true);
            }, 2000);
        }
    };

    React.useEffect(() => {
        let html5QrCode: Html5Qrcode | null = null;
        let isMounted = true;

        const initScanner = async () => {
            // Wait for manual input to close
            if (showManualInput) return;
            setCameraStatus("Mounting scanner...");

            try {
                // Determine if 'reader' exists
                if (!document.getElementById("reader")) {
                    setCameraStatus("Waiting for UI...");
                    return;
                }

                html5QrCode = new Html5Qrcode("reader");

                setCameraStatus("Requesting Camera...");
                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0
                    },
                    (decodedText) => {
                        if (!isMounted) return;
                        onScanSuccess(decodedText);
                        html5QrCode?.pause(true);
                        setCameraStatus("Scanned!");
                    },
                    (errorMessage) => {
                        // ignore frame errors
                    }
                );

                if (isMounted) {
                    setHasCameraPermission(true);
                    setCameraStatus("Active - Point at barcode");
                }

            } catch (err: any) {
                console.error("Error starting Html5Qrcode:", err);
                if (isMounted) {
                    setHasCameraPermission(false);
                    setCameraStatus(`Error: ${err.message || err}`);
                    setShowManualInput(true);
                }
            }
        };

        // Delay to allow layout paint
        const timeoutId = setTimeout(() => {
            initScanner();
        }, 800);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            if (html5QrCode) {
                if (html5QrCode.isScanning) {
                    html5QrCode.stop().catch(err => console.error("Stop failed", err));
                }
                html5QrCode.clear();
            }
        };
    }, [isScanning, showManualInput]);

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
                {/* Scanner Viewfinder / Manual Input Area */}
                <div className="relative w-full overflow-hidden shadow-lg group rounded-xl bg-black min-h-[300px] aspect-[4/3]">

                    {!showManualInput ? (
                        <>
                            {/* Reader Element for Html5Qrcode */}
                            <div id="reader" className="absolute inset-0 w-full h-full object-cover"></div>

                            {/* Scanner Overlay UI */}
                            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
                                <div className="relative w-64 h-64 rounded-lg flex items-center justify-center">
                                    <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-l-4 border-t-4 border-blue-500"></div>
                                    <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-r-4 border-t-4 border-blue-500"></div>
                                    <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-l-4 border-b-4 border-blue-500"></div>
                                    <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-r-4 border-b-4 border-blue-500"></div>
                                    <div className="w-full h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
                                </div>
                                <p className="mt-4 text-white text-sm font-medium drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                    {cameraStatus}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 bg-slate-900 text-white">
                            <h3 className="text-lg font-bold mb-4">Enter Barcode Manually</h3>
                            <form onSubmit={handleManualSubmit} className="w-full max-w-xs space-y-4">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="e.g. 5449000000996"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={manualBarcode}
                                    onChange={(e) => setManualBarcode(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Button type="button" variant="outline" className="flex-1 bg-transparent border-slate-600 hover:bg-slate-800 text-white" onClick={() => setShowManualInput(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Add Item</Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {/* Simulation Button Removed as per user request to rely on real scanner */}
                    <Button
                        variant={showManualInput ? "default" : "outline"}
                        size="icon"
                        className={`h-12 w-16 ${showManualInput ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                        onClick={() => setShowManualInput(!showManualInput)}
                    >
                        <Keyboard className={`h-5 w-5 ${showManualInput ? 'text-white' : 'text-slate-500'}`} />
                    </Button>
                </div>

                {/* Cart Section */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Cart</h2>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{itemCount} items</Badge>
                    </div>

                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {(!cart || !cart.items || cart.items.length === 0) && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 opacity-50">
                                    <ShoppingCart size={48} className="text-slate-300 mb-2" />
                                    <p className="text-slate-500 text-sm">Cart is empty</p>
                                </motion.div>
                            )}
                            {cart?.items?.map((item: any) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm"
                                >
                                    <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                        {/* Fallback image or item.product.imageUrl */}
                                        <img src={item.product?.imageUrl || '/placeholder.png'} alt={item.product?.name || 'Product'} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.product?.name || 'Unknown Item'}</h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">₹{Number(item.price).toFixed(2)} / unit</p>
                                                    {item.product?.isCustom && (
                                                        <Badge variant="outline" className="text-[9px] h-4 px-1 py-0 border-slate-200 text-slate-400">
                                                            Manual
                                                        </Badge>
                                                    )}
                                                </div>
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
                                                <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-base text-slate-900 dark:text-white">Total: ₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
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
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Tax (8%)</span>
                        <span>₹{(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-slate-200">
                        <span className="font-bold text-slate-900 dark:text-white">Total</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">₹{(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                </div>
                <Link href="/customer/payment">
                    <Button className="w-full h-14 text-lg font-bold bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white shadow-xl" disabled={!cart || !cart.items || cart.items.length === 0}>
                        Checkout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
