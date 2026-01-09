
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    Receipt,
    Settings,
    BarChart3,
    ShoppingBag,
    LogOut
} from "lucide-react";
import Image from "next/image";
import { useDemo } from "@/providers/DemoProvider";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/retailer/dashboard", icon: LayoutDashboard },
    { label: "Inventory", href: "/retailer/inventory", icon: Package },
    { label: "AI Intelligence", href: "/retailer/ai-intelligence", icon: BarChart3 },
    { label: "Demand Forecast", href: "/retailer/demand-forecast", icon: ShoppingBag },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useDemo();

    return (
        <aside className="w-64 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 z-20">
            <Link href="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Image
                    src="/logo.png"
                    alt="SwiftCart AI Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
                <div>
                    <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white">SwiftCart AI</h1>
                    <p className="text-xs text-slate-500">Retail Intelligence</p>
                </div>
            </Link>

            <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600/10 text-blue-600"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={isActive ? "fill-current" : ""} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <Link href="/retailer/profile" className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 p-2 rounded-lg transition-colors mb-2">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${user.avatar}')` }}></div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.branch}</p>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
