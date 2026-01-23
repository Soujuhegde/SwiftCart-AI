"use client";

import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-20 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-[95%] 2xl:max-w-screen-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 lg:mb-24">

                    {/* Brand Block (Cols 1-4) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 max-w-sm">
                        <div className="text-2xl font-black text-slate-900 mb-6 tracking-tighter">SwiftCart AI</div>
                        <p className="text-slate-500 mb-8 leading-relaxed text-lg font-medium">
                            The future of checkout is here.<br />
                            Zero lines. Zero hardware. 100% efficient.
                        </p>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                                <ShieldCheck size={18} className="text-blue-600" />
                                <span>SOC 2 Type II Compliant</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                                <CheckCircle2 size={18} className="text-green-600" />
                                <span>99.99% Uptime SLA</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Block (Cols 5-9) */}
                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-slate-900 mb-6 text-base uppercase tracking-wider text-xs">Product</h4>
                        <ul className="space-y-4 text-slate-500 font-medium text-base">
                            <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a></li>
                            <li><a href="/retailer/dashboard" className="hover:text-blue-600 transition-colors">Retailer Dashboard</a></li>
                            <li><a href="/customer/scan" className="hover:text-blue-600 transition-colors">Shopper App</a></li>
                            <li><a href="/retailer/dashboard" className="hover:text-blue-600 transition-colors">Live Pricing</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-slate-900 mb-6 text-base uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-slate-500 font-medium text-base">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Press</a></li>
                            <li><a href="mailto:hello@swiftcart.ai" className="hover:text-blue-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* CTA Block (Cols 10-12) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-slate-50 rounded-3xl p-8 border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-3 text-lg">Ready to transform your store?</h4>
                        <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">
                            Join forward-thinking retailers deploying SwiftCart today.
                        </p>

                        <a href="/demo">
                            <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 mb-6 hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                                Book a Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>

                        <div className="flex flex-wrap gap-4 justify-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <span>15-min Demo</span>
                            <span className="text-slate-300">•</span>
                            <span>No Hardware</span>
                            <span className="text-slate-300">•</span>
                            <span>Launch in 7 Days</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-400">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        <span>&copy; {new Date().getFullYear()} SwiftCart AI. All rights reserved.</span>
                        <div className="hidden md:block w-px h-4 bg-slate-200"></div>
                        <a href="mailto:swiftcart.noreply@gmail.com" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                            <Mail size={14} /> swiftcart.noreply@gmail.com
                        </a>
                    </div>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
