"use client";

import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    ArrowRight,
    Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ConnectedBrokerCard } from "@/components/broker/ConnectedBrokerCard";
import { useBrokerStore } from "@/lib/broker-store";

export default function DashboardPage() {
    const { isConnected, portfolioData } = useBrokerStore();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-slate-400">Welcome back, Rahul. Here's your market summary.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-700">Add Funds</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Activity className="w-4 h-4 mr-2" /> Scan Market
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        label: "Total Portfolio Value",
                        value: portfolioData ? `₹${portfolioData.totalValue.toLocaleString('en-IN')}` : "₹8,45,250",
                        change: "+1.2%",
                        trend: "up",
                        icon: DollarSign,
                        color: "text-green-400"
                    },
                    {
                        label: "Day's P&L",
                        value: portfolioData ? `${portfolioData.todaysPnL >= 0 ? '+' : ''}₹${portfolioData.todaysPnL.toLocaleString('en-IN')}` : "+₹12,450",
                        change: "+1.5%",
                        trend: "up",
                        icon: TrendingUp,
                        color: portfolioData && portfolioData.todaysPnL >= 0 ? "text-green-400" : "text-red-400"
                    },
                    {
                        label: "Active Strategies",
                        value: "2 Running",
                        change: "85% Win Rate",
                        trend: "neutral",
                        icon: Activity,
                        color: "text-blue-400"
                    },
                    {
                        label: "Open Positions",
                        value: portfolioData ? `${portfolioData.holdings.length} Active` : "5 Active",
                        change: isConnected ? "From Broker" : "2 Pending",
                        trend: "neutral",
                        icon: Activity,
                        color: "text-purple-400"
                    },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-800 rounded-lg">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <Badge variant="outline" className={`border-slate-700 ${stat.trend === 'up' ? 'text-green-400' : 'text-slate-400'}`}>
                                {stat.change}
                            </Badge>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Connected Broker Status */}
            {isConnected ? (
                <ConnectedBrokerCard />
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-white mb-1">Connect Your Broker</h3>
                        <p className="text-sm text-slate-400">Link your demat account to enable auto-trading and portfolio sync</p>
                    </div>
                    <Link href="/dashboard/connect-broker">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Connect Now
                        </Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Market Overview */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                        <h2 className="font-bold text-white">Market Overview</h2>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="bg-slate-800 text-white hover:bg-slate-700 cursor-pointer">NIFTY 50</Badge>
                            <Badge variant="outline" className="border-slate-700 text-slate-400 hover:text-white cursor-pointer">BANK NIFTY</Badge>
                        </div>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {['1D', '1W', '1M', '3M', '6M', '1Y', 'All'].map((period) => (
                            <Button
                                key={period}
                                variant={period === '1D' ? 'default' : 'outline'}
                                size="sm"
                                className={period === '1D' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-700 text-slate-400'}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>

                    <div className="h-64 bg-slate-950/50 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500">
                        Interactive Chart Area (NIFTY 50 - 1 Day View)
                    </div>
                </div>

                {/* Top Predictions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-white">Top AI Picks</h2>
                        <Link href="/dashboard/predictions" className="text-xs text-indigo-400 hover:text-indigo-300">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {[
                            { symbol: "RELIANCE", target: "₹3,150", upside: "+12.5%", conf: 87 },
                            { symbol: "ADANIENT", target: "₹3,800", upside: "+16.9%", conf: 91 },
                            { symbol: "TATASTEEL", target: "₹165", upside: "+15.5%", conf: 78 },
                        ].map((stock) => (
                            <div key={stock.symbol} className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-white">{stock.symbol}</div>
                                    <div className="text-xs text-slate-500">Target: {stock.target}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-green-400">{stock.upside}</div>
                                    <div className="text-xs text-slate-500">{stock.conf}% Conf.</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-slate-300">
                        Generate New Predictions
                    </Button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="font-bold text-white">Recent Activity</h2>
                </div>
                <div className="divide-y divide-slate-800">
                    {[
                        { action: "Bought 50 Qty INFY", time: "10:34 AM", price: "₹1,450.20", type: "buy" },
                        { action: "Sold 25 Qty TCS", time: "10:12 AM", price: "₹3,280.00", type: "sell" },
                        { action: "Strategy 'Nifty Alpha' Executed", time: "09:45 AM", price: "Auto", type: "algo" },
                    ].map((activity, i) => (
                        <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'buy' ? 'bg-green-500/10 text-green-500' :
                                    activity.type === 'sell' ? 'bg-red-500/10 text-red-500' :
                                        'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    {activity.type === 'buy' ? <TrendingUp size={14} /> :
                                        activity.type === 'sell' ? <TrendingDown size={14} /> :
                                            <Activity size={14} />}
                                </div>
                                <div>
                                    <div className="font-medium text-white">{activity.action}</div>
                                    <div className="text-xs text-slate-500">{activity.time}</div>
                                </div>
                            </div>
                            <div className="font-mono text-slate-300">{activity.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
