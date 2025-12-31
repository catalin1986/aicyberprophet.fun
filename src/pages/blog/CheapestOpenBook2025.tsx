import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coins, Check, X, ShoppingCart } from 'lucide-react';

export default function CheapestOpenBook2025() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <article className="prose prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Coins className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">December 29, 2025 • 4 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent leading-tight">
            The cheapest way to create an OpenBook Market ID in 2025
          </h1>

          <p className="lead text-xl text-zinc-300 mb-8">
            Stop paying 2.8 SOL ($400+) for a Market ID. Here is how you can create a fully functional OpenBook Market for just 0.4 SOL.
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Why is it so expensive?</h3>
            <p className="text-zinc-400">
              When you create an OpenBook Market, you are renting space on the Solana blockchain to store the order book data (bids, asks, event queue). The default configuration allocates a huge amount of space, costing ~2.8 SOL.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The "Economy" Market ID (0.4 SOL)</h2>
          <p className="text-zinc-400 mb-4">
            For 99% of new tokens (especially meme coins and community projects), you do <strong>not</strong> need the massive storage of the default market. The "Economy" configuration reduces the queue lengths to a minimum safe level.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
              <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                <X className="w-5 h-5" /> Standard (Old Way)
              </h4>
              <ul className="space-y-2 text-sm text-red-200/70">
                <li>Cost: ~2.8 SOL</li>
                <li>Event Queue: 2978</li>
                <li>Request Queue: 63</li>
                <li>Orderbook: 909</li>
                <li className="font-semibold mt-2">Wasted Space: 95%</li>
              </ul>
            </div>

            <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-1">RECOMMENDED</div>
              <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                <Check className="w-5 h-5" /> Economy (New Way)
              </h4>
              <ul className="space-y-2 text-sm text-green-200/70">
                <li>Cost: ~0.4 SOL</li>
                <li>Event Queue: 128</li>
                <li>Request Queue: 63</li>
                <li>Orderbook: 201</li>
                <li className="font-semibold mt-2">Perfect for Raydium</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Does "Economy" affect trading?</h2>
          <p className="text-zinc-400 mb-4">
            <strong>No.</strong> For a standard Raydium liquidity pool (AMM), the trading happens via the pool, not the order book directly. The Market ID is just a prerequisite for the pool to exist.
          </p>
          <p className="text-zinc-400 mb-6">
            Unless you are building a high-frequency trading token listed on a central limit order book (CLOB) DEX, the 0.4 SOL Market ID works exactly the same as the 2.8 SOL one.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">How to create it?</h2>
          <p className="text-zinc-400 mb-4">
            Most tools default to the expensive option to charge you more. At AiCyberProphet, we default to the Economy standard to save you money.
          </p>

          <div className="mt-12 p-8 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Save 2.4 SOL Today</h3>
            <p className="text-zinc-300 mb-6">
              Create your optimized OpenBook Market ID right now for just ~0.4 SOL.
            </p>
            <Link 
              to="/create-market" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25"
            >
              Create Cheap Market ID <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}