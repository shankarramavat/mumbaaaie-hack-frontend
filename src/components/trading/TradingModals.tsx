"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface QuickTradeModalProps {
    open: boolean;
    onClose: () => void;
}

export function QuickTradeModal({ open, onClose }: QuickTradeModalProps) {
    const [orderType, setOrderType] = useState("BUY");
    const [priceType, setPriceType] = useState("Market");

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Quick Trade</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Stock Symbol */}
                    <div>
                        <Label className="text-sm text-slate-400 mb-2">Stock Symbol</Label>
                        <Input
                            placeholder="e.g., RELIANCE"
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Order Type */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Order Type</Label>
                            <Select value={orderType} onValueChange={setOrderType}>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                    <SelectItem value="BUY">BUY</SelectItem>
                                    <SelectItem value="SELL">SELL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Quantity</Label>
                            <Input
                                type="number"
                                placeholder="10"
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price Type */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Price Type</Label>
                            <Select value={priceType} onValueChange={setPriceType}>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                    <SelectItem value="Market">Market</SelectItem>
                                    <SelectItem value="Limit">Limit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Price (₹)</Label>
                            <Input
                                placeholder="Current price"
                                disabled={priceType === "Market"}
                                className="bg-slate-800 border-slate-700 text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Execute Trade
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface PriceAlertModalProps {
    open: boolean;
    onClose: () => void;
}

export function PriceAlertModal({ open, onClose }: PriceAlertModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Set Price Alert</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Stock Symbol */}
                    <div>
                        <Label className="text-sm text-slate-400 mb-2">Stock Symbol</Label>
                        <Input
                            placeholder="e.g., TCS"
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    {/* Alert Type */}
                    <div>
                        <Label className="text-sm text-slate-400 mb-2">Alert Type</Label>
                        <Select defaultValue="above">
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="above">Price Above</SelectItem>
                                <SelectItem value="below">Price Below</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Target Price */}
                    <div>
                        <Label className="text-sm text-slate-400 mb-2">Target Price (₹)</Label>
                        <Input
                            type="number"
                            placeholder="3500"
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700">
                            Set Alert
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface StopLossModalProps {
    open: boolean;
    onClose: () => void;
}

export function StopLossModal({ open, onClose }: StopLossModalProps) {
    const [trailingStop, setTrailingStop] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Configure Stop Loss</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Stock Symbol */}
                    <div>
                        <Label className="text-sm text-slate-400 mb-2">Stock Symbol</Label>
                        <Input
                            placeholder="e.g., INFY"
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Stop Loss % */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Stop Loss %</Label>
                            <Input
                                type="number"
                                placeholder="5"
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>

                        {/* Target Profit % */}
                        <div>
                            <Label className="text-sm text-slate-400 mb-2">Target Profit %</Label>
                            <Input
                                type="number"
                                placeholder="15"
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                    </div>

                    {/* Trailing Stop */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-white mb-1">Trailing Stop</div>
                                <div className="text-sm text-slate-400">Adjust stop-loss as price rises</div>
                            </div>
                            <Switch
                                checked={trailingStop}
                                onCheckedChange={setTrailingStop}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700">
                            Set Stop Loss
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
