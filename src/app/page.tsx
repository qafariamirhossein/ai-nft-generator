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
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';

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
        <RainbowKitProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
            <Header />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  AI NFT Generator
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  Create unique AI-generated artwork and mint it as NFTs on the Ethereum blockchain
                </p>
                <WalletConnect />
              </div>

              {/* Features Section */}
              <Features />

              {/* Main Content */}
              <div className="space-y-16 mt-16">
                <section id="generate" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Generate & Mint Your NFT
                  </h2>
                  <NFTGenerator />
                </section>
                
                <section id="gallery" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Your NFT Gallery
                  </h2>
                  <Gallery />
                </section>
                
                {/* <section id="about" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mt-16">
                  <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    About
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                    This project was created by AmirHossein Qafari. AI NFT Generator lets you create unique AI-generated artwork and mint it as NFTs on the Ethereum blockchain. Built with ❤️ using Next.js, RainbowKit, and modern Web3 tools.
                  </p>
                </section> */}
                <Footer />
              </div>
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
