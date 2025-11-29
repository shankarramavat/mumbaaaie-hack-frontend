"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart2,
    Globe,
    Clock,
    ArrowRight,
    AlertTriangle,
    BrainCircuit
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock Data
const predictions = [
    {
        id: 1,
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        price: 2980.50,
        change: 1.5,
        prediction: "STRONG BUY",
        confidence: 87,
        target: 3150,
        timeframe: "30 days",
        return: 12.5,
        trend: "Bullish",
        volatility: "Medium",
        volume: "High",
        impact: "Positive"
    },
    {
        id: 2,
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        price: 1450.20,
        change: -0.2,
        prediction: "HOLD",
        confidence: 65,
        target: 1520,
        timeframe: "14 days",
        return: 4.8,
        trend: "Neutral",
        volatility: "Low",
        volume: "Medium",
        impact: "Neutral"
    },
    {
        id: 3,
        symbol: "TATASTEEL",
        name: "Tata Steel Ltd",
        price: 142.80,
        change: 2.1,
        prediction: "BUY",
        confidence: 78,
        target: 165,
        timeframe: "45 days",
        return: 15.5,
        trend: "Bullish",
        volatility: "High",
        volume: "High",
        impact: "Positive"
    },
    {
        id: 4,
        symbol: "INFY",
        name: "Infosys Ltd",
        price: 1620.80,
        change: -1.4,
        prediction: "SELL",
        confidence: 72,
        target: 1550,
        timeframe: "7 days",
        return: -4.3,
        trend: "Bearish",
        volatility: "Medium",
        volume: "Medium",
        impact: "Negative"
    },
    {
        id: 5,
        symbol: "ADANIENT",
        name: "Adani Enterprises",
        price: 3250.00,
        change: 3.5,
        prediction: "STRONG BUY",
        confidence: 91,
        target: 3800,
        timeframe: "60 days",
        return: 16.9,
        trend: "Bullish",
        volatility: "High",
        volume: "Very High",
        impact: "Positive"
    },
    {
        id: 6,
        symbol: "WIPRO",
        name: "Wipro Ltd",
        price: 485.40,
        change: -0.8,
        prediction: "HOLD",
        confidence: 58,
        target: 490,
        timeframe: "10 days",
        return: 0.9,
        trend: "Neutral",
        volatility: "Low",
        volume: "Low",
        impact: "Neutral"
    }
];

export default function PredictionEnginePage() {
    const [selectedStock, setSelectedStock] = useState<typeof predictions[0] | null>(null);

    const getPredictionColor = (pred: string) => {
        switch (pred) {
            case "STRONG BUY": return "text-green-500 bg-green-500/10 border-green-500/20";
            case "BUY": return "text-green-400 bg-green-400/10 border-green-400/20";
            case "HOLD": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
            case "SELL": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
            case "STRONG SELL": return "text-red-500 bg-red-500/10 border-red-500/20";
            default: return "text-slate-500";
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search stocks by name or symbol..."
                        className="pl-10 bg-slate-950 border-slate-700 focus:border-indigo-500"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {["All", "Nifty 50", "Bank Nifty", "Top Gainers", "Watchlist"].map((filter) => (
                        <Badge
                            key={filter}
                            variant="outline"
                            className="cursor-pointer hover:bg-slate-800 border-slate-700 whitespace-nowrap"
                        >
                            {filter}
                        </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="ml-2 border-slate-700">
                        <Filter className="w-4 h-4 mr-2" /> Filters
                    </Button>
                </div>
            </div>

            {/* Predictions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {predictions.map((stock) => (
                    <motion.div
                        key={stock.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedStock(stock)}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-white">{stock.symbol}</h3>
                                <p className="text-xs text-slate-400">{stock.name}</p>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-medium text-white">₹{stock.price.toFixed(2)}</div>
                                <div className={`text-xs flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {stock.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stock.change > 0 ? '+' : ''}{stock.change}%
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-3 rounded-lg border ${getPredictionColor(stock.prediction)}`}>
                                <span className="font-bold text-sm">{stock.prediction}</span>
                                <span className="text-xs font-medium">Target: ₹{stock.target}</span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>AI Confidence</span>
                                    <span>{stock.confidence}%</span>
                                </div>
                                <Progress value={stock.confidence} className="h-1.5" />
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase">Return</div>
                                    <div className={`text-sm font-bold ${stock.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {stock.return > 0 ? '+' : ''}{stock.return}%
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase">Timeframe</div>
                                    <div className="text-sm font-bold text-slate-300">{stock.timeframe}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Modal */}
            <Dialog open={!!selectedStock} onOpenChange={(open) => !open && setSelectedStock(null)}>
                <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 text-slate-100 p-0 overflow-hidden">
                    {selectedStock && (
                        <div className="flex flex-col h-[80vh]">
                            <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950">
                                <div>
                                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                        {selectedStock.symbol}
                                        <Badge variant="outline" className={`${getPredictionColor(selectedStock.prediction)}`}>
                                            {selectedStock.prediction}
                                        </Badge>
                                    </DialogTitle>
                                    <DialogDescription className="text-slate-400 mt-1">
                                        {selectedStock.name} • NSE
                                    </DialogDescription>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-mono font-bold">₹{selectedStock.price.toFixed(2)}</div>
                                    <div className={`flex items-center justify-end gap-1 ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {selectedStock.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        {selectedStock.change > 0 ? '+' : ''}{selectedStock.change}%
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <Tabs defaultValue="prediction" className="w-full">
                                    <div className="px-6 pt-4 bg-slate-950 border-b border-slate-800">
                                        <TabsList className="bg-slate-900 border border-slate-800">
                                            <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
                                            <TabsTrigger value="technical">Technical</TabsTrigger>
                                            <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
                                            <TabsTrigger value="news">News & Sentiment</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div className="p-6">
                                        <TabsContent value="prediction" className="space-y-6 mt-0">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="md:col-span-2 space-y-6">
                                                    {/* Multi-timeframe Matrix */}
                                                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                                                        <h4 className="font-bold mb-4 flex items-center gap-2">
                                                            <Clock className="w-5 h-5 text-indigo-500" />
                                                            Multi-timeframe Prediction Matrix
                                                        </h4>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {[
                                                                { label: "Intraday", signal: "Neutral", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
                                                                { label: "Swing (1-2w)", signal: "Bullish", color: "text-green-500 bg-green-500/10 border-green-500/20" },
                                                                { label: "Positional (1-3m)", signal: "Strong Bullish", color: "text-green-400 bg-green-400/10 border-green-400/20" },
                                                            ].map((tf) => (
                                                                <div key={tf.label} className={`p-3 rounded-lg border text-center ${tf.color}`}>
                                                                    <div className="text-xs opacity-70 mb-1">{tf.label}</div>
                                                                    <div className="font-bold text-sm">{tf.signal}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Model Attribution */}
                                                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                                                        <h4 className="font-bold mb-4 flex items-center gap-2">
                                                            <BrainCircuit className="w-5 h-5 text-purple-500" />
                                                            Model Attribution
                                                        </h4>
                                                        <div className="space-y-4">
                                                            {[
                                                                { label: "Technical Indicators (RSI, MACD)", weight: 40, score: 8.5 },
                                                                { label: "Fundamental Data (PE, EPS)", weight: 30, score: 7.2 },
                                                                { label: "Sentiment Analysis (News, Social)", weight: 20, score: 9.1 },
                                                                { label: "Macro Factors (Rates, USD)", weight: 10, score: 6.5 },
                                                            ].map((factor) => (
                                                                <div key={factor.label} className="space-y-1">
                                                                    <div className="flex justify-between text-sm">
                                                                        <span className="text-slate-400">{factor.label}</span>
                                                                        <span className="font-mono text-xs text-slate-500">Weight: {factor.weight}%</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Progress value={factor.score * 10} className="h-2 flex-1" />
                                                                        <span className="font-mono text-xs font-bold w-8 text-right">{factor.score}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                                                        <h4 className="font-bold mb-4 text-sm uppercase text-slate-500">Price Targets</h4>
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-slate-400">Short Term (7d)</span>
                                                                <span className="font-mono font-bold">₹{(selectedStock.price * 1.02).toFixed(0)}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-slate-400">Medium Term (30d)</span>
                                                                <span className="font-mono font-bold text-green-400">₹{selectedStock.target}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-slate-400">Long Term (90d)</span>
                                                                <span className="font-mono font-bold">₹{(selectedStock.price * 1.15).toFixed(0)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                                                        <h4 className="font-bold mb-4 text-sm uppercase text-slate-500">Key Metrics</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <div className="text-xs text-slate-500">Trend</div>
                                                                <div className="font-medium flex items-center gap-1 text-green-400">
                                                                    <TrendingUp size={14} /> {selectedStock.trend}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-slate-500">Volatility</div>
                                                                <div className="font-medium flex items-center gap-1 text-yellow-400">
                                                                    <Activity size={14} /> {selectedStock.volatility}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-slate-500">Volume</div>
                                                                <div className="font-medium flex items-center gap-1 text-blue-400">
                                                                    <BarChart2 size={14} /> {selectedStock.volume}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-slate-500">Global</div>
                                                                <div className="font-medium flex items-center gap-1 text-purple-400">
                                                                    <Globe size={14} /> {selectedStock.impact}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="technical" className="mt-0">
                                            <div className="h-64 flex items-center justify-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500">
                                                Interactive Chart Placeholder (TradingView)
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="fundamental" className="mt-0">
                                            <div className="h-64 flex items-center justify-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500">
                                                Fundamental Data Placeholder
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="news" className="mt-0">
                                            <div className="h-64 flex items-center justify-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500">
                                                News Feed Placeholder
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>

                            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
                                <Button variant="outline" className="border-slate-700">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Set Alert
                                </Button>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    Execute Trade <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
