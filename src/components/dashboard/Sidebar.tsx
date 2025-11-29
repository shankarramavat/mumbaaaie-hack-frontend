"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    TrendingUp,
    BarChart3,
    Bot,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Predictions", href: "/dashboard/predictions", icon: TrendingUp },
    { name: "Analysis", href: "/dashboard/analysis", icon: BarChart3 },
    { name: "Algo Trading", href: "/dashboard/algo-trading", icon: Bot },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-3 left-3 z-50 lg:hidden bg-slate-900 border border-slate-800 h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed left-0 top-0 z-40 h-full w-72 sm:w-80 lg:w-64 bg-slate-900 border-r border-slate-800 p-4 sm:p-6 transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center gap-2 mb-6 sm:mb-8 pt-12 lg:pt-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-white">Marketwise</span>
                </div>

                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5 sm:py-4 rounded-lg transition-colors text-base sm:text-lg lg:text-base",
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white active:bg-slate-700"
                                )}
                            >
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 flex-shrink-0" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-6 sm:mt-8 p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Market Status</span>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </div>
                    <div className="text-xs text-slate-500">Live Trading</div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full mt-4 sm:mt-6 text-slate-400 hover:text-white hover:bg-slate-800 h-11 sm:h-12 text-base"
                >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Sign Out
                </Button>
            </div>
        </>
    );
}
