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

    // Memoize the success handler to keep it stable
    const onScanSuccess = React.useCallback(async (rawText: string) => {
        const decodedText = rawText.trim();
        // Use ref for immediate blocking to prevent race conditions
        if (processingRef.current) return;

        console.log(`Scan result: ${decodedText}`);

        // Lock processing
        processingRef.current = true;
        // Optional: Update UI scan state if needed, but don't trigger re-mount
        setIsScanning(false);

        // Vibrate if supported
        if (navigator.vibrate) navigator.vibrate(200);

        try {
            // Show feedback
            toast.loading("Processing...", { id: "scan-toast" });

            // Call API
            const data = await scanProduct(decodedText);

            if (data.success) {
                toast.success(`Added ${data.product.name}`, { id: "scan-toast" });
                // We use the function form of refreshCart if available, or just call it.
                // Assuming refreshCart is stable from context
                await refreshCart();
            } else {
                toast.error("Failed to add product", { id: "scan-toast" });
            }

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.log("Product not found");
                toast.error("Product not found in database or global registry.", {
                    id: "scan-toast",
                    action: {
                        label: "Try Manual",
                        onClick: () => setShowManualInput(true)
                    }
                });
            } else {
                console.error("Scan failed:", error);
                toast.error(error.response?.data?.error || "Scan failed", { id: "scan-toast" });
            }
        } finally {
            // Delay before allowing next scan
            setTimeout(() => {
                processingRef.current = false;
                setIsScanning(true);
            }, 2000);
        }
    }, [refreshCart, scanProduct]); // Dependencies for the callback

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

    // Use a ref to track the scanner instance across renders
    const html5QrCodeRef = React.useRef<Html5Qrcode | null>(null);
    // Lock to prevent race conditions between start and stop
    const scannerLock = React.useRef(false);

    React.useEffect(() => {
        let isMounted = true;
        let isInitializing = false;

        const safeStop = async () => {
            if (!html5QrCodeRef.current) return;
            try {
                // We always try to clear first as it's less prone to state errors than stop()
                // But Html5Qrcode recommends stop() then clear()
                if ((html5QrCodeRef.current as any).isScanning) {
                    await html5QrCodeRef.current.stop();
                }
                html5QrCodeRef.current.clear();
            } catch (e: any) {
                // Ignore "not running" errors which are common
                const msg = e?.message || e?.toString() || "";
                if (!msg.includes("not running") && !msg.includes("not being used")) {
                    console.warn("Scanner stop error:", e);
                }
            }
        };

        const initScanner = async () => {
            if (isInitializing) return;
            if (scannerLock.current) {
                // already doing something, wait? or just abort
                return;
            }

            scannerLock.current = true;
            isInitializing = true;

            if (typeof window !== "undefined" && !window.isSecureContext) {
                setCameraStatus("Error: Not Secure Context (HTTPS required)");
                scannerLock.current = false;
                isInitializing = false;
                return;
            }

            // If manual input is showing, we pause/stop camera if it was running
            if (showManualInput) {
                await safeStop();
                scannerLock.current = false;
                isInitializing = false;
                return;
            }

            // wait slightly for DOM to be ready
            await new Promise(r => setTimeout(r, 500));
            if (!isMounted) {
                scannerLock.current = false;
                isInitializing = false;
                return;
            }

            const element = document.getElementById("reader");
            if (!element) {
                scannerLock.current = false;
                isInitializing = false;
                return;
            }

            // Clean up previous instance if it exists
            await safeStop();

            try {
                const html5QrCode = new Html5Qrcode("reader", {
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.EAN_13,
                        Html5QrcodeSupportedFormats.EAN_8,
                        Html5QrcodeSupportedFormats.UPC_A,
                        Html5QrcodeSupportedFormats.UPC_E,
                        Html5QrcodeSupportedFormats.CODE_128,
                        Html5QrcodeSupportedFormats.CODE_39,
                        Html5QrcodeSupportedFormats.QR_CODE
                    ],
                    verbose: false
                });

                html5QrCodeRef.current = html5QrCode;

                const devices = await Html5Qrcode.getCameras().catch(e => {
                    throw e;
                });

                if (!devices || !devices.length) {
                    throw new Error("No cameras found");
                }

                const config = {
                    fps: 10,
                    aspectRatio: 1.0,
                    qrbox: { width: 250, height: 250 }
                };

                setCameraStatus("Starting Camera...");

                // Try to find a back camera
                const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('environment'));
                const cameraIdOrConfig = backCamera ? { deviceId: backCamera.id } : { facingMode: "environment" };

                if (!isMounted) throw new Error("Unmounted during start");

                await html5QrCode.start(
                    cameraIdOrConfig,
                    config,
                    (decodedText) => {
                        if (isMounted && onScanSuccessRef.current) {
                            onScanSuccessRef.current(decodedText);
                        }
                    },
                    (errorMessage) => {
                        // ignore errors to reduce noise
                    }
                );

                if (isMounted) {
                    setHasCameraPermission(true);
                    setCameraStatus("Active");
                }
            } catch (err: any) {
                console.error("Scanner Error:", err);
                const msg = err?.message || "Unknown error";
                // Don't show error if we just replaced it/interrupted
                if (msg.includes("already under transition")) {
                    // ignore, we will retry or it's fine
                } else if (isMounted) {
                    setHasCameraPermission(false);
                    setCameraStatus("Error: " + msg);
                }
            } finally {
                scannerLock.current = false;
                isInitializing = false;
            }
        };

        // Start initialization
        initScanner();

        // Cleanup
        return () => {
            isMounted = false;
            // Cleanup on unmount
            // We can't await here, so we fire and forget, but the lock should help
            if (html5QrCodeRef.current) {
                const instance = html5QrCodeRef.current;
                // Mark as busy so new effects wait
                scannerLock.current = true;
                // Attempt stop
                instance.stop().then(() => instance.clear()).catch(e => {
                    // ignore common stop errors on unmount
                }).finally(() => {
                    scannerLock.current = false;
                });
            }
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
