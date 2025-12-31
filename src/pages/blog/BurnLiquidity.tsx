import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Lock, TrendingUp, Droplets } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function BurnLiquidity() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            The Guide to Burning Liquidity (LP Tokens)
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-orange-500">Launch Strategy</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          "Liquidity Burned" is the most bullish phrase in a token launch. But what does it mean? And how do you do it to prove to your community that their funds are safe?
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Droplets className="w-8 h-8 text-blue-500" />
          What are LP Tokens?
        </h2>
        <p className="text-zinc-400 mb-6">
          When you create a liquidity pool on Raydium by depositing your Token + SOL, Raydium gives you back a receipt called <strong>LP Tokens</strong>.
        </p>
        <p className="text-zinc-400 mb-6">
          Whoever holds these LP Tokens has the right to go back to Raydium and withdraw the Token + SOL from the pool. If the dev keeps these tokens, they can withdraw all the SOL at any time. This is a "Rug Pull".
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Flame className="w-8 h-8 text-orange-500" />
          Burning vs. Locking
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-orange-400 mb-2">Burning</h3>
            <p className="text-zinc-400">
              You send the LP tokens to the Solana Incinerator address (not a random dead wallet, but the protocol level burn). This is permanent. The liquidity can <strong>NEVER</strong> be removed.
              <br/><br/>
              <strong>Pros:</strong> Maximum trust. Community loves it.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Locking</h3>
            <p className="text-zinc-400">
              You use a service like Streamflow to lock the LP tokens for a set period (e.g., 6 months).
              <br/><br/>
              <strong>Pros:</strong> You can recover the liquidity later if you want to migrate to a new DEX.
              <br/><strong>Cons:</strong> Investors might fear what happens when the lock expires.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Lock className="w-8 h-8 text-green-500" />
          How to Burn Properly
        </h2>
        <ol className="list-decimal pl-6 space-y-6 text-zinc-400 mb-8">
          <li><strong>Create Pool:</strong> Launch your pool on Raydium.</li>
          <li><strong>Check Wallet:</strong> Verify you have received the LP tokens (check the "Unknown" or "LP" tab in Phantom).</li>
          <li><strong>Send to Sol Incinerator:</strong> Send the full amount of LP tokens to the official Solana Token Burn tool or simply send them to the system burn address. 
          <br/><em>Note: Most modern tools like Sol Incinerator provide a UI for this.</em></li>
          <li><strong>Verify:</strong> Go to Solscan, find the LP token address, and verify the supply has decreased or the holder is the system address.</li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          If you are building a community token (meme coin), burning liquidity is the standard. It shows you are committed to the project long-term and aren't just looking for a quick exit.
        </p>

        <ShareArticle title="The Guide to Burning Liquidity (LP Tokens)" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-orange-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Launch?</h3>
          <p className="text-zinc-400 mb-6">
            Get your token ready for the liquidity pool.
          </p>
          <Link to="/create" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Token
          </Link>
        </div>
      </article>
    </div>
  );
}
