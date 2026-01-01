
import React from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center">
      <div className="w-full max-w-[480px] bg-white dark:bg-slate-950 min-h-screen shadow-2xl overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
