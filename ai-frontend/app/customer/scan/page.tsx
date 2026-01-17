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
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

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
    const [scanStats, setScanStats] = React.useState({ count: 0, lastValue: "", lastError: "" });
    const [showDebug, setShowDebug] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const requestRef = React.useRef<number | undefined>(undefined);
    const processingRef = React.useRef(false);

    // Buffer for hardware scanner input
    const scannerBuffer = React.useRef("");
    const lastKeyTime = React.useRef(0);

    // Focus input when shown and keep it focused
    React.useEffect(() => {
        if (showManualInput && inputRef.current) {
            inputRef.current.focus();

            // Re-focus helper if focus is lost (e.g. accidental click outside)
            const handleBlur = () => {
                if (showManualInput) {
                    setTimeout(() => inputRef.current?.focus(), 100);
                }
            };

            const currentInput = inputRef.current;
            currentInput.addEventListener('blur', handleBlur);
            return () => currentInput.removeEventListener('blur', handleBlur);
        }
    }, [showManualInput]);

    // Memoize the success handler to keep it stable
    const onScanSuccess = React.useCallback(async (rawText: string) => {
        const decodedText = rawText.trim();
        // Use ref for immediate blocking to prevent race conditions
        if (processingRef.current) return;

        console.log(`Scan result: ${decodedText}`);

        // Lock processing
        processingRef.current = true;

        // Vibrate if supported
        if (navigator.vibrate) navigator.vibrate(200);

        try {
            // Show feedback
            toast.loading("Finding product...", { id: "scan-toast" });

            // Call API
            const data = await scanProduct(decodedText);

            if (data.success) {
                toast.success(`Added ${data.product.name}`, { id: "scan-toast" });
                setScanStats(prev => ({ ...prev, count: prev.count + 1 }));
                await refreshCart();
            } else {
                toast.error(data.error || "Failed to add product", { id: "scan-toast" });
            }

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                toast.error(`Product "${decodedText}" not found`, {
                    id: "scan-toast",
                    action: {
                        label: "Manual Add",
                        onClick: () => setShowManualInput(true)
                    }
                });
            } else {
                console.error("Scan failed:", error);
                const errorMsg = error.response?.data?.details || error.response?.data?.error || "Connection error";
                toast.error(errorMsg, { id: "scan-toast" });
                setScanStats(prev => ({ ...prev, lastError: errorMsg }));
            }
        } finally {
            // Smaller delay for faster scanning - reduced to 400ms for "instant" feel
            setTimeout(() => {
                processingRef.current = false;
            }, 400);

            // Sync with React state for debug view
            setScanStats(prev => ({ ...prev, lastValue: decodedText }));
        }
    }, [refreshCart, setShowManualInput]); // scanProduct is imported, no need for dependency if it's external config

    const [isProcessingManual, setIsProcessingManual] = React.useState(false);

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = manualBarcode.trim();
        if (!code || isProcessingManual) return;

        setIsProcessingManual(true);
        try {
            await onScanSuccess(code);
            // If onScanSuccess succeeds (it doesn't throw, just shows toasts), we clear
            setManualBarcode("");
            setShowManualInput(false);
        } catch (error) {
            console.error("Manual submit error:", error);
            toast.error("Failed to process manual entry");
        } finally {
            setIsProcessingManual(false);
        }
    };

    // Global keyboard listener for hardware scanners
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore events if user is typing in the manual input field or any other input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const now = Date.now();
            // Hardware scanners usually type very fast (< 50ms between keys)
            // If it's been a while, clear the buffer
            if (now - lastKeyTime.current > 100) {
                scannerBuffer.current = "";
            }
            lastKeyTime.current = now;

            // Handle Enter (common scanner suffix)
            if (e.key === 'Enter') {
                if (scannerBuffer.current.length >= 8) {
                    console.log("Hardware scanner detected:", scannerBuffer.current);
                    onScanSuccess(scannerBuffer.current);
                    scannerBuffer.current = "";
                }
            } else if (e.key.length === 1) {
                // Add character to buffer
                scannerBuffer.current += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onScanSuccess]);
    // Keep a ref to the latest callback to avoid restarting scanner when dependencies change
    const onScanSuccessRef = React.useRef(onScanSuccess);
    React.useEffect(() => {
        onScanSuccessRef.current = onScanSuccess;
    }, [onScanSuccess]);

    const [logs, setLogs] = React.useState<string[]>([]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${msg}`]);
        console.log(msg);
    };

    // Use refs to track scanner state accurately across renders
    const html5QrCodeRef = React.useRef<Html5Qrcode | null>(null);
    const isStartingRef = React.useRef(false);
    const isScanningRef = React.useRef(false);

    React.useEffect(() => {
        let isMounted = true;

        const safeStop = async () => {
            if (!html5QrCodeRef.current) return;

            if (isScanningRef.current) {
                try {
                    console.log("Stopping scanner...");
                    await html5QrCodeRef.current.stop();
                    console.log("Scanner stopped.");
                } catch (e: any) {
                    console.warn("Scanner stop error:", e);
                } finally {
                    isScanningRef.current = false;
                }
            }

            try {
                html5QrCodeRef.current.clear();
            } catch (e) {
                // ignore clear errors
            }
        };

        const initScanner = async () => {
            if (isStartingRef.current || isScanningRef.current) return;

            if (showManualInput) {
                await safeStop();
                return;
            }

            isStartingRef.current = true;
            setCameraStatus("Initializing...");

            try {
                // Wait for DOM
                await new Promise(r => setTimeout(r, 400));
                if (!isMounted || showManualInput) throw new Error("Cancelled");

                const element = document.getElementById("reader");
                if (!element) throw new Error("Reader element not found");

                if (!html5QrCodeRef.current) {
                    html5QrCodeRef.current = new Html5Qrcode("reader", {
                        formatsToSupport: [
                            Html5QrcodeSupportedFormats.EAN_13,
                            Html5QrcodeSupportedFormats.EAN_8,
                            Html5QrcodeSupportedFormats.UPC_A,
                            Html5QrcodeSupportedFormats.UPC_E,
                            Html5QrcodeSupportedFormats.CODE_128,
                            Html5QrcodeSupportedFormats.QR_CODE
                        ],
                        verbose: false
                    });
                }

                const devices = await Html5Qrcode.getCameras();
                if (!devices || devices.length === 0) throw new Error("No cameras found");

                const backCamera = devices.find(d =>
                    d.label.toLowerCase().includes('back') ||
                    d.label.toLowerCase().includes('environment')
                );
                // Increased FPS to 20 and qrbox to 300x300 for higher sensitivity
                const config = { fps: 20, aspectRatio: 1.0, qrbox: { width: 300, height: 300 } };

                await html5QrCodeRef.current.start(
                    backCamera ? { deviceId: backCamera.id } : { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        if (isMounted && onScanSuccessRef.current) {
                            onScanSuccessRef.current(decodedText);
                        }
                    },
                    () => { }
                );

                if (isMounted) {
                    isScanningRef.current = true;
                    setHasCameraPermission(true);
                    setCameraStatus("Active");
                } else {
                    await safeStop();
                }
            } catch (err: any) {
                if (err.message !== "Cancelled") {
                    console.error("Scanner start error:", err);
                    if (isMounted) {
                        setHasCameraPermission(false);
                        setCameraStatus(`Error: ${err.message}`);
                    }
                }
            } finally {
                isStartingRef.current = false;
            }
        };

        initScanner();

        return () => {
            isMounted = false;
            safeStop();
        };
    }, [showManualInput]);

    // Debug logging
    React.useEffect(() => {
        if (cart) {
            // console.log("Cart State:", cart);
        }
    }, [cart]);

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 pb-0">
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

            <main className="flex-1 overflow-y-auto p-5 space-y-6 pb-48">
                {/* Scanner Viewfinder / Manual Input Area */}
                <div className="relative w-full overflow-hidden shadow-lg group rounded-xl bg-black h-72 sm:h-80">

                    {!showManualInput ? (
                        <>
                            <div id="reader" className="absolute inset-0 w-full h-full object-cover"></div>

                            {/* Scanner Overlay UI */}
                            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
                                {/* Full screen indicator */}
                                <div className="absolute inset-4 border-2 border-white/20 rounded-xl"></div>
                                <div className="absolute inset-4 flex items-center justify-center">
                                    <p className="text-white/50 text-xs font-medium uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Scan Anywhere</p>
                                </div>

                                <div className="mt-auto mb-10 flex flex-col items-center gap-2 pointer-events-auto">
                                    <p className="text-white text-sm font-medium drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                        {cameraStatus}
                                    </p>

                                    {cameraStatus.includes("Not Secure") && (
                                        <div className="bg-red-500/80 text-white text-xs p-2 rounded max-w-[200px] text-center">
                                            Browsers block camera on HTTP. Use localhost or enable HTTPS.
                                        </div>
                                    )}

                                    {cameraStatus.includes("Error") && !cameraStatus.includes("Not Secure") && (
                                        <Button size="sm" variant="secondary" onClick={() => window.location.reload()}>
                                            Retry Camera
                                        </Button>
                                    )}

                                </div>
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
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={isProcessingManual}
                                    >
                                        {isProcessingManual ? "Adding..." : "Add Item"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        variant={showManualInput ? "default" : "outline"}
                        size="icon"
                        className={`h-12 w-16 ${showManualInput ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                        onClick={() => setShowManualInput(!showManualInput)}
                    >
                        <Keyboard className={`h-5 w-5 ${showManualInput ? 'text-white' : 'text-slate-500'}`} />
                    </Button>

                    <Button
                        variant={showDebug ? "default" : "outline"}
                        size="icon"
                        className={`h-12 w-16 ${showDebug ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                        onClick={() => setShowDebug(!showDebug)}
                    >
                        <HelpCircle className={`h-5 w-5 ${showDebug ? 'text-white' : 'text-slate-500'}`} />
                    </Button>
                </div>

                {/* Debug Panel */}
                <AnimatePresence>
                    {showDebug && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-mono text-slate-300 space-y-1 mt-2">
                                <div className="flex justify-between border-b border-slate-800 pb-1 mb-1">
                                    <span className="text-orange-400 font-bold uppercase">Scanner Diagnostics</span>
                                    <span className={isScanningRef.current ? "text-green-500" : "text-red-500"}>
                                        ● {isScanningRef.current ? "RUNNING" : "STOPPED"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    <span>Total Scans:</span>
                                    <span className="text-white text-right font-bold">{scanStats.count}</span>

                                    <span>Last Data:</span>
                                    <span className="text-white text-right truncate pl-4">{scanStats.lastValue || 'None'}</span>

                                    <span>Status:</span>
                                    <span className="text-white text-right">{cameraStatus}</span>

                                    <span>Initializing:</span>
                                    <span className="text-white text-right">{isStartingRef.current ? 'YES' : 'NO'}</span>

                                    <span>Ref Lock:</span>
                                    <span className="text-white text-right">{processingRef.current ? 'LOCKED' : 'IDLE'}</span>
                                </div>
                                {scanStats.lastError && (
                                    <div className="mt-2 pt-1 border-t border-slate-800 text-red-400 break-words">
                                        Error: {scanStats.lastError}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Cart Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Cart</h2>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{itemCount} items</Badge>
                    </div>

                    <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                        {(!cart || !cart.items || cart.items.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-10 opacity-50">
                                <ShoppingCart size={48} className="text-slate-300 mb-2" />
                                <p className="text-slate-500 text-sm">Cart is empty</p>
                            </div>
                        )}
                        {cart?.items?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm"
                            >
                                <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                    <img
                                        src={item.product?.imageUrl || item.product?.image || '/placeholder.png'}
                                        alt={item.product?.name || 'Product'}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            console.log("Image failed to load:", item.product?.imageUrl);
                                            e.currentTarget.src = '/placeholder.png';
                                        }}
                                    />
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
                                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-slate-400 font-medium">
                                                ₹{Number(item.price).toFixed(2)} x {item.quantity}
                                            </span>
                                            <span className="font-bold text-base text-slate-900 dark:text-white">
                                                ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
            </div >
        </div >
    );
}
