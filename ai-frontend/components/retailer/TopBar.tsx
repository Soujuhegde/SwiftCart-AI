"use client";

import { Bell, Search, Menu, ChevronDown, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TopBar = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
            {/* Left: Store Selector */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={20} />
                </Button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Store size={16} className="text-gray-500" />
                    <div>
                        <span className="block text-xs text-gray-400 font-medium leading-none mb-0.5">Store Location</span>
                        <span className="block text-sm font-bold text-gray-900 leading-none">Downtown Branch</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 ml-2" />
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Systems Operational
                </div>
            </div>

            {/* Center: Search (Optional) */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
                <div className="relative w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search session ID, item, or staff..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                        <Bell size={20} />
                    </Button>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </div>

                <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <span className="block text-sm font-bold text-gray-900 leading-none">Sarah Jenkins</span>
                        <span className="block text-xs text-gray-500 mt-0.5">Store Manager</span>
                    </div>
                    <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
