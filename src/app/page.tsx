'use client';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { http } from 'viem';
import { sepolia } from 'viem/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NFTGenerator from './components/NFTGenerator';
import WalletConnect from './components/WalletConnect';
import Gallery from './components/Gallery';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'AI NFT Generator',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  },
});

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider config={config}>
        <main className="min-h-screen p-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            AI NFT Generator
          </h1>
          <WalletConnect />
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Generate & Mint</h2>
              <NFTGenerator />
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Your NFT Gallery</h2>
              <Gallery />
            </section>
          </div>
        </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
