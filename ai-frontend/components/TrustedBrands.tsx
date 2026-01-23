"use client";

import { motion } from "framer-motion";

const BRANDS = [
    { name: "SuperMart", style: "font-black tracking-tighter" },
    { name: "Fresh&Go", style: "font-serif font-bold italic" },
    { name: "QUICK.", style: "font-semibold tracking-wide" },
    { name: "EIN", style: "font-bold tracking-tight uppercase" },
    { name: "revival", style: "font-serif font-medium lowercase tracking-wide" },
    { name: "CARIUMA", style: "font-bold tracking-widest uppercase" },
    { name: "JOMAS", style: "font-semibold tracking-wide uppercase" },
];

export default function TrustedBrands() {
    return (
        <div className="w-full overflow-hidden mask-fade-sides relative flex">
            <style jsx global>{`
                .mask-fade-sides {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>

            {/* Animated Container */}
            <motion.div
                className="flex items-center w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 40, // Slower for better readability
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* First Set */}
                <div className="flex w-max">
                    {BRANDS.map((brand, i) => (
                        <div key={`a-${i}`} className="flex items-center px-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                            <span className={`text-lg text-slate-600 whitespace-nowrap ${brand.style}`}>
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Second Set (Duplicate for smooth loop) */}
                <div className="flex w-max">
                    {BRANDS.map((brand, i) => (
                        <div key={`b-${i}`} className="flex items-center px-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                            <span className={`text-lg text-slate-600 whitespace-nowrap ${brand.style}`}>
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
