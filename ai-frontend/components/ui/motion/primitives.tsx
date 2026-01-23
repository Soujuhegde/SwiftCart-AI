"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// --- Configuration ---
const DEFAULT_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]; // Tildei-style soft out
const DURATION = 0.8;

// --- Variants ---
export const revealVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: DURATION, ease: DEFAULT_EASE }
    }
};

export const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

// --- Components ---

interface Props {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function SectionReveal({ children, className, delay = 0 }: Props) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DURATION, delay, ease: DEFAULT_EASE }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerGrid({ children, className }: Props) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({ children, className }: Props) {
    return (
        <motion.div variants={revealVariants} className={className}>
            {children}
        </motion.div>
    );
}

interface HoverCardProps extends Props {
    glowColor?: "blue" | "violet" | "indigo";
}

export function HoverCard({ children, className, glowColor = "blue" }: HoverCardProps) {
    const glowColors = {
        blue: "group-hover:shadow-blue-500/20 group-hover:border-blue-200",
        violet: "group-hover:shadow-violet-500/20 group-hover:border-violet-200",
        indigo: "group-hover:shadow-indigo-500/20 group-hover:border-indigo-200"
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "group relative overflow-hidden transition-colors duration-300",
                glowColors[glowColor],
                className
            )}
        >
            {/* Sheen Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

export function LivePulse({ color = "blue", size = "sm" }: { color?: "blue" | "violet", size?: "sm" | "md" }) {
    const colorClass = color === "blue" ? "bg-blue-500" : "bg-violet-500";
    const sizeClass = size === "sm" ? "w-2 h-2" : "w-3 h-3";

    return (
        <span className="relative flex h-3 w-3 items-center justify-center">
            <span className={cn(`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping`, colorClass)}></span>
            <span className={cn(`relative inline-flex rounded-full`, sizeClass, colorClass)}></span>
        </span>
    );
}
