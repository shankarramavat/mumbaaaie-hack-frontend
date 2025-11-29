"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, AlertTriangle, Zap } from "lucide-react";

interface QuickTradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    stock?: {
        symbol: string;
        name: string;
        price: number;
    };
}

export default function QuickTradeModal({ open, onOpenChange, stock }: QuickTradeModalProps) {
    const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
    const [tradeType, setTradeType] = useState<"market" | "limit">("market");
    const [quantity, setQuantity] = useState<number>(1);
    const [limitPrice, setLimitPrice] = useState<number>(stock?.price || 0);
    const [stopLoss, setStopLoss] = useState<number>(0);
    const [takeProfit, setTakeProfit] = useState<number>(0);
    const [trailingStop, setTrailingStop] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    if (!stock) return null;

    const totalValue = tradeType === "market" ? stock.price * quantity : limitPrice * quantity;
    const estimatedFees = totalValue * 0.001; // 0.1% fee

    const handleTrade = async () => {
        setLoading(true);
        // Simulate trade execution
        setTimeout(() => {
            setLoading(false);
            onOpenChange(false);
            // Show success notification
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white p-0">
                <DialogHeader className="p-6 border-b border-slate-800">
                    <DialogTitle className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold">{stock.symbol}</div>
                            <div className="text-sm text-slate-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold">₹{stock.price.toFixed(2)}</div>
                            <div className="text-sm text-green-400 flex items-center gap-1">
                                <TrendingUp size={14} /> +1.5%
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Buy/Sell Toggle */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => setOrderType("BUY")}
                            className={`h-12 ${orderType === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-slate-800 hover:bg-slate-700"}`}
                        >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            BUY
                        </Button>
                        <Button
                            onClick={() => setOrderType("SELL")}
                            className={`h-12 ${orderType === "SELL" ? "bg-red-600 hover:bg-red-700" : "bg-slate-800 hover:bg-slate-700"}`}
                        >
                            <TrendingDown className="w-4 h-4 mr-2" />
                            SELL
                        </Button>
                    </div>

                    {/* Order Type */}
                    <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "market" | "limit")}>
                        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                            <TabsTrigger value="market">Market Order</TabsTrigger>
                            <TabsTrigger value="limit">Limit Order</TabsTrigger>
                        </TabsList>

                        <TabsContent value="market" className="space-y-4 mt-4">
                            <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <span>Instant execution at current market price</span>
                                </div>
                                <div className="text-2xl font-mono font-bold">₹{stock.price.toFixed(2)}</div>
                            </div>

                            <div className="space-y-2">
                                <Label>Quantity</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="bg-slate-950 border-slate-700"
                                    />
                                    <div className="flex gap-1">
                                        {[10, 50, 100].map((q) => (
                                            <Button
                                                key={q}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setQuantity(q)}
                                                className="border-slate-700 text-xs"
                                            >
                                                {q}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="limit" className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Limit Price (₹)</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={limitPrice}
                                        onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                                        className="bg-slate-950 border-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="bg-slate-950 border-slate-700"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* Risk Management */}
                    <div className="space-y-4 p-4 bg-slate-950/30 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            Risk Management
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Stop Loss (₹)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Optional"
                                    value={stopLoss || ""}
                                    onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                                    className="bg-slate-950 border-slate-700 h-9 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Take Profit (₹)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Optional"
                                    value={takeProfit || ""}
                                    onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                                    className="bg-slate-950 border-slate-700 h-9 text-sm"
                                />
                            </div>
                        </div>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={trailingStop}
                                onChange={(e) => setTrailingStop(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600"
                            />
                            <span className="text-sm text-slate-400">Enable Trailing Stop Loss (1.5%)</span>
                        </label>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-2 p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Total Value</span>
                            <span className="font-mono font-bold">₹{totalValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Est. Fees (0.1%)</span>
                            <span className="font-mono text-red-400">-₹{estimatedFees.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-slate-800 pt-2 flex justify-between font-bold">
                            <span>Total {orderType}</span>
                            <span className="font-mono text-lg">₹{(totalValue + estimatedFees).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 border-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleTrade}
                            disabled={loading}
                            className={`flex-1 ${orderType === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                        >
                            {loading ? "Executing..." : `${orderType} ${quantity} Shares`}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
