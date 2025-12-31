import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Layers, Zap, Database } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function SplVsErc20() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Introduction to SPL Standard: Solana vs. Ethereum
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>7 min read</span>
            <span>•</span>
            <span className="text-teal-500">Fundamentals</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          If you're coming from the Ethereum world, you're likely familiar with ERC-20 tokens. On Solana, the equivalent is the **SPL Token** (Solana Program Library). While they serve similar purposes—representing digital assets—their underlying architecture is fundamentally different.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Layers className="w-8 h-8 text-teal-500" />
          The Core Difference: Code vs. Data
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Ethereum (ERC-20)</h3>
            <p className="text-zinc-400">
              Every ERC-20 token is its own <strong>smart contract</strong> deployed on the blockchain. If there are 10,000 tokens, there are 10,000 unique contracts with their own code and logic.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-teal-400 mb-2">Solana (SPL)</h3>
            <p className="text-zinc-400">
              There is only <strong>ONE</strong> Token Program on Solana. When you create a new token, you aren't deploying code; you are simply creating a new <strong>data account</strong> that interacts with the pre-existing Token Program.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why This Matters</h3>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li>
            <strong>Security:</strong> Since you aren't writing custom code for the token logic itself, the risk of bugs or hacks is drastically reduced. The Solana Token Program is audited and battle-tested.
          </li>
          <li>
            <strong>Cost:</strong> Deploying a smart contract on Ethereum can cost hundreds of dollars. Creating an SPL token on Solana costs a fraction of a penny (plus a small rent deposit for storage).
          </li>
          <li>
            <strong>Composability:</strong> All SPL tokens follow the exact same standard, making it incredibly easy for wallets and DEXs to integrate them instantly.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-500" />
          Token Accounts & Rent
        </h2>
        <p className="text-zinc-400 mb-6">
          On Solana, holding a token requires a <strong>Token Account</strong>. This is a separate account linked to your main wallet address that stores the balance for that specific token.
        </p>
        <p className="text-zinc-400 mb-6">
          <strong>Rent:</strong> To store data on the Solana blockchain (like your token balance), you must pay "rent". This is a small amount of SOL (approx 0.002 SOL) locked in the account. If you close the token account (i.e., sell all tokens), you can recover this rent.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500" />
          Extensions: Token-2022
        </h2>
        <p className="text-zinc-400 mb-6">
          Recently, Solana introduced <strong>Token-2022</strong>, a new standard that adds advanced features previously only possible with custom contracts:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Transfer Fees:</strong> Built-in tax mechanisms (e.g., 5% on every transfer).</li>
          <li><strong>Confidential Transfers:</strong> Hiding transaction amounts for privacy.</li>
          <li><strong>Non-Transferable Tokens:</strong> Creating "Soulbound" tokens that cannot be moved.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          The SPL standard is designed for speed, efficiency, and security. By separating code from data, Solana allows developers to launch tokens in seconds without writing a single line of Rust or C++.
        </p>
        <p className="text-zinc-400 mb-6">
          Ready to experience the speed of SPL tokens? Use <strong>AiCyberProphet</strong> to mint your own in under a minute.
        </p>

        <ShareArticle title="Introduction to SPL Standard: Solana vs. Ethereum" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-teal-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Create Your SPL Token</h3>
          <p className="text-zinc-400 mb-6">
            No coding required. Just define your supply and name.
          </p>
          <Link to="/create" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Launch Now
          </Link>
        </div>
      </article>
    </div>
  );
}
