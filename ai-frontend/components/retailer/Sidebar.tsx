"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Activity,
    AlertTriangle,
    Package,
    FileText,
    Users,
    Settings,
} from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/retailer/dashboard", icon: LayoutDashboard },
    { label: "Inventory", href: "/retailer/inventory", icon: Package },
    { label: "Demand Forecast", href: "/retailer/demand-forecast", icon: Activity },
    { label: "AI Intelligence", href: "/retailer/ai-intelligence", icon: AlertTriangle },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20 text-slate-300">
            <Link href="/" className="p-6 block hover:opacity-100 transition-opacity opacity-90">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="SwiftCart"
                        width={140}
                        height={40}
                        className="object-contain h-10 w-auto"
                        priority
                    />
                    <span className="text-xl font-bold text-white tracking-tight">SwiftCart</span>
                </div>
                <p className="text-xs text-slate-500 font-medium pl-1 mt-1">Retail Ops</p>
            </Link>

            <div className="px-6 py-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Main Menu</p>
            </div>

            <nav className="flex-1 px-4 py-2 flex flex-col gap-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 bg-slate-950/50 mt-auto m-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">System Status</span>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>API Latency</span>
                        <span className="text-blue-500">45ms</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Payment Gateway</span>
                        <span className="text-blue-500">Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
