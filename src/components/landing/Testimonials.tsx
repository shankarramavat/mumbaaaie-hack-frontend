"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Day Trader",
        content: "The prediction accuracy is insane. I've increased my monthly returns by 15% since switching to Marketwise.",
        avatar: "RS"
    },
    {
        name: "Priya Patel",
        role: "Long-term Investor",
        content: "I love the deep analysis features. It saves me hours of reading annual reports. The AI summaries are spot on.",
        avatar: "PP"
    },
    {
        name: "Aditya Kumar",
        role: "Algo Trader",
        content: "Finally, a platform that lets me automate my strategies without coding. The backtesting engine is super fast.",
        avatar: "AK"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by 50,000+ Traders</h2>
                    <p className="text-slate-400">Join the fastest growing community of smart traders in India.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-6 leading-relaxed">"{item.content}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{item.name}</div>
                                    <div className="text-slate-500 text-sm">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
