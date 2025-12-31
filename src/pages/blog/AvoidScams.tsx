import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Eye, Search, AlertOctagon } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function AvoidScams() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            How to Avoid Scams in Crypto
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 25, 2025</span>
            <span>•</span>
            <span>7 min read</span>
            <span>•</span>
            <span className="text-red-500">Safety</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          The crypto space is often called the "Wild West." While the opportunities for profit are high, so are the risks. Scammers are becoming increasingly sophisticated, but by learning to spot the red flags, you can protect your portfolio.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          Common Types of Scams
        </h2>

        <div className="space-y-8 mb-12">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">1. The Rug Pull</h3>
            <p className="text-zinc-400">
              The developer creates a token, adds liquidity to a DEX, waits for people to buy, and then suddenly removes all the liquidity. The price drops to zero instantly, and you cannot sell your tokens.
              <br />
              <strong>Defense:</strong> Check if liquidity is <strong>locked</strong> or <strong>burned</strong>.
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">2. The Honeypot</h3>
            <p className="text-zinc-400">
              A token that you can buy but cannot sell. The smart contract contains malicious code that blacklists buyers or disables selling for everyone except the creator.
              <br />
              <strong>Defense:</strong> Use simulation tools like RugCheck to see if a sell transaction is possible.
            </p>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">3. Wallet Drainers</h3>
            <p className="text-zinc-400">
              Phishing websites that look like legitimate minting pages or airdrop claims. When you connect your wallet and approve a transaction, it grants the site permission to drain all your assets.
              <br />
              <strong>Defense:</strong> Never click on random links in DMs or Discord. Always verify the URL. Use a "burner wallet" for connecting to new sites.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Search className="w-8 h-8 text-blue-500" />
          How to DYOR (Do Your Own Research)
        </h2>
        <p className="text-zinc-400 mb-6">
          Before investing in any new Solana token, run through this checklist:
        </p>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">1. Check the Contract Authority</h3>
        <p className="text-zinc-400 mb-6">
          As mentioned in our Freeze Authority guide, check if the developer still has control over the contract.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400 mb-8">
          <li><strong>Mint Authority:</strong> Can they print more tokens? (Should be revoked/disabled)</li>
          <li><strong>Freeze Authority:</strong> Can they freeze your wallet? (Should be revoked/disabled)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">2. Analyze the Top Holders</h3>
        <p className="text-zinc-400 mb-6">
          Go to a block explorer (Solscan) and look at the "Holders" tab.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400 mb-8">
          <li>If the top 1 wallet holds 50% of the supply (and it's not the liquidity pool or a vesting contract), run away.</li>
          <li>Watch out for "wallet clusters" – multiple wallets holding exactly 4.9% each. This is often the dev trying to hide a large supply share.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-white mt-8 mb-4">3. Social Proof Check</h3>
        <p className="text-zinc-400 mb-6">
          Does the project have an active Twitter and Telegram? Are the followers real or bots?
        </p>
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20 mb-8">
          <p className="text-red-300 text-sm flex items-start gap-2">
            <AlertOctagon className="w-5 h-5 shrink-0" />
            <span>
              <strong>Warning:</strong> Be skeptical of "influencers" shilling a token. They are often paid in tokens to promote it and will dump on their followers.
            </span>
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tools of the Trade</h2>
        <p className="text-zinc-400 mb-6">
          Bookmark these sites to help you vet projects:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-400 mb-8">
          <li><strong>Solscan.io:</strong> The official block explorer.</li>
          <li><strong>RugCheck.xyz:</strong> Automated security analysis for Solana tokens.</li>
          <li><strong>Birdeye.so:</strong> Charts and trading data.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Final Thoughts</h2>
        <p className="text-zinc-400 mb-6">
          If something sounds too good to be true, it probably is. Protect your private keys, never share your seed phrase, and always double-check URLs.
        </p>
        <p className="text-zinc-400 mb-6">
          At <strong>AiCyberProphet</strong>, we prioritize security by providing tools that encourage best practices, like revoking dangerous authorities by default.
        </p>

        <ShareArticle title="How to Avoid Scams in Crypto" />

        <div className="mt-16 border-t border-zinc-800 pt-8">
          <p className="text-zinc-500 italic text-sm text-center">
            Disclaimer: This article is for educational purposes only and does not constitute financial advice. Cryptocurrency investments carry high risk.
          </p>
        </div>
      </article>
    </div>
  );
}
