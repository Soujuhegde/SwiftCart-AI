"use client";

import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats, Html5QrcodeScannerState } from "html5-qrcode";
import { RefreshCw } from "lucide-react";

interface ScannerProps {
    onScan: (decodedText: string) => void;
    active: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, active }) => {
    const [cameraStatus, setCameraStatus] = useState("Initializing...");

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
                fps: 30, // Increased FPS
                qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                    const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                    // Larger scanning area
                    const size = Math.floor(minEdge * 0.90);
                    return { width: size, height: size };
                },
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true
                },
                aspectRatio: 1.0
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
            }

        } catch (err: unknown) {
            console.error("[Scanner] Init error:", err);
            if (isMounted.current) {
                const msg = (err as Error)?.message || String(err);
                if (/permission|allowed/i.test(msg)) {
                    setCameraStatus("Permission Denied");
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
            <div id={readerId} className="w-full h-full object-cover"></div>
        </div>
    );
};

export default React.memo(Scanner);
