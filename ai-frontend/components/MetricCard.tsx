
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    icon: React.ReactNode;
    iconBgInfo?: "blue" | "indigo" | "orange" | "purple";
}

export function MetricCard({ title, value, change, trend, icon, iconBgInfo = "blue" }: MetricCardProps) {
    const isUp = trend === "up";

    return (
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                <div className={cn(
                    "p-2 rounded-lg",
                    iconBgInfo === "blue" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
                    iconBgInfo === "indigo" && "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30",
                    iconBgInfo === "orange" && "bg-orange-100 text-orange-600 dark:bg-orange-900/30",
                    iconBgInfo === "purple" && "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
                )}>
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                <span className={cn(
                    "inline-flex items-center text-sm font-medium px-2 py-0.5 rounded-full",
                    isUp ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20" : "bg-red-50 text-red-600 dark:bg-red-900/20"
                )}>
                    {isUp ? "+" : ""}{change}
                </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">vs. yesterday</p>
        </div>
    );
}
