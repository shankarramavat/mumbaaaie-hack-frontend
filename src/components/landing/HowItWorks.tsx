"use client";

import { motion } from "framer-motion";
import { UserPlus, LineChart, Zap, Wallet } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Connect Your Broker",
        description: "Securely link your Zerodha, Groww, or Upstox account with read-only access for analysis.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: LineChart,
        title: "AI Analyzes Data",
        description: "Our engine processes market data, news sentiment, and your portfolio in real-time.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        icon: Zap,
        title: "Get Predictions",
        description: "Receive high-confidence buy/sell signals with clear entry and exit targets.",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20"
    },
    {
        icon: Wallet,
        title: "Auto-Execute",
        description: "Approve trades with one click or set up automated strategies with stop-losses.",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Marketwise Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        From connection to profit in four simple steps. Our streamlined process puts the power of AI in your hands.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-colors"
                            >
                                <div className={`w-14 h-14 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon className={`w-7 h-7 ${step.color}`} />
                                </div>

                                <div className="absolute top-6 right-6 text-4xl font-bold text-slate-800 select-none">
                                    0{index + 1}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 text-center lg:text-left">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed text-center lg:text-left">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
