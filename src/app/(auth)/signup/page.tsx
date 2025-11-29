"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, ArrowRight, ArrowLeft, Check, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const steps = ["Basic Info", "Account Setup", "Verification"];

export default function SignupPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const calculatePasswordStrength = (pass: string): number => {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (pass.length >= 12) strength += 25;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength += 25;
        if (/\d/.test(pass)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(pass)) strength += 10;
        return Math.min(strength, 100);
    };

    const passwordStrength = calculatePasswordStrength(password);
    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500";
        if (passwordStrength < 70) return "bg-yellow-500";
        return "bg-green-500";
    };
    const getStrengthText = () => {
        if (passwordStrength < 40) return "Weak";
        if (passwordStrength < 70) return "Medium";
        return "Strong";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowSuccess(true);
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            }, 1500);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Check className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to Marketwise!</h2>
                    <p className="text-slate-400">Redirecting to dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-slate-400">Join Marketwise and start trading smarter</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            {steps.map((step, index) => (
                                <div key={step} className="flex items-center flex-1">
                                    <div className={`flex items-center gap-2 ${index <= currentStep ? 'text-indigo-400' : 'text-slate-600'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < currentStep ? 'bg-indigo-600' : index === currentStep ? 'bg-indigo-600' : 'bg-slate-800'
                                            }`}>
                                            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                                        </div>
                                        <span className="text-sm font-medium hidden md:block">{step}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? 'bg-indigo-600' : 'bg-slate-800'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Basic Information */}
                        {currentStep === 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" className="bg-slate-950 border-slate-700" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" className="bg-slate-950 border-slate-700" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input id="email" type="email" className="pl-10 bg-slate-950 border-slate-700" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10 bg-slate-950 border-slate-700" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" type="date" className="bg-slate-950 border-slate-700" required />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Account Setup */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input id="username" className="pl-10 bg-slate-950 border-slate-700" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 bg-slate-950 border-slate-700"
                                            required
                                        />
                                    </div>
                                    {password && (
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-400">Password Strength</span>
                                                <span className={passwordStrength >= 70 ? "text-green-400" : passwordStrength >= 40 ? "text-yellow-400" : "text-red-400"}>
                                                    {getStrengthText()}
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all ${getStrengthColor()}`} style={{ width: `${passwordStrength}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input id="confirmPassword" type="password" className="pl-10 bg-slate-950 border-slate-700" required />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <label className="flex items-start space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-600" required />
                                        <span className="text-sm text-slate-400">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link>
                                            {" "}and{" "}
                                            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link>
                                        </span>
                                    </label>
                                    <label className="flex items-start space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-600" />
                                        <span className="text-sm text-slate-400">
                                            Subscribe to market insights and trading tips
                                        </span>
                                    </label>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Verification */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center p-6 bg-slate-950/50 rounded-xl border border-slate-800">
                                    <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Setup Two-Factor Authentication</h3>
                                    <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 p-4 bg-slate-950/50 rounded-lg border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-colors">
                                        <input type="radio" name="2fa" value="sms" className="w-4 h-4 text-indigo-600" defaultChecked />
                                        <Smartphone className="w-5 h-5 text-slate-400" />
                                        <div className="flex-1">
                                            <div className="font-medium text-white">SMS Authentication</div>
                                            <div className="text-sm text-slate-400">Receive codes via text message</div>
                                        </div>
                                    </label>

                                    <label className="flex items-center space-x-3 p-4 bg-slate-950/50 rounded-lg border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-colors">
                                        <input type="radio" name="2fa" value="email" className="w-4 h-4 text-indigo-600" />
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <div className="flex-1">
                                            <div className="font-medium text-white">Email Authentication</div>
                                            <div className="text-sm text-slate-400">Receive codes via email</div>
                                        </div>
                                    </label>

                                    <label className="flex items-center space-x-3 p-4 bg-slate-950/50 rounded-lg border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-colors">
                                        <input type="radio" name="2fa" value="none" className="w-4 h-4 text-indigo-600" />
                                        <Shield className="w-5 h-5 text-slate-400" />
                                        <div className="flex-1">
                                            <div className="font-medium text-white">Setup Later</div>
                                            <div className="text-sm text-slate-400">Configure 2FA from settings</div>
                                        </div>
                                    </label>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 pt-4">
                            {currentStep > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="flex-1 border-slate-700"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : currentStep === 2 ? "Create Account" : "Continue"}
                                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
