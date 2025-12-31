import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, AlertOctagon, Info } from 'lucide-react';

export default function TickSizeMistakes() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <article className="prose prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">December 29, 2025 • 6 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Common Tick Size mistakes that kill your token’s volume
          </h1>

          <p className="lead text-xl text-zinc-300 mb-8">
            Setting the wrong "Min Order Size" or "Tick Size" can make your token untradable or result in ugly charts with gaps. Here is how to get it right.
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">What are these parameters?</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <strong className="text-white">Min Order Size:</strong> The smallest amount of your token that can be bought or sold. (e.g., if set to 1, nobody can buy 0.5 tokens).
              </li>
              <li>
                <strong className="text-white">Price Tick (Tick Size):</strong> The smallest price increment. (e.g., if set to 0.1, the price can be 1.1 or 1.2, but not 1.15).
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The "Chart Gap" Mistake</h2>
          <p className="text-zinc-400 mb-4">
            If your <strong>Price Tick</strong> is too large, your chart will look like a staircase instead of a smooth line. This scares away traders because it looks illiquid.
          </p>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm mb-6">
            <AlertOctagon className="w-4 h-4 inline-block mr-2 mb-1" />
            <strong>Example:</strong> A meme token with a price of $0.000001 needs a very small tick size (like 0.00000001). If you set it to 0.01, the price can basically never move.
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The "Untradable Dust" Mistake</h2>
          <p className="text-zinc-400 mb-4">
            If your <strong>Min Order Size</strong> is too large (e.g., 1000 tokens) but your token is expensive, users might not be able to sell their "dust" (small balances).
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Recommended Values Cheat Sheet</h2>
          <p className="text-zinc-400 mb-4">
            The correct values depend entirely on your <strong>Token Supply</strong>. Assuming a standard 9-decimal token:
          </p>

          <div className="overflow-x-auto border border-zinc-800 rounded-xl mb-8">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-900 text-zinc-400 font-medium">
                <tr>
                  <th className="px-6 py-3">Total Supply</th>
                  <th className="px-6 py-3">Min Order Size</th>
                  <th className="px-6 py-3">Tick Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr className="bg-zinc-900/30">
                  <td className="px-6 py-3 font-mono">100,000</td>
                  <td className="px-6 py-3 font-mono">0.01</td>
                  <td className="px-6 py-3 font-mono">0.0001</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-mono">1 Million</td>
                  <td className="px-6 py-3 font-mono">0.1</td>
                  <td className="px-6 py-3 font-mono">0.00001</td>
                </tr>
                <tr className="bg-zinc-900/30">
                  <td className="px-6 py-3 font-mono">100 Million</td>
                  <td className="px-6 py-3 font-mono">10</td>
                  <td className="px-6 py-3 font-mono">0.0000001</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-mono">1 Billion</td>
                  <td className="px-6 py-3 font-mono">100</td>
                  <td className="px-6 py-3 font-mono">0.00000001</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Don't Guess. Use a Tool.</h2>
          <p className="text-zinc-400 mb-4">
            Manually calculating these values is prone to error. One typo can ruin your market ID (and you can't edit it, you have to pay to create a new one!).
          </p>
          <p className="text-zinc-400 mb-6">
            Our <strong>Create Market ID</strong> tool has a built-in "Advanced Configuration Guide" that auto-fills these values based on your supply.
          </p>

          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Configure Perfectly Every Time</h3>
            <p className="text-zinc-300 mb-6">
              Use our auto-fill feature to ensure your Market ID is perfect for Raydium.
            </p>
            <Link 
              to="/create-market" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
            >
              Go to Market Creator <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}