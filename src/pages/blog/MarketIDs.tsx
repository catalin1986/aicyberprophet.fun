import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, DollarSign, Cpu, FileText } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function MarketIDs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            The Guide to OpenBook Market IDs
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-orange-500">Technical</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          Before you can create a liquidity pool on Raydium, you need an **OpenBook Market ID**. This step often confuses beginners and can be the most expensive part of the launch if not done correctly.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          What is OpenBook?
        </h2>
        <p className="text-zinc-400 mb-6">
          OpenBook is the central limit order book (CLOB) on Solana. Even though Raydium is an AMM (Automated Market Maker), it interacts with the OpenBook order book ecosystem. A "Market ID" is essentially the allocated space on the blockchain where buy and sell orders for your token pair will be stored.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-green-500" />
          The Cost Factor
        </h2>
        <p className="text-zinc-400 mb-6">
          Creating a Market ID requires paying "rent" to the Solana network to store data.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">Standard Market (~3 SOL)</h3>
            <p className="text-zinc-400">
              The "old school" high-cost market. It reserves a large amount of space. Necessary for very high-frequency trading but overkill for most meme coins.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold text-green-400 mb-2">Cheap Market (~0.2 - 0.5 SOL)</h3>
            <p className="text-zinc-400">
              By optimizing the "Event Queue" and "Request Queue" lengths, you can drastically reduce the storage rent. This is what 99% of new projects use today.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Cpu className="w-8 h-8 text-blue-500" />
          How to Create a Market ID
        </h2>
        <ol className="list-decimal pl-6 space-y-6 text-zinc-400 mb-8">
          <li>
            <strong>Choose a Tool:</strong> Use platforms like Raydium's UI (often more expensive default settings) or specialized tools like OpenBook Lab or Smithii that allow custom parameters.
          </li>
          <li>
            <strong>Configure Parameters:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Base Mint:</strong> Your Token Address.</li>
              <li><strong>Quote Mint:</strong> Usually SOL (So11111111111111111111111111111111111111112).</li>
              <li><strong>Min Order Size:</strong> The smallest amount of tokens that can be bought.</li>
              <li><strong>Price Tick:</strong> The smallest price increment (decimals).</li>
            </ul>
          </li>
          <li>
            <strong>Sign & Pay:</strong> Confirm the transaction. You will receive a Market ID (a long alphanumeric string).
          </li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <FileText className="w-8 h-8 text-yellow-500" />
          Common Errors
        </h2>
        <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
          <h3 className="text-lg font-bold text-red-400 mb-2">Price Tick / Min Order Size Mismatch</h3>
          <p className="text-zinc-300">
            If you set these incorrectly, Raydium might show "Price too small" or "Price too large" errors when you try to add liquidity.
            <br/><br/>
            <strong>Rule of Thumb:</strong> If your token has a large supply (e.g., 1 Billion), set Min Order Size to 1 and Price Tick to 5 or 6 decimals.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Summary</h2>
        <p className="text-zinc-400 mb-6">
          The Market ID is the bridge between your token and the trading world. Don't overspend on a 3 SOL market unless you are building a major DeFi protocol. A 0.3 SOL market is perfectly fine for 99% of use cases.
        </p>

        <ShareArticle title="The Guide to OpenBook Market IDs" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-orange-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">First Step: Create Your Token</h3>
          <p className="text-zinc-400 mb-6">
            You can't make a market without a token.
          </p>
          <Link to="/create" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Mint Token Now
          </Link>
        </div>
      </article>
    </div>
  );
}
