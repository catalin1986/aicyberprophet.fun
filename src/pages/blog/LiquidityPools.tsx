import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, TrendingUp, AlertTriangle, Settings } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function LiquidityPools() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            How to Create a Liquidity Pool on Raydium
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>9 min read</span>
            <span>•</span>
            <span className="text-purple-500">Launch Strategy</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          Creating a token is just the first step. For people to buy and sell it, you need a <strong>Liquidity Pool (LP)</strong>. Raydium is the leading Automated Market Maker (AMM) on Solana. This guide walks you through the process.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Settings className="w-8 h-8 text-purple-500" />
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Your Token:</strong> Minted and in your wallet.</li>
          <li><strong>Quote Token (SOL):</strong> You need SOL to pair with your token. This establishes the initial price.</li>
          <li><strong>OpenBook Market ID:</strong> A requirement for Raydium. (See our guide on Market IDs).</li>
          <li><strong>Fees:</strong> Approx 0.4 - 3 SOL depending on network congestion and OpenBook costs.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Droplets className="w-8 h-8 text-blue-500" />
          Step-by-Step Guide
        </h2>

        <div className="space-y-8 mb-12">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Step 1: Go to Raydium Liquidity</h3>
            <p className="text-zinc-400">
              Navigate to <a href="https://raydium.io/liquidity/create/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Raydium Create Pool</a>. Connect your wallet.
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Step 2: Select Tokens & Market ID</h3>
            <p className="text-zinc-400">
              Paste your <strong>OpenBook Market ID</strong>. Raydium should automatically detect your Base Token (your new coin) and the Quote Token (SOL).
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Step 3: Set Initial Price</h3>
            <p className="text-zinc-400 mb-4">
              This is the most critical math part. The price is determined by the ratio of tokens to SOL you add.
            </p>
            <div className="bg-black/40 p-4 rounded-lg font-mono text-sm text-zinc-300">
              Example:<br/>
              If you add 1,000,000 Tokens and 10 SOL.<br/>
              Price = 10 / 1,000,000 = 0.00001 SOL per Token.
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Step 4: Launch Date</h3>
            <p className="text-zinc-400">
              You can set a specific launch time. If you leave it blank, the pool opens immediately upon transaction confirmation.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          Important Considerations
        </h2>
        
        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Burning LP Tokens</h3>
        <p className="text-zinc-400 mb-6">
          When you create the pool, you receive <strong>LP Tokens</strong>. These represent your ownership of the liquidity. To prove to investors that you cannot "rug pull" (remove the liquidity), you should <strong>burn</strong> these tokens or lock them in a locker service like Streamflow or PinkSale.
        </p>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Sniper Bots</h3>
        <p className="text-zinc-400 mb-6">
          Be aware that as soon as a pool is detected on-chain, automated bots ("snipers") will try to buy large amounts in the first block. There is little you can do to stop this completely on a standard AMM, but announcing your launch time carefully can help.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          Launching a liquidity pool makes your token tradable by the world. Ensure you have enough SOL budget for the initial liquidity and the fees.
        </p>

        <ShareArticle title="How to Create a Liquidity Pool on Raydium" />

        <div className="mt-16 border-t border-zinc-800 pt-8">
          <p className="text-zinc-500 italic text-sm text-center">
            Disclaimer: Providing liquidity carries the risk of Impermanent Loss. Ensure you understand DeFi mechanics before depositing funds.
          </p>
        </div>
      </article>
    </div>
  );
}
