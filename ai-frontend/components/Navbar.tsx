"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                width: isScrolled ? "90%" : "100%",
                borderRadius: isScrolled ? "9999px" : "0px",
                top: isScrolled ? "1rem" : "0px",
            }}
            transition={{ duration: 0.6, ease: "easeOut", layout: { duration: 0.3 } }}
            className={`sticky z-50 backdrop-blur-md transition-all duration-300 ease-in-out mx-auto
                ${isScrolled
                    ? "bg-white/90 shadow-xl border border-gray-200/50 max-w-5xl"
                    : "bg-white/80 border-b border-gray-100 max-w-full"
                }`}
        >
            <div className={`mx-auto h-24 flex items-center justify-between px-8 duration-300 ${isScrolled ? 'max-w-5xl' : 'max-w-7xl'}`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group">
                    <Image
                        src="/logo.png"
                        alt="SwiftCart"
                        width={200}
                        height={60}
                        className="object-contain h-16 w-auto"
                        priority
                    />
                    <motion.span
                        animate={{
                            width: isScrolled ? 0 : "auto",
                            opacity: isScrolled ? 0 : 1,
                            marginLeft: isScrolled ? 0 : 16
                        }}
                        className="text-3xl font-bold text-slate-900 tracking-tight overflow-hidden whitespace-nowrap"
                    >
                        SwiftCart
                    </motion.span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-12 text-lg font-medium text-gray-600">
                    <Link href="#retailer-benefits" className="hover:text-blue-600 transition-colors">Retailers</Link>
                    <Link href="#shoppers" className="hover:text-blue-600 transition-colors">Shoppers</Link>
                    <Link href="/demo" className="hover:text-blue-600 transition-colors">Live Demo</Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-10">
                    <Link href="/customer/scan" className="hidden md:block text-lg font-medium text-gray-600 hover:text-blue-600">
                        Try Web App
                    </Link>
                    <Link
                        href="/customer/scan"
                        className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Try Web App
                    </Link>
                    <Link
                        href="/retailer/dashboard"
                        className="hidden md:block bg-blue-600 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Retailer Dashboard
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
