"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrokerType } from "@/lib/broker-store";
import { getBrokerDisplayName, getBrokerColor } from "@/lib/broker-api";

interface BrokerAuthModalProps {
    isOpen: boolean;
    broker: BrokerType;
    onClose: () => void;
    onSuccess: () => void;
}

type AuthStep = 'credentials' | 'otp' | 'success';

export function BrokerAuthModal({ isOpen, broker, onClose, onSuccess }: BrokerAuthModalProps) {
    const [step, setStep] = useState<AuthStep>('credentials');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setStep('otp');
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate OTP verification
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setStep('success');

        // Auto close and trigger success callback
        setTimeout(() => {
            onSuccess();
            onClose();
            resetModal();
        }, 2000);
    };

    const resetModal = () => {
        setStep('credentials');
        setUserId('');
        setPassword('');
        setOtp('');
    };

    const handleClose = () => {
        onClose();
        resetModal();
    };

    if (!isOpen || !broker) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getBrokerColor(broker)} rounded-lg flex items-center justify-center`}>
                                <span className="text-white text-lg sm:text-xl font-bold">
                                    {getBrokerDisplayName(broker).charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-white">Connect {getBrokerDisplayName(broker)}</h2>
                                <p className="text-[10px] sm:text-xs text-slate-400">Secure OAuth 2.0 Authentication</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-6">
                        <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs text-green-400">
                            256-bit encrypted connection. Your credentials are secure.
                        </span>
                    </div>

                    {/* Auth Steps */}
                    {step === 'credentials' && (
                        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="userId" className="text-slate-300">User ID / Client ID</Label>
                                <Input
                                    id="userId"
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="Enter your user ID"
                                    className="mt-1 bg-slate-950 border-slate-700 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-slate-300">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="mt-1 bg-slate-950 border-slate-700 text-white"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...</>
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="otp" className="text-slate-300">Enter OTP</Label>
                                <p className="text-xs text-slate-500 mt-1 mb-2">
                                    OTP sent to your registered mobile/email
                                </p>
                                <Input
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="6-digit OTP"
                                    className="mt-1 bg-slate-950 border-slate-700 text-white text-center text-2xl tracking-widest"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep('credentials')}
                                    className="flex-1 border-slate-700"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <CheckCircle className="w-8 h-8 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-2">Connected Successfully!</h3>
                            <p className="text-slate-400">
                                Your {getBrokerDisplayName(broker)} account is now linked to Marketwise.
                            </p>
                        </div>
                    )}

                    {/* Footer Note */}
                    {step !== 'success' && (
                        <p className="text-xs text-slate-500 text-center mt-6">
                            By connecting, you agree to share portfolio data with Marketwise.
                        </p>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
