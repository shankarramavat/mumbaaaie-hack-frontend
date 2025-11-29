"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const brokers = [
    { name: "Zerodha", color: "hover:text-blue-500" },
    { name: "Groww", color: "hover:text-green-500" },
    { name: "Upstox", color: "hover:text-purple-500" },
    { name: "Angel One", color: "hover:text-orange-500" },
];

export default function BrokerShowcase() {
    return (
        <section className="py-20 bg-slate-900/50 border-y border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Seamless Integration with <br />
                            <span className="text-indigo-400">Top Indian Brokers</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Connect your existing brokerage account in seconds. We use bank-grade encryption and official APIs to ensure your data and assets remain 100% secure.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Secure OAuth 2.0 Connection",
                                "Read-only access by default",
                                "No credentials stored on our servers",
                                "Instant trade execution"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                                    <span className="text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            {brokers.map((broker, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-center justify-center hover:border-indigo-500/50 transition-all group cursor-pointer"
                                >
                                    <span className={`text-xl font-bold text-slate-400 ${broker.color} transition-colors`}>
                                        {broker.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-sm text-slate-500">More brokers coming soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
