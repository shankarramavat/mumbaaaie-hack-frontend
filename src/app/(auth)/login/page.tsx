"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Phone, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = "/dashboard";
        }, 1500);
    };

    const handlePhoneLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowOTP(true);
    };

    const handleOTPChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOtp(newOTP);

            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            window.location.href = "/dashboard";
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Sign in to continue to Marketwise</p>
                    </div>

                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="phone">Phone</TabsTrigger>
                        </TabsList>

                        <TabsContent value="email">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10 bg-slate-950 border-slate-700 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-300">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10 bg-slate-950 border-slate-700 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600" />
                                        <span className="text-sm text-slate-400">Remember me</span>
                                    </label>
                                    <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 h-11"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                    {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="phone">
                            <AnimatePresence mode="wait">
                                {!showOTP ? (
                                    <motion.form
                                        key="phone-form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        onSubmit={handlePhoneLogin}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    className="pl-10 bg-slate-950 border-slate-700 text-white"
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500">We'll send you a 6-digit OTP</p>
                                        </div>

                                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11">
                                            Send OTP
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key="otp-form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleOTPSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Enter OTP</Label>
                                            <div className="flex gap-2 justify-center">
                                                {otp.map((digit, index) => (
                                                    <Input
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                                        className="w-12 h-12 text-center bg-slate-950 border-slate-700 text-white text-lg font-mono"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-500 text-center">
                                                Didn't receive code? <button type="button" className="text-indigo-400 hover:text-indigo-300">Resend</button>
                                            </p>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 h-11"
                                            disabled={loading || otp.some(d => !d)}
                                        >
                                            {loading ? "Verifying..." : "Verify & Sign In"}
                                            {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setShowOTP(false)}
                                            className="w-full text-slate-400"
                                        >
                                            Back to phone number
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                                <Chrome className="w-4 h-4 mr-2" />
                                Google
                            </Button>
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
