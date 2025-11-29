"use client";

import { motion } from "framer-motion";
import { Play, TrendingUp, BarChart3, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroSection from "@/components/landing/HeroSection";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Marketwise</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
                            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
                            <a href="#brokers" className="text-slate-300 hover:text-white transition-colors">Brokers</a>
                            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                        </div>

                        <Link href="/login">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <HeroSection />

            {/* Features Section */}
            <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
                    <p className="text-xl text-slate-400">Everything you need to trade smarter</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: TrendingUp,
                            title: "AI Predictions",
                            description: "Machine learning models analyze millions of data points to predict stock movements with high accuracy"
                        },
                        {
                            icon: BarChart3,
                            title: "Deep Analysis",
                            description: "Comprehensive quantitative and qualitative analysis of stocks, fundamentals, and market sentiment"
                        },
                        {
                            icon: Zap,
                            title: "Automated Trading",
                            description: "Deploy algo-trading strategies with automated execution, risk management, and portfolio optimization"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-all"
                        >
                            <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Trading Smarter?</h2>
                    <p className="text-xl text-indigo-100 mb-8">Join thousands of traders using AI to maximize returns</p>
                    <Link href="/signup">
                        <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 text-lg px-8">
                            Get Started Free →
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">Marketwise</span>
                            </div>
                            <p className="text-sm text-slate-400">AI-powered trading platform for the modern investor</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Features</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Pricing</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">API</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">About</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Blog</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Careers</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Legal</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Privacy</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Terms</a>
                                <a href="#" className="block text-sm text-slate-400 hover:text-white">Security</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                        © 2024 Marketwise. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
