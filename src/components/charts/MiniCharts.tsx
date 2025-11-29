"use client";

export function MiniChart({ data = [], color = "indigo", height = "h-20" }: { data?: number[]; color?: "indigo" | "green" | "red" | "blue"; height?: string }) {
    const chartData = data.length > 0 ? data : [30, 45, 35, 55, 40, 60, 50, 65, 55, 70];
    const max = Math.max(...chartData) || 100;
    const points = chartData.map((value, index) => {
        const x = (index / (chartData.length - 1)) * 100;
        const y = 100 - (value / max) * 100;
        return `${x},${y}`;
    }).join(' ');

    const colors = {
        indigo: "text-indigo-500",
        green: "text-green-500",
        red: "text-red-500",
        blue: "text-blue-500"
    };

    const strokeColor = colors[color as keyof typeof colors] || colors.indigo;

    return (
        <div className={`${height} w-full relative`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Area */}
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={strokeColor} style={{ stopColor: 'currentColor', stopOpacity: 0.3 }} />
                        <stop offset="100%" className={strokeColor} style={{ stopColor: 'currentColor', stopOpacity: 0 }} />
                    </linearGradient>
                </defs>
                <polygon
                    points={`0,100 ${points} 100,100`}
                    fill={`url(#gradient-${color})`}
                />
                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={strokeColor}
                />
            </svg>
        </div>
    );
}

export function PerformanceChart({ className = "" }: { className?: string }) {
    const data = Array.from({ length: 20 }, (_, i) => Math.random() * 60 + 40);

    return (
        <div className={`bg-slate-950/50 rounded-lg border border-slate-800 p-4 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-xs text-slate-500 mb-1">Performance</div>
                    <div className="text-2xl font-bold text-white">+12.5%</div>
                </div>
                <div className="text-xs text-green-400">↑ Trending Up</div>
            </div>
            <MiniChart data={data} color="green" height="h-24" />
        </div>
    );
}

export function ProfitLossChart({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-end gap-1 ${className}`}>
            {[60, 45, 70, 55, 80, 65, 75, 50, 85, 70, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                        className={`${height > 60 ? 'bg-green-500' : 'bg-red-500'} rounded-t`}
                        style={{ height: `${height}%` }}
                    />
                </div>
            ))}
        </div>
    );
}
