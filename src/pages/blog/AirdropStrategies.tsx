import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Users, Target, Zap } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function AirdropStrategies() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Effective Airdrop Strategies on Solana
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span className="text-yellow-500">Marketing</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          Airdrops are one of the most powerful marketing tools in crypto. They distribute your token to hundreds or thousands of wallets, creating instant holders and buzz. But doing it blindly is a waste of money. Here is how to execute a smart airdrop strategy.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-red-500" />
          Targeting the Right Wallets
        </h2>
        <p className="text-zinc-400 mb-6">
          Sending tokens to random addresses is useless. They will likely ignore them or mark them as spam. You need to target active, relevant users.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Competitor Holders:</strong> Snapshot the holders of a similar successful project (e.g., if you launch a dog coin, target $BONK or $WIF holders).</li>
          <li><strong>NFT Communities:</strong> Solana NFT communities are very active. Airdropping to holders of "Mad Lads" or "Tensorians" can get the attention of influential users.</li>
          <li><strong>Active Traders:</strong> Use on-chain data to find wallets that have traded on Raydium in the last 24 hours.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500" />
          Tools for Airdropping
        </h2>
        <p className="text-zinc-400 mb-6">
          Do not try to send tokens manually one by one. It will take forever and cost a fortune in fees.
        </p>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 mb-8">
          <h3 className="text-xl font-bold text-white mb-2">Multisender Tools</h3>
          <p className="text-zinc-400">
            Use tools (like the one coming soon to AiCyberProphet) that allow you to upload a CSV file of addresses and amounts. These tools batch hundreds of transfers into a single transaction, saving massive amounts of SOL on gas fees.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          The "Claim" vs. "Push" Model
        </h2>
        
        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Push Airdrop</h3>
        <p className="text-zinc-400 mb-6">
          You send the tokens directly to the user's wallet.
          <br/><strong>Pros:</strong> User sees it immediately (if they check).
          <br/><strong>Cons:</strong> You pay the rent for the token account creation if the user doesn't have one (~0.002 SOL per user). This gets expensive fast (1000 users = 2 SOL).
        </p>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Claim Site</h3>
        <p className="text-zinc-400 mb-6">
          You build a website where eligible users connect their wallet to claim.
          <br/><strong>Pros:</strong> The user pays the gas/rent fees. You filter for only interested users.
          <br/><strong>Cons:</strong> Requires web development and marketing to drive traffic to the site.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Avoiding the "Dust" Label</h2>
        <p className="text-zinc-400 mb-6">
          Wallets like Phantom often hide small, unknown token balances in a "Hidden" folder to protect users from spam.
        </p>
        <p className="text-zinc-400 mb-6">
          <strong>Tip:</strong> Ensure your metadata (Logo, Name, Symbol) is correctly set up via Metaplex. Tokens with broken metadata are almost always flagged as spam.
        </p>

        <ShareArticle title="Effective Airdrop Strategies on Solana" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-yellow-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Plan Your Airdrop</h3>
          <p className="text-zinc-400 mb-6">
            Start by creating your token supply and reserving a portion for marketing.
          </p>
          <Link to="/create" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Token
          </Link>
        </div>
      </article>
    </div>
  );
}
