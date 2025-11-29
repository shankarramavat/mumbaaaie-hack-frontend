"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrokerStore } from "@/lib/broker-store";
import { getBrokerDisplayName, getBrokerColor } from "@/lib/broker-api";

export function ConnectedBrokerCard() {
    const { isConnected, broker, connectedAt, portfolioData, disconnectBroker } = useBrokerStore();

    if (!isConnected || !broker) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-6"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${getBrokerColor(broker)} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xl font-bold">
                            {getBrokerDisplayName(broker).charAt(0)}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white">{getBrokerDisplayName(broker)} Connected</h3>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <p className="text-xs text-slate-400">
                            Connected {connectedAt && formatDate(connectedAt)}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={disconnectBroker}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                    <XCircle className="w-4 h-4 mr-1" />
                    Disconnect
                </Button>
            </div>

            {portfolioData && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                    <div>
                        <div className="text-xs text-slate-500">Portfolio Value</div>
                        <div className="text-lg font-bold text-white">
                            ₹{portfolioData.totalValue.toLocaleString('en-IN')}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500">Today's P&L</div>
                        <div className={`text-lg font-bold ${portfolioData.todaysPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {portfolioData.todaysPnL >= 0 ? '+' : ''}₹{portfolioData.todaysPnL.toLocaleString('en-IN')}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500">Holdings</div>
                        <div className="text-lg font-bold text-white">
                            {portfolioData.holdings.length} Stocks
                        </div>
                    </div>
                </div>
            )}

            <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Portfolio
            </Button>
        </motion.div>
    );
}
