import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PieChart, Coins, BarChart3, TrendingUp } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function TokenomicsGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Complete Guide to Tokenomics for Beginners
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 26, 2025</span>
            <span>•</span>
            <span>10 min read</span>
            <span>•</span>
            <span className="text-green-500">Education</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          "Tokenomics" (Token Economics) is the study of the supply, demand, distribution, and valuation of crypto assets. It is the blueprint of a cryptocurrency's economy. A project can have the best technology in the world, but if the tokenomics are flawed, the price will likely collapse.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Coins className="w-8 h-8 text-green-500" />
          The Core Pillars of Tokenomics
        </h2>
        
        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">1. Total Supply vs. Circulating Supply</h3>
        <p className="text-zinc-400 mb-6">
          These are two different numbers, and the difference matters.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Total Supply:</strong> The maximum amount of tokens that will ever exist (unless the token has an infinite inflationary model).</li>
          <li><strong>Circulating Supply:</strong> The amount of tokens currently in the hands of the public and tradable.</li>
        </ul>
        <p className="text-zinc-400 mb-6">
          <strong>Why it matters:</strong> If the Circulating Supply is 10 million but the Total Supply is 1 billion, there is a massive "overhang." When the remaining 990 million tokens are unlocked (vested), they could be dumped on the market, crashing the price. This is known as high FDV (Fully Diluted Valuation).
        </p>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">2. Allocation and Distribution</h3>
        <p className="text-zinc-400 mb-6">
          Who gets the tokens? A typical distribution chart might look like this:
        </p>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 mb-8">
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-zinc-300">
              <span>Public Sale / Liquidity</span>
              <span className="font-mono text-green-400">50-80%</span>
            </li>
            <li className="flex justify-between items-center text-zinc-300">
              <span>Marketing & Development</span>
              <span className="font-mono text-blue-400">10-15%</span>
            </li>
            <li className="flex justify-between items-center text-zinc-300">
              <span>Team & Advisors</span>
              <span className="font-mono text-purple-400">10-15%</span>
            </li>
            <li className="flex justify-between items-center text-zinc-300">
              <span>Airdrops / Community</span>
              <span className="font-mono text-pink-400">5-10%</span>
            </li>
          </ul>
        </div>
        <p className="text-zinc-400 mb-6">
          <strong>Red Flag:</strong> If the team holds &gt;20-30% of the supply without a strict vesting schedule (lock-up period), they have too much power to crash the market.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          Inflationary vs. Deflationary Models
        </h2>
        
        <h3 className="text-xl font-bold text-white mb-2">Inflationary</h3>
        <p className="text-zinc-400 mb-4">
          New tokens are constantly created (minted) and added to the supply. Ethereum (historically) and Dogecoin are examples. This encourages spending but dilutes existing holders over time.
        </p>

        <h3 className="text-xl font-bold text-white mb-2">Deflationary</h3>
        <p className="text-zinc-400 mb-4">
          Tokens are removed from supply over time, usually through "burning." If demand stays constant or grows while supply shrinks, the price <em>should</em> increase.
        </p>
        <div className="bg-zinc-900/50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-zinc-400 text-sm">
            <strong>Buyback & Burn:</strong> A popular mechanism where the project uses revenue to buy its own tokens from the market and destroy them. This supports the price and reduces supply simultaneously.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <PieChart className="w-8 h-8 text-purple-500" />
          Designing Your Tokenomics
        </h2>
        <p className="text-zinc-400 mb-6">
          If you are using <strong>AiCyberProphet</strong> to create a token, consider these tips:
        </p>
        <ol className="list-decimal pl-6 space-y-6 text-zinc-400 mb-8">
          <li>
            <strong>Keep it Simple:</strong> Complex tax systems (e.g., 5% tax on every transaction) often discourage traders and prevent listings on major exchanges (CEXs).
          </li>
          <li>
            <strong>Lock Liquidity:</strong> When you add liquidity to a DEX, lock the LP tokens. This proves you intend to keep the market open long-term.
          </li>
          <li>
            <strong>Fair Launch:</strong> Launching with 100% of the supply in the liquidity pool (and 0% for the team) is the most trusted method for meme coins. It eliminates the fear of a team dump.
          </li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Case Study: The "Burn" Mechanism</h2>
        <p className="text-zinc-400 mb-6">
          Sending tokens to the "dead address" (Solana system address) effectively removes them from circulation. This is often done with the unsold tokens from a presale or as a community event to generate hype.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          Tokenomics is the engine of your project. A well-designed engine runs smoothly and accelerates growth. A poorly designed one will overheat and break down.
        </p>
        <p className="text-zinc-400 mb-6">
          Take the time to plan your supply and distribution before you hit that "Mint" button.
        </p>

        <ShareArticle title="Complete Guide to Tokenomics for Beginners" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-green-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Design Your Economy</h3>
          <p className="text-zinc-400 mb-6">
            Ready to bring your tokenomics to life?
          </p>
          <Link to="/create" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Token
          </Link>
        </div>
      </article>
    </div>
  );
}
