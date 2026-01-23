"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
            <motion.nav
                layout
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    opacity: 1,
                    width: isScrolled ? "auto" : "100%",
                    borderRadius: isScrolled ? "9999px" : "0px",
                    y: isScrolled ? 10 : 0,
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                className={`pointer-events-auto backdrop-blur-md transition-all duration-300 ease-in-out
                    ${isScrolled
                        ? "bg-white/95 shadow-2xl shadow-blue-900/10 border border-slate-200/60 px-2 py-2"
                        : "bg-white/80 border-b border-gray-100 w-full px-6 py-4"
                    }`}
            >
                <div className="flex items-center justify-between gap-8 md:gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group px-2">
                        <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="SwiftCart"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <motion.span
                            animate={{
                                width: isScrolled ? 0 : "auto",
                                opacity: isScrolled ? 0 : 1,
                                marginLeft: isScrolled ? 0 : 4
                            }}
                            className="text-3xl font-bold text-slate-900 tracking-tight overflow-hidden whitespace-nowrap"
                        >
                            SwiftCart
                        </motion.span>
                    </Link>

                    {/* Navigation Links - Centered in Pill */}
                    <div className="hidden md:flex items-center gap-8 text-base font-bold text-slate-600">
                        <Link href="#retailer-benefits" className="hover:text-blue-600 transition-colors">Retailers</Link>
                        <Link href="#shoppers" className="hover:text-blue-600 transition-colors">Shoppers</Link>
                        <Link href="/demo" className="hover:text-blue-600 transition-colors text-blue-600">Live Demo</Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/customer/scan"
                            >
                                <motion.div
                                    layout
                                    className={`bg-white text-blue-600 border border-blue-200 font-bold transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 flex items-center justify-center whitespace-nowrap
                                        ${isScrolled ? "h-11 px-6 text-sm rounded-full" : "h-14 px-10 text-lg rounded-xl"}
                                    `}
                                >
                                    Scan Here
                                </motion.div>
                            </Link>

                            <Link
                                href="/retailer/dashboard"
                            >
                                <motion.div
                                    layout
                                    className={`bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 active:scale-95 flex items-center justify-center whitespace-nowrap
                                        ${isScrolled ? "h-11 px-6 text-sm rounded-full" : "h-14 px-10 text-lg rounded-xl"}
                                    `}
                                >
                                    Retailer Dashboard
                                </motion.div>
                            </Link>
                        </div>
                        <Link
                            href="/customer/scan"
                            className={`md:hidden bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 flex items-center justify-center whitespace-nowrap
                                 ${isScrolled ? "h-10 px-6 text-sm rounded-full" : "h-14 px-8 text-lg rounded-xl"}
                             `}
                        >
                            Scan Here
                        </Link>
                    </div>
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
