"use client";

import { useState } from "react";
import { Search, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const recentStocks = [
    { symbol: "RELIANCE", company: "Reliance Industries", price: 2485, change: 2.3 },
    { symbol: "TCS", company: "TCS Consultancy", price: 3287, change: -1.2 },
    { symbol: "INFY", company: "Infosys Limited", price: 1457, change: 1.5 },
    { symbol: "HDFC", company: "HDFC Bank", price: 1789, change: 1.8 },
    { symbol: "ITC", company: "ITC Limited", price: 446, change: -0.3 }
];

export default function AnalysisPage() {
    const [selectedStock, setSelectedStock] = useState(recentStocks[0]);

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Stock Selector Sidebar */}
            <div className="w-80 bg-slate-900 border-r border-slate-800 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Stock Selector</h2>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search stocks..."
                        className="pl-10 bg-slate-950 border-slate-700"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3">Recently Analyzed</h3>
                    <div className="space-y-2">
                        {recentStocks.map((stock) => (
                            <button
                                key={stock.symbol}
                                onClick={() => setSelectedStock(stock)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${selectedStock.symbol === stock.symbol
                                    ? "bg-slate-950 border border-slate-700"
                                    : "hover:bg-slate-800"
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-bold text-white">{stock.symbol}</div>
                                    <div className={`text-sm font-mono ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        {stock.change >= 0 ? "+" : ""}{stock.change}%
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 truncate">{stock.company}</div>
                                <div className="text-sm font-mono text-slate-300 mt-1">₹{stock.price}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3">Watchlist</h3>
                    <Button variant="outline" className="w-full border-slate-700 text-indigo-400">
                        + Add to Watchlist
                    </Button>
                </div>

                <div className="mt-6">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Compare Stocks
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Stock Header */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{selectedStock.symbol[0]}</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">Reliance Industries Limited</h1>
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <span>NSE: RELIANCE</span>
                                    <span>•</span>
                                    <span>BSE: 500325</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-white mb-1">₹2,485.50</div>
                            <div className="flex items-center gap-2 text-green-400">
                                <TrendingUp className="w-4 h-4" />
                                <span>+2.3% (+₹68.20)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            Company Health Score: 8.3/10
                        </Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            Risk Rating: Medium Risk
                        </Badge>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    {["Quantitative", "Qualitative", "Combined Report", "Historical"].map((tab, i) => (
                        <Button
                            key={tab}
                            variant={i === 0 ? "default" : "outline"}
                            className={i === 0 ? "bg-indigo-600 hover:bg-indigo-700" : "border-slate-700"}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>

                {/* Historical Date Range Selector */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="text-sm text-slate-400">Historical Data:</div>
                    <div className="flex gap-2">
                        {['1M', '3M', '6M', '1Y', '3Y', '5Y'].map((range) => (
                            <Button
                                key={range}
                                variant={range === '1Y' ? 'default' : 'outline'}
                                size="sm"
                                className={range === '1Y' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-700 text-slate-400'}
                            >
                                {range}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Profitability Metrics */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Profitability Metrics</h2>
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-sm text-slate-400">Revenue Growth</div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">15.2%</div>
                            <div className="text-xs text-slate-500 mb-3">YoY • Industry: 12.5%</div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 rounded-full" style={{ width: "76%" }} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-sm text-slate-400">Net Profit Margin</div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">12.8%</div>
                            <div className="text-xs text-slate-500 mb-3">Industry: 10.2%</div>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-400 rounded-full" style={{ width: "62%" }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-sm text-slate-400">ROE</div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">18.5%</div>
                            <div className="text-xs text-slate-500 mb-3">Industry: 15.3%</div>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full" style={{ width: "85%" }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-sm text-slate-400">Operating Margin</div>
                                <div className="w-4 h-4" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">22.1%</div>
                            <div className="text-xs text-slate-500 mb-3">Industry: 23.5%</div>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: "55%" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Valuation Metrics */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Valuation Metrics</h2>
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-sm text-slate-400 mb-3">P/E Ratio</div>
                            <div className="text-5xl font-bold text-white mb-2">24.5</div>
                            <div className="text-xs text-slate-500 mb-4">Sector Avg: 22.1</div>
                            <Progress value={70} className="h-2" indicatorClassName="bg-blue-400" />
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-sm text-slate-400 mb-3">P/B Ratio</div>
                            <div className="text-5xl font-bold text-white mb-2">2.8</div>
                            <div className="text-xs text-slate-500 mb-4">Sector Avg: 3.2</div>
                            <Progress value={55} className="h-2" indicatorClassName="bg-purple-400" />
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-sm text-slate-400 mb-3">PEG Ratio</div>
                            <div className="text-5xl font-bold text-white mb-2">1.2</div>
                            <div className="text-xs text-green-400 mb-4">Good (≤ 1.5)</div>
                            <Progress value={80} className="h-2" indicatorClassName="bg-green-400" />
                        </div>
                    </div>
                </div>

                {/* Financial Health */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Financial Health</h2>
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-white mb-4">Debt Analysis</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Debt-to-Equity</span>
                                    <span className="font-mono font-bold text-white">0.42</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Current Ratio</span>
                                    <span className="font-mono font-bold text-white">1.35</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Interest Coverage</span>
                                    <span className="font-mono font-bold text-white">8.7x</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-4">Cash Flow Trends</h3>
                            <div className="h-32 bg-slate-950/50 rounded-lg p-4 flex items-end gap-2">
                                {[40, 30, 45, 55, 35, 60].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col gap-1">
                                        <div className={`bg-green-500 rounded-t`} style={{ height: `${height}%` }} />
                                        <div className="bg-blue-500 rounded-t" style={{ height: `${height * 0.7}%` }} />
                                        <div className={`bg-red-500 rounded-t ${height > 50 ? 'opacity-0' : ''}`} style={{ height: `${height * 0.3}%` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-3 text-xs text-slate-500">
                                <span>2020</span>
                                <span>2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
