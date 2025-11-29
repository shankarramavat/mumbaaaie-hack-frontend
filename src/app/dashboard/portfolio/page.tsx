"use client";

import { useState } from "react";
import { Star, TrendingUp, TrendingDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const holdings = [
    { stock: "RELIANCE", company: "Reliance Industries", qty: 50, avgPrice: 2400, currentPrice: 2485.5, marketValue: 124275, pl: 4275, plPercent: 3.56 },
    { stock: "TCS", company: "TCS Consultancy", qty: 25, avgPrice: 3200, currentPrice: 3287, marketValue: 82175, pl: 2175, plPercent: 2.72 },
    { stock: "INFY", company: "Infosys Limited", qty: 75, avgPrice: 1400, currentPrice: 1456.8, marketValue: 109260, pl: 4260, plPercent: 4.06 },
    { stock: "HDFC", company: "HDFC Bank", qty: 40, avgPrice: 1750, currentPrice: 1789.2, marketValue: 71568, pl: 1568, plPercent: 2.24 },
    { stock: "ITC", company: "ITC Limited", qty: 100, avgPrice: 450, currentPrice: 445.5, marketValue: 44550, pl: -450, plPercent: -1.00 }
];

export default function PortfolioPage() {
    const [activeTab, setActiveTab] = useState("holdings");

    const totalValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
    const totalPL = holdings.reduce((sum, h) => sum + h.pl, 0);
    const totalHoldings = holdings.length;
    const newHoldings = 2;

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold text-white mb-6">Portfolio</h2>

                <nav className="space-y-2 mb-8">
                    <button
                        onClick={() => setActiveTab("holdings")}
                        className={`w-full px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${activeTab === "holdings"
                            ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                            : "text-slate-400 hover:bg-slate-800"
                            }`}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Holdings
                    </button>
                    <button
                        onClick={() => setActiveTab("watchlist")}
                        className={`w-full px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${activeTab === "watchlist"
                            ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                            : "text-slate-400 hover:bg-slate-800"
                            }`}
                    >
                        <Star className="w-4 h-4" />
                        Watchlist
                    </button>
                </nav>

                <div className="border-t border-slate-800 pt-6 mt-auto">
                    <h3 className="text-sm font-semibold text-slate-400 mb-4">Portfolio Summary</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Total Value</div>
                            <div className="text-lg font-mono font-bold text-white">₹{totalValue.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Today's P&L</div>
                            <div className={`text-lg font-mono font-bold ${totalPL >= 0 ? "text-green-400" : "text-red-400"}`}>
                                {totalPL >= 0 ? "+" : ""}₹{totalPL.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Total P&L</div>
                            <div className="text-lg font-mono font-bold text-green-400">+₹{(totalPL * 2.2).toFixed(0)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Holdings</div>
                            <div className="text-lg font-bold text-white">{totalHoldings} Stocks</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
                            <p className="text-slate-400">Manage your investments and track performance</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            Live Updates
                        </Badge>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <div className="text-sm text-slate-400 mb-2">Total Value</div>
                            <div className="text-3xl font-mono font-bold text-white mb-1">₹{(totalValue / 100000).toFixed(2)}L</div>
                            <div className="text-sm text-green-400">+1.2% today</div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <div className="text-sm text-slate-400 mb-2">Total P&L</div>
                            <div className="text-3xl font-mono font-bold text-green-400">+₹{(totalPL * 1.5 / 1000).toFixed(2)}K</div>
                            <div className="text-sm text-slate-400">+17.9%</div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <div className="text-sm text-slate-400 mb-2">Holdings</div>
                            <div className="text-3xl font-mono font-bold text-white">{totalHoldings}</div>
                            <div className="text-sm text-blue-400">{newHoldings} new</div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <div className="text-sm text-slate-400 mb-2">Available Cash</div>
                            <div className="text-3xl font-mono font-bold text-white">₹45,230</div>
                            <div className="text-sm text-green-400">Ready to invest</div>
                        </div>
                    </div>

                    {/* Performance Period Selector */}
                    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Portfolio Performance</h3>
                            <p className="text-xs text-slate-500">Track your returns over different periods</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['Day', 'Week', 'Month', 'Quarter', 'Year', 'All'].map((period) => (
                                <Button
                                    key={period}
                                    variant={period === 'Day' ? 'default' : 'outline'}
                                    size="sm"
                                    className={period === 'Day' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-700 text-slate-400 text-xs'}
                                >
                                    {period}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Holdings Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                        <h2 className="font-bold text-white">Your Holdings</h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    placeholder="Search stocks..."
                                    className="pl-10 bg-slate-950 border-slate-700 w-64"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="border-slate-700">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader className="bg-slate-950">
                            <TableRow className="border-slate-800 hover:bg-slate-950">
                                <TableHead className="text-slate-400">Stock</TableHead>
                                <TableHead className="text-right text-slate-400">Quantity</TableHead>
                                <TableHead className="text-right text-slate-400">Avg. Price</TableHead>
                                <TableHead className="text-right text-slate-400">Current Price</TableHead>
                                <TableHead className="text-right text-slate-400">Market Value</TableHead>
                                <TableHead className="text-right text-slate-400">P&L</TableHead>
                                <TableHead className="text-center text-slate-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdings.map((holding) => (
                                <TableRow key={holding.stock} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell>
                                        <div>
                                            <div className="font-bold text-white">{holding.stock}</div>
                                            <div className="text-xs text-slate-500">{holding.company}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-slate-300">{holding.qty}</TableCell>
                                    <TableCell className="text-right font-mono text-slate-300">₹{holding.avgPrice}</TableCell>
                                    <TableCell className="text-right font-mono text-white">₹{holding.currentPrice}</TableCell>
                                    <TableCell className="text-right font-mono text-white">₹{holding.marketValue.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className={`font-mono font-bold ${holding.pl >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {holding.pl >= 0 ? "+" : ""}₹{holding.pl}
                                        </div>
                                        <div className={`text-xs ${holding.pl >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {holding.plPercent >= 0 ? "+" : ""}{holding.plPercent.toFixed(2)}%
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                            Trade
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
