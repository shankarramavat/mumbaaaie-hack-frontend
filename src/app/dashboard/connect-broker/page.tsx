"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrokerAuthModal } from "@/components/broker/BrokerAuthModal";
import { useBrokerStore, BrokerType } from "@/lib/broker-store";
import { simulateOAuthLogin } from "@/lib/broker-api";

const brokers = [
    { id: "zerodha" as BrokerType, name: "Zerodha", letter: "Z", color: "bg-green-500", badge: "Most Popular", features: ["Real-time API access", "Algo trading supported", "Low brokerage fees"] },
    { id: "groww" as BrokerType, name: "Groww", letter: "G", color: "bg-blue-500", badge: "Recommended", features: ["Easy setup process", "Mobile-friendly", "Zero commission on stocks"] },
    { id: "upstox" as BrokerType, name: "Upstox", letter: "U", color: "bg-purple-600", badge: "Fast Execution", features: ["Low latency trading", "Advanced charting tools", "Competitive pricing"] },
    { id: "angelone" as BrokerType, name: "Angel One", letter: "A", color: "bg-orange-500", badge: "Full Service", features: ["Research reports", "Advisory services", "Multiple platforms"] },
    { id: null, name: "5paisa", letter: "+", color: "bg-slate-700", badge: "Coming Soon", features: ["Integration in progress"] },
    { id: null, name: "ICICI Direct", letter: "+", color: "bg-slate-700", badge: "Coming Soon", features: ["Integration in progress"] }
];

const securityFeatures = [
    { icon: Shield, title: "End-to-End Encryption", description: "All data is encrypted using AES-256 encryption before transmission and storage." },
    { icon: CheckCircle, title: "Compliance Certified", description: "We follow SEBI guidelines and industry best practices for data protection." },
    { icon: Shield, title: "Secure API Tokens", description: "We use secure OAuth 2.0 tokens that can be revoked at any time. No passwords stored." },
    { icon: Lock, title: "No Credential Storage", description: "Your broker login credentials are never stored on our servers." }
];

export default function ConnectBrokerPage() {
    const router = useRouter();
    const [selectedBroker, setSelectedBroker] = useState<BrokerType>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [connectingBroker, setConnectingBroker] = useState<BrokerType>(null);
    const connectBroker = useBrokerStore(state => state.connectBroker);

    const handleConnect = (brokerId: BrokerType) => {
        if (!brokerId) return;
        setConnectingBroker(brokerId);
        setAuthModalOpen(true);
    };

    const handleAuthSuccess = async () => {
        if (!connectingBroker) return;

        try {
            // Simulate OAuth and fetch portfolio data
            const portfolioData = await simulateOAuthLogin(connectingBroker);

            // Update store
            connectBroker(connectingBroker, portfolioData);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to connect broker:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <BrokerAuthModal
                isOpen={authModalOpen}
                broker={connectingBroker}
                onClose={() => {
                    setAuthModalOpen(false);
                    setConnectingBroker(null);
                }}
                onSuccess={handleAuthSuccess}
            />

            {/* Progress Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <span className="text-lg font-bold text-white">Marketwise</span>
                    </div>
                    <button className="text-slate-400 hover:text-white" onClick={() => router.push('/dashboard')}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">Step 1 of 3</div>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                    <div className="bg-indigo-600 h-1 rounded-full" style={{ width: "33%" }}></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Connect Your Trading Account</h1>
                    <p className="text-xl text-slate-400">Securely link your broker to enable AI-powered trading</p>
                </motion.div>

                {/* Security Badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-green-500/20">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-slate-300">256-bit Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-blue-500/20">
                        <Lock className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-slate-300">OAuth 2.0 Secure</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-purple-500/20">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-slate-300">No Password Stored</span>
                    </div>
                </div>

                {/* Broker Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {brokers.map((broker, index) => {
                        const isComingSoon = broker.badge === "Coming Soon";
                        const isSelected = selectedBroker === broker.id;

                        return (
                            <motion.div
                                key={broker.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => !isComingSoon && setSelectedBroker(broker.id)}
                                className={`bg-slate-900 rounded-2xl p-6 border-2 transition-all cursor-pointer ${isSelected
                                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                                    : isComingSoon
                                        ? "border-slate-800 opacity-60"
                                        : "border-slate-800 hover:border-slate-700"
                                    }`}
                            >
                                {/* Broker Icon */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-16 h-16 ${broker.color} rounded-xl flex items-center justify-center`}>
                                        <span className="text-white text-2xl font-bold">{broker.letter}</span>
                                    </div>
                                    {broker.badge && (
                                        <span className={`text-xs px-2 py-1 rounded-full ${broker.badge === "Most Popular" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                            broker.badge === "Recommended" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                                broker.badge === "Fast Execution" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                                    broker.badge === "Full Service" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                                                        "bg-slate-700 text-slate-400"
                                            }`}>
                                            {broker.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Broker Name */}
                                <h3 className="text-xl font-bold text-white mb-4">{broker.name}</h3>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {broker.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Connect Button */}
                                <Button
                                    disabled={isComingSoon}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (broker.id) handleConnect(broker.id);
                                    }}
                                    className={`w-full ${isComingSoon
                                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                        : isSelected
                                            ? "bg-indigo-600 hover:bg-indigo-700"
                                            : "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white"
                                        }`}
                                >
                                    {isComingSoon ? "Coming Soon" : `Connect ${broker.name}`}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* How We Protect Your Data */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">How We Protect Your Data</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {securityFeatures.map((feature, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-12 h-12 bg-slate-950 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Actions */}
                <div className="flex justify-between items-center mt-8">
                    <Button variant="ghost" className="text-slate-400" onClick={() => router.push('/dashboard')}>
                        Skip for Now
                    </Button>
                    <Button
                        disabled={!selectedBroker}
                        onClick={() => selectedBroker && handleConnect(selectedBroker)}
                        className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    >
                        Continue →
                    </Button>
                </div>
            </div>
        </div>
    );
}
