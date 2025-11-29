"use client";

import { Search, Bell, User as UserIcon, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import QuickTradeModal from "@/components/trading/QuickTradeModal";

export default function Header() {
    const [showQuickTrade, setShowQuickTrade] = useState(false);

    return (
        <>
            <div className="bg-slate-900 border-b border-slate-800 px-4 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Search - Hidden on mobile, shown on tablet+ */}
                    <div className="hidden md:

block relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Search stocks, strategies..."
                            className="pl-10 bg-slate-950 border-slate-700 focus:border-indigo-500"
                        />
                    </div>

                    {/* Quick Trade Button - Always visible */}
                    <Button
                        onClick={() => setShowQuickTrade(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 flex-shrink-0"
                        size="sm"
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Quick Trade</span>
                    </Button>

                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                                3
                            </Badge>
                        </Button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-950/50 border border-slate-800">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden lg:block">
                                <div className="text-sm font-medium text-white">Trader</div>
                                <div className="text-xs text-slate-400">Pro Account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <QuickTradeModal
                open={showQuickTrade}
                onOpenChange={setShowQuickTrade}
                stock={{ symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2980.5 }}
            />
        </>
    );
}
