
import React from 'react';
import { Sidebar } from '@/components/retailer/Sidebar';

export default function RetailerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header can go here if distinct from sidebar */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
