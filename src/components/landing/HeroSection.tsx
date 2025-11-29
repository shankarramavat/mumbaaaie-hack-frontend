"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Activity, ShieldCheck } from "lucide-react";
import { MiniChart } from "@/components/charts/MiniCharts";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Ticker Tape */}
            <div className="absolute top-0 w-full bg-slate-900/50 backdrop-blur-sm border-b border-white/5 py-2 overflow-hidden z-10">
                <div className="animate-ticker flex whitespace-nowrap">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-8 mx-4">
                            <span className="text-green-400 font-mono flex items-center gap-1">NIFTY 50 <TrendingUp size={14} /> 22,510.40 (+1.2%)</span>
                            <span className="text-red-400 font-mono flex items-center gap-1">SENSEX <TrendingUp size={14} className="rotate-180" /> 74,119.35 (-0.4%)</span>
                            <span className="text-green-400 font-mono flex items-center gap-1">BANKNIFTY <TrendingUp size={14} /> 47,820.10 (+0.8%)</span>
                            <span className="text-green-400 font-mono flex items-center gap-1">RELIANCE <TrendingUp size={14} /> 2,980.50 (+1.5%)</span>
                            <span className="text-red-400 font-mono flex items-center gap-1">HDFCBANK <TrendingUp size={14} className="rotate-180" /> 1,450.20 (-0.2%)</span>
                            <span className="text-green-400 font-mono flex items-center gap-1">INFY <TrendingUp size={14} /> 1,620.80 (+2.1%)</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 pt-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                AI-Powered Trading Engine V2.0 Live
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                                AI-Powered Prediction <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    & Automated Execution
                                </span>
                            </h1>

                            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Remove emotional bias from your trading. Combine quantitative rigor with qualitative insight to outsmart the market.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-full text-lg shadow-lg shadow-indigo-500/25">
                                    Connect Your Broker <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full">
                                        Start Free Trial
                                    </Button>
                                    <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                                        Explore Platform
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-green-500" />
                                    <span>SEBI Compliant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                    <span>Real-time Data</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10"
                        >
                            {/* Main Dashboard Preview Card */}
                            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl transform rotate-y-12 rotate-x-6 perspective-1000">
                                <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-slate-400 font-mono">marketwise_ai_engine.exe</div>
                                </div>

                                {/* Main Chart Area */}
                                <div className="h-64 w-full bg-gradient-to-b from-indigo-500/5 to-transparent rounded-lg border border-indigo-500/10 relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 pt-8 px-4">
                                        <MiniChart
                                            data={[40, 65, 55, 80, 70, 90, 85, 95, 88, 100]}
                                            color="indigo"
                                            height="h-full"
                                        />
                                    </div>

                                    {/* Live Prediction Card */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg w-48"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <div className="text-xs text-slate-400">Live Prediction</div>
                                        </div>
                                        <div className="font-bold text-white">RELIANCE</div>
                                        <div className="text-xs text-green-400 font-medium">STRONG BUY • 87% Confidence</div>
                                    </motion.div>

                                    {/* AI Analysis Card with Chart */}
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="absolute top-12 right-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg w-56"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <div className="text-xs text-slate-400">AI Analysis</div>
                                        </div>
                                        <div className="font-bold text-white text-sm mb-1">Neural Network</div>
                                        <div className="text-[10px] text-slate-500 mb-2">Processing 15M+ data points</div>
                                        <div className="h-12 w-full bg-slate-900/50 rounded border border-slate-700/50 relative overflow-hidden">
                                            <MiniChart
                                                data={[20, 40, 30, 50, 45, 60, 55, 80]}
                                                color="green"
                                                height="h-full"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Portfolio Card */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.8 }}
                                        className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg w-40"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                            <div className="text-xs text-slate-400">Portfolio</div>
                                        </div>
                                        <div className="font-bold text-white">+₹12,450</div>
                                        <div className="text-xs text-purple-400">Today's P&L (+2.3%)</div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Buy Signal</div>
                                        <div className="text-xs text-slate-400">RELIANCE @ ₹2,980</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-5 -left-5 bg-slate-800/90 backdrop-blur p-4 rounded-xl border border-slate-700 shadow-xl z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Analysis Complete</div>
                                        <div className="text-xs text-slate-400">500+ data points processed</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
