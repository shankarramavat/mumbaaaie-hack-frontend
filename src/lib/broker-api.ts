import { BrokerType, PortfolioData } from './broker-store';

// Simulate OAuth login delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock portfolio data for each broker
const mockPortfolioData: Record<Exclude<BrokerType, null>, PortfolioData> = {
    zerodha: {
        totalValue: 845250,
        todaysPnL: 12450,
        totalPnL: 145250,
        holdings: [
            { symbol: 'RELIANCE', qty: 100, avgPrice: 2950, ltp: 2980, pnl: 3000 },
            { symbol: 'TCS', qty: 50, avgPrice: 3250, ltp: 3280, pnl: 1500 },
            { symbol: 'INFY', qty: 150, avgPrice: 1420, ltp: 1450, pnl: 4500 },
            { symbol: 'HDFCBANK', qty: 75, avgPrice: 1480, ltp: 1450, pnl: -2250 },
            { symbol: 'SBIN', qty: 200, avgPrice: 730, ltp: 750, pnl: 4000 },
        ],
    },
    groww: {
        totalValue: 672100,
        todaysPnL: 8920,
        totalPnL: 92100,
        holdings: [
            { symbol: 'TATAMOTORS', qty: 200, avgPrice: 780, ltp: 795, pnl: 3000 },
            { symbol: 'WIPRO', qty: 120, avgPrice: 455, ltp: 470, pnl: 1800 },
            { symbol: 'ADANIENT', qty: 50, avgPrice: 3100, ltp: 3250, pnl: 7500 },
        ],
    },
    upstox: {
        totalValue: 523400,
        todaysPnL: 6780,
        totalPnL: 73400,
        holdings: [
            { symbol: 'BHARTIARTL', qty: 150, avgPrice: 1120, ltp: 1145, pnl: 3750 },
            { symbol: 'ITC', qty: 300, avgPrice: 442, ltp: 450, pnl: 2400 },
            { symbol: 'MARUTI', qty: 10, avgPrice: 12500, ltp: 12850, pnl: 3500 },
        ],
    },
    angelone: {
        totalValue: 398200,
        todaysPnL: 5120,
        totalPnL: 48200,
        holdings: [
            { symbol: 'AXISBANK', qty: 100, avgPrice: 1025, ltp: 1042, pnl: 1700 },
            { symbol: 'BAJFINANCE', qty: 25, avgPrice: 7850, ltp: 7920, pnl: 1750 },
        ],
    },
};

export async function simulateOAuthLogin(broker: BrokerType): Promise<PortfolioData> {
    if (!broker) throw new Error('No broker selected');

    // Simulate OAuth redirect and authentication
    await simulateDelay(2000);

    // Return mock portfolio data
    return mockPortfolioData[broker];
}

export async function fetchPortfolioData(broker: BrokerType): Promise<PortfolioData | null> {
    if (!broker) return null;

    await simulateDelay(500);
    return mockPortfolioData[broker];
}

export function getBrokerDisplayName(broker: BrokerType): string {
    const names: Record<Exclude<BrokerType, null>, string> = {
        zerodha: 'Zerodha',
        groww: 'Groww',
        upstox: 'Upstox',
        angelone: 'Angel One',
    };
    return broker ? names[broker] : '';
}

export function getBrokerColor(broker: BrokerType): string {
    const colors: Record<Exclude<BrokerType, null>, string> = {
        zerodha: 'bg-green-500',
        groww: 'bg-blue-500',
        upstox: 'bg-purple-600',
        angelone: 'bg-orange-500',
    };
    return broker ? colors[broker] : 'bg-slate-500';
}
