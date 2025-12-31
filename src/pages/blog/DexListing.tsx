import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Globe, Twitter, CheckCircle } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function DexListing() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Getting Listed on Dexscreener & Birdeye
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-blue-500">Marketing</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          Listing your token on chart platforms like Dexscreener and Birdeye is automatic, but getting your profile <strong>verified</strong> with social links and logos is a manual process that boosts credibility massively.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-500" />
          The Automatic Listing
        </h2>
        <p className="text-zinc-400 mb-6">
          Good news: You don't need to "apply" to simply appear on these sites. As soon as you create a liquidity pool on Raydium and the first transaction happens, Dexscreener and Birdeye bots will detect it and create a chart page for your token within minutes.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Updating Your Profile (Verification)
        </h2>
        <p className="text-zinc-400 mb-6">
          Initially, your chart page will look empty. No logo (sometimes), no website link, no Twitter. This looks suspicious to investors. Here is how to fix it:
        </p>

        <div className="space-y-8 mb-12">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Dexscreener Update</h3>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-400">
              <li>Go to your token's page on Dexscreener.</li>
              <li>Look for the "Update Token Info" or "Add Socials" button (usually near the top right or token header).</li>
              <li>You will need to pay a listing fee (historically around $300-$500 depending on their current policy) to "enhance" your profile instantly.</li>
              <li><strong>Free Method:</strong> Some updates are pulled from metadata, but for the "Verified" badge and banner, a fee is often involved.</li>
            </ol>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Birdeye Update</h3>
            <p className="text-zinc-400">
              Birdeye is more stringent. They often pull data from <strong>CoinGecko</strong> or verify manually.
              <br/>
              Look for the "Update" button on the token page. You may need to sign a message with the deployer wallet to prove ownership.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Globe className="w-8 h-8 text-purple-500" />
          Jupiter Strict List
        </h2>
        <p className="text-zinc-400 mb-6">
          This is the holy grail. Appearing on the "Strict List" means users can find your token on Jupiter (jup.ag) without pasting the contract address.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Requirement:</strong> High volume, verified metadata, and usually a listing on CoinGecko.</li>
          <li><strong>Process:</strong> It is a community governance process or managed by the Jupiter team. Focus on building volume and community first; the strict list comes later.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Pro Tip: Metadata is Key</h2>
        <p className="text-zinc-400 mb-6">
          Before paying for any updates, ensure your <strong>Metaplex Metadata</strong> (extensions) contains your website and twitter links. Many platforms (like Phantom) pull social links directly from the blockchain data, which is free!
        </p>

        <ShareArticle title="Getting Listed on Dexscreener & Birdeye" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-blue-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey</h3>
          <p className="text-zinc-400 mb-6">
            Create your token and get ready for the charts.
          </p>
          <Link to="/create" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Token
          </Link>
        </div>
      </article>
    </div>
  );
}
