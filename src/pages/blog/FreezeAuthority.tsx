import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Unlock, AlertTriangle, CheckCircle } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function FreezeAuthority() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            What is Freeze Authority and Why It Matters
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 27, 2025</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-blue-500">Security</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          In the world of Solana tokens, "Freeze Authority" is a term you'll see often on block explorers and scanners. It is one of the most critical security parameters to understand, whether you are a token creator or an investor.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Lock className="w-8 h-8 text-blue-500" />
          The Definition of Freeze Authority
        </h2>
        <p className="text-zinc-400 mb-6">
          When a token is created on Solana using the SPL (Solana Program Library) standard, the creator has the option to enable or disable <strong>Freeze Authority</strong>.
        </p>
        <p className="text-zinc-400 mb-6">
          If enabled, the wallet holding the Freeze Authority key has the power to "freeze" the token balance of <strong>any specific holder</strong>. Once a wallet is frozen:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li>The user cannot transfer the tokens.</li>
          <li>The user cannot sell the tokens on a DEX (like Raydium or Jupiter).</li>
          <li>The tokens are effectively stuck in the wallet forever unless the authority unfreezes them.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          Why Is It Considered a Risk?
        </h2>
        <p className="text-zinc-400 mb-6">
          For decentralized finance (DeFi) users and meme coin traders, active Freeze Authority is often a major red flag (or "high risk" signal). Here's why:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-red-900/30">
            <h3 className="text-xl font-bold text-red-400 mb-2">Honeypot Scams</h3>
            <p className="text-zinc-400 text-sm">
              Malicious developers can blacklist all buyers. You buy the token, the price goes up, but when you try to sell, the transaction fails because your wallet is frozen. Only the developer can sell.
            </p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-red-900/30">
            <h3 className="text-xl font-bold text-red-400 mb-2">Censorship</h3>
            <p className="text-zinc-400 text-sm">
              In a truly decentralized ecosystem, no single entity should have the power to stop you from moving your assets. Freeze authority reintroduces centralization.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Legitimate Use Cases
        </h2>
        <p className="text-zinc-400 mb-6">
          Despite the risks, Freeze Authority isn't inherently "evil". It exists for compliance and regulatory reasons.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>Stablecoins (USDC/USDT):</strong> Issuers like Circle and Tether need freeze authority to comply with law enforcement requests to freeze stolen funds or sanctioned addresses.</li>
          <li><strong>Security Tokens:</strong> Regulated assets may need to restrict trading to KYC-verified wallets only.</li>
          <li><strong>NFT Projects:</strong> Sometimes used during staking mechanisms (though modern staking contracts often use other methods).</li>
        </ul>
        <p className="text-zinc-400 mb-8">
          However, for a standard community token or meme coin, there is almost <strong>zero reason</strong> to keep Freeze Authority enabled.
        </p>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Unlock className="w-8 h-8 text-purple-500" />
          Revoking Freeze Authority
        </h2>
        <p className="text-zinc-400 mb-6">
          "Revoking" means permanently disabling the ability to freeze accounts. Once revoked, it cannot be undone. This is an immutable action on the blockchain.
        </p>
        <p className="text-zinc-400 mb-6">
          When you use <strong>AiCyberProphet</strong> to create your token, you have the option to revoke Freeze Authority immediately upon creation. This is highly recommended if you want to gain community trust.
        </p>
        
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 my-8">
          <h3 className="text-xl font-bold text-white mb-4">How to check if a token has Freeze Authority?</h3>
          <ol className="list-decimal pl-6 space-y-2 text-zinc-400">
            <li>Copy the token's Contract Address (CA).</li>
            <li>Paste it into a Solana explorer like Solscan or a scanner like RugCheck.xyz.</li>
            <li>Look for the "Freeze Authority" field. If it shows an address, it's <strong>enabled</strong>. If it says "Null" or "None", it is <strong>revoked</strong>.</li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Conclusion</h2>
        <p className="text-zinc-400 mb-6">
          Freeze Authority is a powerful tool that cuts both ways. While essential for regulated assets, it is a liability for community-led projects.
        </p>
        <p className="text-zinc-400 mb-6">
          If you are launching a token, <strong>revoke it</strong> to show your investors you mean business and have nothing to hide. If you are investing, always check this parameter before buying.
        </p>

        <ShareArticle title="What is Freeze Authority and Why It Matters" />

        <div className="mt-16 p-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl border border-blue-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Launch a Safe Token</h3>
          <p className="text-zinc-400 mb-6">
            Create a token with revoked Freeze Authority in one click using our simple tool.
          </p>
          <Link to="/create" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start Minting
          </Link>
        </div>
      </article>
    </div>
  );
}
