"use client";

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-azure-blue text-white p-1.5 rounded-lg">
                        <ShoppingBag size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-azure-blue transition-colors">
                        SwiftCart AI
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="#features" className="hover:text-azure-blue transition-colors">Our Features</Link>
                    <Link href="#agentic-loop" className="hover:text-azure-blue transition-colors">Agentic Loop</Link>
                    <Link href="#shoppers" className="hover:text-azure-blue transition-colors">For Shoppers</Link>
                    <Link href="#azure" className="hover:text-azure-blue transition-colors">Built on Azure</Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6">
                    <Link href="#" className="hidden md:block text-sm font-medium text-gray-600 hover:text-azure-blue">
                        Shopper App
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-azure-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Retailer Dashboard
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
