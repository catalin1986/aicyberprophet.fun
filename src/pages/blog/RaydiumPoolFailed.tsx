import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Droplets } from 'lucide-react';

export default function RaydiumPoolFailed() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <article className="prose prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Droplets className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">December 29, 2025 • 5 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent leading-tight">
            Why your Raydium pool creation failed (and how to fix it)
          </h1>

          <p className="lead text-xl text-zinc-300 mb-8">
            There is nothing more frustrating than paying the fees, clicking "Create Pool", and seeing a red error message. Here is the definitive guide to troubleshooting Raydium pool creation errors in 2025.
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Quick Checklist Before You Panic
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Do you have at least 0.5 SOL extra in your wallet for gas fees?</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Is your Token Mint Authority revoked? (Recommended but not strictly required)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Are you using the correct OpenBook Market ID?</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Error #1: "Transaction Simulation Failed"</h2>
          <p className="text-zinc-400 mb-4">
            This is the most common and vague error. It usually means one of three things:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 mb-6">
            <li><strong>Insufficient Funds:</strong> You need to cover the Rent (storage) for the pool accounts plus the transaction fee. Raydium pools require about 0.4 SOL in rent fees. If you have exactly 0.4 SOL, it will fail. Always keep ~0.1 SOL buffer.</li>
            <li><strong>Slippage Tolerance:</strong> If you are adding liquidity and trying to buy immediately (snipe), network volatility might cause the transaction to fail. Increase slippage if possible.</li>
            <li><strong>Frozen Token:</strong> Check if your token has "Freeze Authority" enabled and if the account is frozen.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Error #2: Incorrect Market ID Configuration</h2>
          <p className="text-zinc-400 mb-4">
            If you created a "Cheap" Market ID (0.4 SOL) but are trying to pair it with a Quote Token that requires high precision (like USDC), the <strong>Base Lot Size</strong> or <strong>Quote Lot Size</strong> might be invalid.
          </p>
          <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl mb-6">
            <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              The Mismatch Problem
            </h4>
            <p className="text-sm text-red-200/80">
              If your token has 9 decimals but your Market ID was configured for a token with 6 decimals, the math won't add up during pool creation. Always ensure your Market ID Tick Sizes match your token's supply and decimals.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Error #3: The "OpenBook Market Not Found" Error</h2>
          <p className="text-zinc-400 mb-4">
            Sometimes Raydium cannot index your Market ID immediately after creation.
          </p>
          <p className="text-zinc-400 mb-6">
            <strong>Solution:</strong> Wait 1-2 minutes after creating your Market ID before attempting to create the Liquidity Pool. Solana is fast, but indexers (APIs) need time to catch up.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">How to Fix It Fast</h2>
          <p className="text-zinc-400 mb-4">
            If you are stuck, the easiest solution is often to use a dedicated tool that handles the parameters for you. Our <strong>AiCyberProphet Liquidity Creator</strong> automatically checks for these errors before submission.
          </p>

          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Launch Correctly?</h3>
            <p className="text-zinc-300 mb-6">
              Don't waste SOL on failed transactions. Use our optimized tool to create your Liquidity Pool in seconds.
            </p>
            <Link 
              to="/create-liquidity" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25"
            >
              Create Liquidity Pool Now <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}