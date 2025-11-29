"use client";

import { User, Bell, Shield, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-white">Settings</h1>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-500" /> Profile Information
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input defaultValue="Rahul" className="bg-slate-950 border-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input defaultValue="Kumar" className="bg-slate-950 border-slate-700" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input defaultValue="rahul.kumar@example.com" className="bg-slate-950 border-slate-700" />
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <Bell className="w-5 h-5 text-yellow-500" /> Notifications
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Trade Alerts</div>
                            <div className="text-sm text-slate-400">Get notified when orders are executed</div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator className="bg-slate-800" />
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Price Alerts</div>
                            <div className="text-sm text-slate-400">Get notified when stocks hit target prices</div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator className="bg-slate-800" />
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Daily Summary</div>
                            <div className="text-sm text-slate-400">Receive a daily email with market analysis</div>
                        </div>
                        <Switch />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="font-bold text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> Security
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-white">Two-Factor Authentication</div>
                            <div className="text-sm text-slate-400">Add an extra layer of security to your account</div>
                        </div>
                        <Button variant="outline" className="border-slate-700">Enable 2FA</Button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <div className="font-medium text-white">Change Password</div>
                            <div className="text-sm text-slate-400">Update your password regularly</div>
                        </div>
                        <Button variant="outline" className="border-slate-700">Update</Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
            </div>
        </div>
    );
}
