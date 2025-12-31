import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Settings, DollarSign, Database, Terminal, CheckCircle } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function OpenBookGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Creating an Openbook Market ID in Solana: Step-by-step guide
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span className="text-orange-500">Technical Guide</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          If you want to create an OpenBook Market or Market ID on Solana, i.e. a pair of tokens with which to create a liquidity pool, this post is for you. We are going to teach you how to create an OpenBook in just 1 minute and without having to program ANY code. Moreover, from only 0.4 SOL, cheaper than in Raydium.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          What is an Openbook Market?
        </h2>
        <p className="text-zinc-400 mb-6">
          Before moving on to the creation process we must understand what OpenBook Market ID means and how it works in order to do it optimally and make the most of our Solana.
        </p>
        <p className="text-zinc-400 mb-6">
          We call OpenBook Market or Market ID the fact of creating a "market" where a pair of tokens is exchanged. That is, we call Market the concept of "Token Pair" on Solana.
        </p>
        <p className="text-zinc-400 mb-6">
          This market occupies a space in the blockchain that allows the processing of transactions of that pair of tokens. The size of this market will determine the amount of transactions that it can support at the same time, which will depend on what we invest at the time of creating it.
        </p>
        <p className="text-zinc-400 mb-6">
          If we add liquidity to this token pair in some DEX such as Raydium, users will be able to make trades freely thanks to the Liquidity Pool.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-500" />
          Creating Openbook Market ID: Step by Step
        </h2>
        <p className="text-zinc-400 mb-6">
          Our tool allows you to adjust the length of your OpenBook Market. This makes the process much cheaper, although it has the disadvantages mentioned above. In this case I will show you the "measures" in bytes that I consider most useful: by 0.4 SOL, 1.5 SOL and 2.8 SOL.
        </p>
        
        <p className="text-zinc-400 mb-6">
          Let's go straight to the step by step on how to create an OpenBook Market ID on Solana without programming. For this we are going to use our dApp called <Link to="/create-market" className="text-orange-400 hover:text-orange-300 font-semibold">Create OpenBook Market</Link>. This software allows us to create and customize our Market ID in just 1 minute.
        </p>

        <ol className="list-decimal pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Connect your wallet</strong> in order to be able to use the software.</li>
          <li>Select the <strong>"Base Token"</strong>. The token you have created and has no value yet.</li>
          <li>Select the <strong>Quote Token</strong>. A token with market value. Usually SOL or USDC.</li>
          <li>Set the <strong>"Minimum Order Size"</strong>. That is, the minimum amount that users will be able to buy from your token.</li>
          <li>Set the <strong>"Price Tick"</strong>. That is, the minimum amount that can change the price of your token.</li>
          <li>Select the <strong>advanced options</strong> (only if you want to use a market lower than 2.8 SOL).</li>
        </ol>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-purple-500" />
          Market ID Configurations
        </h3>
        <p className="text-zinc-400 mb-6">
          These are the "inputs" that you must indicate for the different prices of your Market ID:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h4 className="text-xl font-bold text-yellow-500 mb-4">0.4 SOL (Economy)</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex justify-between"><span>Event Queue:</span> <span className="text-white font-mono">128</span></li>
              <li className="flex justify-between"><span>Request Queue:</span> <span className="text-white font-mono">63</span></li>
              <li className="flex justify-between"><span>Orderbook:</span> <span className="text-white font-mono">201</span></li>
            </ul>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h4 className="text-xl font-bold text-blue-500 mb-4">1.5 SOL (Standard)</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex justify-between"><span>Event Queue:</span> <span className="text-white font-mono">1400</span></li>
              <li className="flex justify-between"><span>Request Queue:</span> <span className="text-white font-mono">63</span></li>
              <li className="flex justify-between"><span>Orderbook:</span> <span className="text-white font-mono">450</span></li>
            </ul>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h4 className="text-xl font-bold text-purple-500 mb-4">2.8 SOL (Pro)</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex justify-between"><span>Event Queue:</span> <span className="text-white font-mono">2978</span></li>
              <li className="flex justify-between"><span>Request Queue:</span> <span className="text-white font-mono">63</span></li>
              <li className="flex justify-between"><span>Orderbook:</span> <span className="text-white font-mono">909</span></li>
            </ul>
          </div>
        </div>

        <p className="text-zinc-400 mb-6">
          Note that you can also use other numbers, but these would be the "standard" ones. The recommended by the protocols is the last one, 2.8 SOL.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-500" />
          Min Order Size & Tick Size Guide
        </h3>
        <p className="text-zinc-400 mb-6">
          Use this table as a reference based on your Total Supply. Please note that this is not tokenomics advice, but a guide based on successful tokens.
        </p>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-300">
                <th className="py-3 px-4">Token Supply</th>
                <th className="py-3 px-4">Min Order Size</th>
                <th className="py-3 px-4">Tick Size</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400 text-sm">
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">100,000</td>
                <td className="py-3 px-4 font-mono">0.01</td>
                <td className="py-3 px-4 font-mono">0.0001</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">1,000,000</td>
                <td className="py-3 px-4 font-mono">0.1</td>
                <td className="py-3 px-4 font-mono">0.00001</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">10,000,000</td>
                <td className="py-3 px-4 font-mono">1</td>
                <td className="py-3 px-4 font-mono">0.000001</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">100,000,000</td>
                <td className="py-3 px-4 font-mono">10</td>
                <td className="py-3 px-4 font-mono">0.0000001</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">1,000,000,000</td>
                <td className="py-3 px-4 font-mono">100</td>
                <td className="py-3 px-4 font-mono">0.00000001</td>
              </tr>
              <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="py-3 px-4">10,000,000,000</td>
                <td className="py-3 px-4 font-mono">1,000</td>
                <td className="py-3 px-4 font-mono">0.000000001</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Final Steps
        </h2>
        <p className="text-zinc-400 mb-6">
          To finish the process click on <strong>Create Market</strong> and accept the transactions.
        </p>
        <p className="text-zinc-400 mb-6">
          After finishing the creation you will see the Market ID. <strong>Copy and save it</strong>, as you will need it to add the liquidity in some DEX.
        </p>
        <p className="text-zinc-400 mb-6">
          The most common is Raydium, currently the cost of adding liquidity is approx 0.6 SOL.
        </p>

        <ShareArticle title="Creating an Openbook Market ID in Solana: Step-by-step guide" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-orange-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Market?</h3>
          <p className="text-zinc-400 mb-6">
            Get your Market ID in less than 1 minute starting from 0.4 SOL.
          </p>
          <Link to="/create-market" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Market ID
          </Link>
        </div>
      </article>
    </div>
  );
}
