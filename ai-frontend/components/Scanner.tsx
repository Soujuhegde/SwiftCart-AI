"use client";

import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats, Html5QrcodeScannerState } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { RefreshCw, Camera } from "lucide-react";
import { toast } from "sonner";

interface ScannerProps {
    onScan: (decodedText: string) => void;
    active: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, active }) => {
    const [cameraStatus, setCameraStatus] = useState("Initializing...");
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [lastDetected, setLastDetected] = useState<string | null>(null);

    // Unique ID for the reader element
    const [readerId] = useState(() => `reader-${Math.random().toString(36).substring(2, 9)}`);

    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const scannerLock = useRef(false);
    const isMounted = useRef(true);

    const onScanRef = useRef(onScan);
    useEffect(() => {
        onScanRef.current = onScan;
    }, [onScan]);

    const safeStop = async () => {
        if (!html5QrCodeRef.current) return;
        try {
            const state = html5QrCodeRef.current.getState();
            if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
                await html5QrCodeRef.current.stop();
            }
            html5QrCodeRef.current.clear();
        } catch (e) {
            console.warn("[Scanner] Stop warning:", e);
        } finally {
            html5QrCodeRef.current = null;
        }
    };

    const initScanner = async () => {
        if (!active || !isMounted.current || scannerLock.current) return;

        scannerLock.current = true;
        setCameraStatus("Starting...");
        setErrorMsg(null);

        try {
            // Wait for DOM
            let element = document.getElementById(readerId);
            for (let i = 0; i < 10 && !element; i++) {
                await new Promise(r => setTimeout(r, 100));
                element = document.getElementById(readerId);
            }
            if (!element) throw new Error("Scanner container not found in DOM");

            await safeStop();

            const scanner = new Html5Qrcode(readerId, {
                verbose: false,
                formatsToSupport: [
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.UPC_E,
                    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
                    Html5QrcodeSupportedFormats.CODE_128,
                    Html5QrcodeSupportedFormats.CODE_39,
                    Html5QrcodeSupportedFormats.CODE_93,
                    Html5QrcodeSupportedFormats.ITF,
                    Html5QrcodeSupportedFormats.QR_CODE
                ]
            });

            html5QrCodeRef.current = scanner;

            const devices = await Html5Qrcode.getCameras().catch(e => {
                throw new Error("No cameras found or access denied");
            });

            if (!devices || devices.length === 0) {
                throw new Error("No cameras detected on this device");
            }

            // Prefer back camera
            const backCam = devices.find(d =>
                /back|rear|environment|main/i.test(d.label)
            );

            const config = {
                fps: 25,
                qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                    const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                    const size = Math.floor(minEdge * 0.85);
                    return { width: size, height: size };
                }
            };

            console.log(`[Scanner] Starting with config:`, config);

            // Use simplified constraints: facingMode environment is usually enough
            // If we have a specific back camera ID, we can try to use it
            const cameraIdOrConfig = backCam ? { deviceId: backCam.id } : { facingMode: "environment" };

            await scanner.start(
                cameraIdOrConfig,
                config,
                (decodedText) => {
                    console.log(`[Scanner] DETECTED: ${decodedText}`);
                    setLastDetected(decodedText);
                    if (onScanRef.current) onScanRef.current(decodedText);
                },
                (errorMessage) => {
                    // Frame scan failed - frequent and normal
                }
            );

            if (isMounted.current) {
                setCameraStatus("Active");
                setPermissionDenied(false);
            }

        } catch (err: any) {
            console.error("[Scanner] Init error:", err);
            if (isMounted.current) {
                const msg = err?.message || String(err);
                if (/permission|allowed/i.test(msg)) {
                    setCameraStatus("Permission Denied");
                    setPermissionDenied(true);
                } else {
                    setCameraStatus("Error");
                    setErrorMsg(msg);
                }
            }
        } finally {
            scannerLock.current = false;
        }
    };

    useEffect(() => {
        isMounted.current = true;
        if (active) initScanner();
        return () => {
            isMounted.current = false;
            safeStop();
        };
    }, [active, readerId]);

    return (
        <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            <div id={readerId} className="w-full h-full"></div>

            {/* Overlay UI */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                {/* Viewfinder helper */}
                <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>

                    {/* Scanning Laser Line Animation */}
                    <div className="absolute top-0 left-4 right-4 h-0.5 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-3 pointer-events-auto">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                        <div className={`w-2 h-2 rounded-full ${cameraStatus === 'Active' ? 'bg-blue-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                        <span className="text-white text-xs font-bold tracking-tight uppercase">{cameraStatus}</span>
                        {cameraStatus === 'Error' && (
                            <button onClick={initScanner} className="ml-2 bg-white/10 hover:bg-white/20 p-1 rounded-full text-white">
                                <RefreshCw size={14} />
                            </button>
                        )}
                    </div>

                    {lastDetected && (
                        <div className="bg-blue-600/90 text-white text-[10px] px-3 py-1 rounded-full font-medium">
                            Last code: {lastDetected}
                        </div>
                    )}

                    {errorMsg && (
                        <div className="bg-red-500/90 text-white text-[10px] p-2 rounded-lg max-w-[200px] text-center border border-red-400">
                            {errorMsg}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0%, 100% { top: 5%; opacity: 0.3; }
                    50% { top: 95%; opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default React.memo(Scanner);
