import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coins, Lock, Ban, RefreshCw } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function SupplyManagement() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Minting & Supply Management: Fixed vs. Infinite
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>7 min read</span>
            <span>•</span>
            <span className="text-green-500">Tokenomics</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          One of the first decisions you make when creating a token is the supply. But is that number final? It depends on your "Mint Authority." Understanding how to manage supply is crucial for your project's economic model.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Coins className="w-8 h-8 text-green-500" />
          How Minting Works
        </h2>
        <p className="text-zinc-400 mb-6">
          "Minting" is the process of creating new tokens out of thin air. When you first launch a token, you mint the initial supply (e.g., 1 Billion).
        </p>
        <p className="text-zinc-400 mb-6">
          If you retain <strong>Mint Authority</strong>, you can call the "Mint To" function at any time to add more tokens to your wallet. This increases the Total Supply.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Lock className="w-8 h-8 text-red-500" />
          Fixed Supply (The Gold Standard)
        </h2>
        <p className="text-zinc-400 mb-6">
          Most investors in the meme coin and DeFi space demand a <strong>Fixed Supply</strong>. This means no more tokens can ever be created.
        </p>
        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">How to achieve it?</h3>
        <p className="text-zinc-400 mb-6">
          You must <strong>Revoke Mint Authority</strong>. This is a one-way transaction. Once revoked, the supply is capped forever.
        </p>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 mb-8">
          <h4 className="text-lg font-bold text-white mb-2">Why investors love this:</h4>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li><strong>No Inflation:</strong> Their share of the pie cannot be diluted.</li>
            <li><strong>No Rug Pull via Minting:</strong> A malicious dev can't mint 10 trillion tokens and dump them on the market, crashing the price to zero.</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-500" />
          When to Keep Mint Authority?
        </h2>
        <p className="text-zinc-400 mb-6">
          Not all tokens should have a fixed supply. Some legitimate use cases include:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Game Rewards:</strong> Play-to-Earn games often need to mint new tokens to reward players.</li>
          <li><strong>Utility Tokens:</strong> If the token is consumed (burned) for a service, you might need to mint more to maintain liquidity.</li>
          <li><strong>Stablecoins:</strong> USDC is minted when dollars are deposited and burned when dollars are withdrawn.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Ban className="w-8 h-8 text-orange-500" />
          Burning Tokens
        </h2>
        <p className="text-zinc-400 mb-6">
          Burning is the opposite of minting. It removes tokens from circulation permanently.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Deflationary Mechanism:</strong> Reducing supply can increase scarcity.</li>
          <li><strong>Trust Signal:</strong> Burning the LP tokens (Liquidity Pool tokens) proves you can't withdraw the liquidity.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          For 99% of community projects, the roadmap is simple: Mint the supply -&gt; Revoke Mint Authority immediately. This builds the trust needed to succeed.
        </p>

        <ShareArticle title="Minting & Supply Management: Fixed vs. Infinite" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-green-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Set Your Supply</h3>
          <p className="text-zinc-400 mb-6">
            Create a fixed-supply token in seconds.
          </p>
          <Link to="/create" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start Minting
          </Link>
        </div>
      </article>
    </div>
  );
}
