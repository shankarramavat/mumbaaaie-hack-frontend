import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BrokerType = 'zerodha' | 'groww' | 'upstox' | 'angelone' | null;

export interface PortfolioData {
    totalValue: number;
    todaysPnL: number;
    totalPnL: number;
    holdings: {
        symbol: string;
        qty: number;
        avgPrice: number;
        ltp: number;
        pnl: number;
    }[];
}

interface BrokerState {
    isConnected: boolean;
    broker: BrokerType;
    connectedAt: string | null;
    portfolioData: PortfolioData | null;

    // Actions
    connectBroker: (broker: BrokerType, portfolioData: PortfolioData) => void;
    disconnectBroker: () => void;
    updatePortfolio: (data: PortfolioData) => void;
}

export const useBrokerStore = create<BrokerState>()(
    persist(
        (set) => ({
            isConnected: false,
            broker: null,
            connectedAt: null,
            portfolioData: null,

            connectBroker: (broker, portfolioData) => set({
                isConnected: true,
                broker,
                connectedAt: new Date().toISOString(),
                portfolioData,
            }),

            disconnectBroker: () => set({
                isConnected: false,
                broker: null,
                connectedAt: null,
                portfolioData: null,
            }),

            updatePortfolio: (data) => set({ portfolioData: data }),
        }),
        {
            name: 'broker-storage',
        }
    )
);
