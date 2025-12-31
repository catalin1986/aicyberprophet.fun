import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShieldCheck, AlertOctagon, Terminal } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function ContractAnalysis() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Smart Contract Analysis: How to Check for Rugs
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span className="text-red-500">Security</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          "DYOR" (Do Your Own Research) is the golden rule of crypto. But what exactly should you research? This guide teaches you how to audit a Solana token contract in 5 minutes using free tools.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Search className="w-8 h-8 text-blue-500" />
          The "Rug Check" Checklist
        </h2>
        <p className="text-zinc-400 mb-6">
          Before buying any token, paste its address into a tool like <strong>RugCheck.xyz</strong> or check it on <strong>Solscan</strong>. Look for these green flags:
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              1. Mint Authority: Disabled
            </h3>
            <p className="text-zinc-400">
              If Mint Authority is enabled, the developer can print unlimited tokens and sell them, driving the price to zero. It MUST be "Revoked" or "Null".
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              2. Freeze Authority: Disabled
            </h3>
            <p className="text-zinc-400">
              If enabled, the developer can freeze your wallet so you can't sell. This is common in "Honeypot" scams.
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              3. LP Liquidity: Burned or Locked
            </h3>
            <p className="text-zinc-400">
              Look at the top holders. The largest holder should be the Liquidity Pool (Raydium Authority). Check if the LP tokens are "Burned" (sent to the Incinerator) or locked in a reputable locker (Streamflow, PinkSale) for a long time (e.g., 100 years).
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <AlertOctagon className="w-8 h-8 text-red-500" />
          Red Flags (Run Away!)
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Top 10 Holders own &gt; 30%:</strong> Unless these are exchange wallets or locked vesting contracts, this is dangerous. One person selling could crash the chart.</li>
          <li><strong>Mutable Metadata:</strong> While not always a scam, a dev could change the token image to something offensive or change the website link to a drainer after launch.</li>
          <li><strong>Suspicious Deployer:</strong> Check the dev's wallet on Solscan. Did they fund the wallet from a "Mixer" (like Tornado Cash) or a known scammer address?</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-purple-500" />
          Advanced: Simulation
        </h2>
        <p className="text-zinc-400 mb-6">
          Some honeypots are clever. They disable Freeze Authority but use custom code (Token-2022 extensions) to tax you 100% on sales.
        </p>
        <p className="text-zinc-400 mb-6">
          <strong>The Defense:</strong> Use a transaction simulator (built into many wallets like Phantom or tools like Jupiter). Try to simulate a "Sell" of small value. If the simulation fails or shows "Expected Output: 0", it's a scam.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          Scammers prey on FOMO (Fear Of Missing Out). Taking 2 minutes to check these parameters can save you from losing your entire investment. Stay safe!
        </p>

        <ShareArticle title="Smart Contract Analysis: How to Check for Rugs" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-red-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Launch a Trustworthy Token</h3>
          <p className="text-zinc-400 mb-6">
            AiCyberProphet encourages best practices like revoking authorities by default.
          </p>
          <Link to="/create" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Safe Token
          </Link>
        </div>
      </article>
    </div>
  );
}
