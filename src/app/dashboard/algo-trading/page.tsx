"use client";

import { useState } from "react";
import {
    Play,
    Pause,
    Plus,
    MoreHorizontal,
    TrendingUp,
    TrendingDown,
    AlertOctagon,
    Zap,
    Clock,
    Bell,
    Briefcase,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { QuickTradeModal, PriceAlertModal, StopLossModal } from "@/components/trading/TradingModals";

// Mock Data
const strategies = [
    {
        id: 1,
        name: "Nifty Momentum Alpha",
        status: "active",
        pl: 12450,
        plPercent: 2.3,
        winRate: 68,
        trades: 24,
        stocks: 15
    },
    {
        id: 2,
        name: "BankNifty Scalper",
        status: "paused",
        pl: -1200,
        plPercent: -0.5,
        winRate: 45,
        trades: 12,
        stocks: 4
    },
    {
        id: 3,
        name: "Mean Reversion V2",
        status: "active",
        pl: 5600,
        plPercent: 1.1,
        winRate: 72,
        trades: 8,
        stocks: 10
    }
];

const liveTrades = [
    { id: 1, time: "10:34:22", symbol: "INFY", type: "BUY", price: 1450.20, qty: 50, pl: 250, status: "Open" },
    { id: 2, time: "10:32:15", symbol: "TCS", type: "SELL", price: 3280.00, qty: 25, pl: -150, status: "Closed" },
    { id: 3, time: "10:15:00", symbol: "RELIANCE", type: "BUY", price: 2980.50, qty: 100, pl: 1200, status: "Open" },
    { id: 4, time: "09:45:30", symbol: "HDFCBANK", type: "SELL", price: 1450.00, qty: 75, pl: 450, status: "Closed" },
    { id: 5, time: "09:30:10", symbol: "SBIN", type: "BUY", price: 750.25, qty: 200, pl: 800, status: "Closed" },
];

export default function AlgoTradingPage() {
    const [activeTab, setActiveTab] = useState("active");
    const [quickTradeOpen, setQuickTradeOpen] = useState(false);
    const [priceAlertOpen, setPriceAlertOpen] = useState(false);
    const [stopLossOpen, setStopLossOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Trading Modals */}
            <QuickTradeModal open={quickTradeOpen} onClose={() => setQuickTradeOpen(false)} />
            <PriceAlertModal open={priceAlertOpen} onClose={() => setPriceAlertOpen(false)} />
            <StopLossModal open={stopLossOpen} onClose={() => setStopLossOpen(false)} />
            {/* Top Command Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Total P&L Today</div>
                        <div className="text-2xl font-mono font-bold text-green-400 flex items-center gap-2">
                            +₹16,850 <span className="text-sm bg-green-500/10 px-2 py-0.5 rounded text-green-400">+2.3%</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-800 hidden md:block"></div>
                    <div className="flex gap-4 text-sm">
                        <div>
                            <span className="text-slate-500">Active Strategies:</span> <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                            <span className="text-slate-500">Total Trades:</span> <span className="text-white font-bold">45</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setQuickTradeOpen(true)}
                    >
                        <Zap className="w-4 h-4 mr-2" /> Quick Trade
                    </Button>
                    <Button
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"
                        onClick={() => setPriceAlertOpen(true)}
                    >
                        <Bell className="w-4 h-4 mr-2" /> Price Alerts
                    </Button>
                    <Button
                        variant="outline"
                        className="border-red-500/30 text-red-500 bg-red-500/10 hover:bg-red-500/20"
                        onClick={() => setStopLossOpen(true)}
                    >
                        <AlertOctagon className="w-4 h-4 mr-2" /> Stop Loss
                    </Button>
                    <Button variant="destructive" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                        <Pause className="w-4 h-4 mr-2" /> PAUSE ALL
                    </Button>
                    <Button className="bg-slate-800 hover:bg-slate-700">
                        <Plus className="w-4 h-4 mr-2" /> New Strategy
                    </Button>
                </div>
            </div>

            {/* Active Strategies Grid */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" /> Active Strategies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strategies.map((strategy) => (
                        <div key={strategy.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white">{strategy.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${strategy.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                        <span className="text-xs text-slate-400 capitalize">{strategy.status}</span>
                                    </div>
                                </div>
                                <Switch checked={strategy.status === 'active'} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-xs text-slate-500">Today's P&L</div>
                                    <div className={`font-mono font-bold ${strategy.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {strategy.pl > 0 ? '+' : ''}₹{strategy.pl}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500">Win Rate</div>
                                    <div className="font-mono font-bold text-white">{strategy.winRate}%</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Performance Target</span>
                                    <span>{strategy.plPercent}% / 5%</span>
                                </div>
                                <Progress value={(strategy.plPercent / 5) * 100} className="h-1.5" />
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                                <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300">
                                    View Report
                                </Button>
                                <Button variant="outline" className="border-slate-700 bg-slate-800 hover:bg-slate-700 px-3">
                                    <Settings className="w-4 h-4 text-slate-400" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Portfolio Holdings */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" /> Portfolio Holdings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">Total Value</div>
                        <div className="text-2xl font-mono font-bold text-white">₹7,32,450</div>
                        <div className="text-xs text-green-400 mt-1">+5.2% Today</div>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">Total P&L</div>
                        <div className="text-2xl font-mono font-bold text-green-400">+₹42,150</div>
                        <div className="text-xs text-slate-400 mt-1">+6.1% Return</div>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">Active Positions</div>
                        <div className="text-2xl font-mono font-bold text-white">12</div>
                        <div className="text-xs text-slate-400 mt-1">8 Long, 4 Short</div>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 mb-1">Today's Trades</div>
                        <div className="text-2xl font-mono font-bold text-white">45</div>
                        <div className="text-xs text-green-400 mt-1">72% Win Rate</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { symbol: "RELIANCE", qty: 100, avgPrice: 2950, current: 2980, pl: 3000 },
                        { symbol: "TCS", qty: 50, avgPrice: 3250, current: 3280, pl: 1500 },
                        { symbol: "INFY", qty: 150, avgPrice: 1420, current: 1450, pl: 4500 }
                    ].map((holding) => (
                        <div key={holding.symbol} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="font-bold text-white">{holding.symbol}</div>
                                    <div className="text-xs text-slate-500">{holding.qty} shares</div>
                                </div>
                                <div className={`text-right font-mono text-sm font-bold ${holding.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {holding.pl > 0 ? '+' : ''}₹{holding.pl}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Avg: ₹{holding.avgPrice}</span>
                                <span>LTP: ₹{holding.current}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk Management Controls */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-red-500" /> Risk Management Controls
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-slate-400">Trailing Stop Loss</label>
                            <span className="text-sm font-mono font-bold text-white">1.5%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                        <p className="text-xs text-slate-500">Dynamic SL adjusts as price moves in favor.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-slate-400">Max Drawdown Limit</label>
                            <span className="text-sm font-mono font-bold text-red-400">₹5,000</span>
                        </div>
                        <Progress value={45} className="h-2 bg-slate-800" indicatorClassName="bg-red-500" />
                        <p className="text-xs text-slate-500">System auto-pauses if daily loss exceeds limit.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-slate-400">Position Sizing</label>
                            <span className="text-sm font-mono font-bold text-blue-400">Max 10%</span>
                        </div>
                        <Progress value={10} className="h-2 bg-slate-800" indicatorClassName="bg-blue-500" />
                        <p className="text-xs text-slate-500">Maximum capital allocation per single trade.</p>
                    </div>
                </div>
            </div>

            {/* Live Trade Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" /> Live Execution Feed
                    </h2>
                    <div className="flex gap-2">
                        {["Active Trades", "Completed", "Pending"].map((tab) => (
                            <Button
                                key={tab}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "text-xs h-8",
                                    activeTab === tab.toLowerCase() ? "bg-slate-800 text-white" : "text-slate-400"
                                )}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-slate-950">
                        <TableRow className="border-slate-800 hover:bg-slate-950">
                            <TableHead className="text-slate-400">Time</TableHead>
                            <TableHead className="text-slate-400">Symbol</TableHead>
                            <TableHead className="text-slate-400">Type</TableHead>
                            <TableHead className="text-right text-slate-400">Price</TableHead>
                            <TableHead className="text-right text-slate-400">Qty</TableHead>
                            <TableHead className="text-right text-slate-400">P&L</TableHead>
                            <TableHead className="text-center text-slate-400">Status</TableHead>
                            <TableHead className="text-right text-slate-400">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {liveTrades.map((trade) => (
                            <TableRow key={trade.id} className="border-slate-800 hover:bg-slate-800/50">
                                <TableCell className="font-mono text-slate-400">{trade.time}</TableCell>
                                <TableCell className="font-bold text-white">{trade.symbol}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={trade.type === 'BUY' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}
                                    >
                                        {trade.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono text-slate-300">₹{trade.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right font-mono text-slate-300">{trade.qty}</TableCell>
                                <TableCell className={`text-right font-mono font-bold ${trade.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {trade.pl > 0 ? '+' : ''}₹{trade.pl}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-400">
                                        {trade.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {trade.status === 'Open' && (
                                        <Button size="sm" variant="destructive" className="h-7 text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                                            Close
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
