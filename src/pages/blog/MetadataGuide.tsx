import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image, FileJson, Server, UploadCloud } from 'lucide-react';
import ShareArticle from '../../components/ShareArticle';

export default function MetadataGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Knowledge Base
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Mastering Metadata: How to Upload Logos & Descriptions
          </h1>
          <div className="flex items-center text-zinc-400 text-sm gap-4">
            <span>December 28, 2025</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-cyan-500">Technical</span>
          </div>
        </div>

        <div className="lead text-xl text-zinc-300 mb-12">
          A token without a logo or description is just a random string of characters on the blockchain. To look professional and be recognized by wallets like Phantom or Solflare, you need to handle your metadata correctly using the Metaplex standard.
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <FileJson className="w-8 h-8 text-cyan-500" />
          What is Token Metadata?
        </h2>
        <p className="text-zinc-400 mb-6">
          On Solana, the SPL Token Program only stores the balance and supply. It doesn't know your token's name or image. That's where <strong>Metaplex</strong> comes in. It's a separate program that attaches a JSON file to your token mint address.
        </p>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 mb-8">
          <h4 className="text-lg font-bold text-white mb-2">Standard JSON Structure</h4>
          <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
{`{
  "name": "My Token",
  "symbol": "TKN",
  "description": "The best token on Solana",
  "image": "https://arweave.net/...",
  "extensions": {
    "website": "https://mytoken.com",
    "twitter": "https://twitter.com/mytoken"
  }
}`}
          </pre>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <Server className="w-8 h-8 text-purple-500" />
          Decentralized Storage (IPFS vs Arweave)
        </h2>
        <p className="text-zinc-400 mb-6">
          You cannot upload an image directly to the blockchain (it's too expensive). Instead, you upload it to a decentralized storage network, get a URL, and put that URL in your metadata.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-zinc-400 mb-8">
          <li><strong>IPFS (InterPlanetary File System):</strong> Popular but requires "pinning" to ensure data stays online. If you stop paying for pinning, your logo disappears.</li>
          <li><strong>Arweave:</strong> The gold standard for Solana. You pay once, and the data is stored permanently (forever). This is what <strong>AiCyberProphet</strong> uses.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
          <UploadCloud className="w-8 h-8 text-blue-500" />
          The Process
        </h2>
        <ol className="list-decimal pl-6 space-y-6 text-zinc-400 mb-8">
          <li><strong>Upload Image:</strong> Your PNG/JPG is uploaded to Arweave.</li>
          <li><strong>Create JSON:</strong> A text file containing the name, symbol, and the Arweave link to your image is created.</li>
          <li><strong>Upload JSON:</strong> This JSON file is also uploaded to Arweave.</li>
          <li><strong>On-Chain Link:</strong> The Arweave URL of the JSON file is written to the Metaplex Metadata Account associated with your token.</li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Updating Metadata</h2>
        <p className="text-zinc-400 mb-6">
          Can you change your logo later? <strong>Yes</strong>, as long as your metadata is "Mutable" (changeable). However, once you revoke the "Metadata Update Authority" (making it immutable), the logo is set in stone forever.
        </p>
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20 mb-8">
          <p className="text-yellow-200 text-sm">
            <strong>Pro Tip:</strong> Investors prefer immutable metadata because it prevents the dev from changing the token name to something malicious later. Make sure your branding is final before you lock it!
          </p>
        </div>

        <ShareArticle title="Mastering Metadata: How to Upload Logos & Descriptions" />

        <div className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-cyan-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Auto-Metadata Handling</h3>
          <p className="text-zinc-400 mb-6">
            AiCyberProphet handles all the complex Arweave uploads automatically for you.
          </p>
          <Link to="/create" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Create Token
          </Link>
        </div>
      </article>
    </div>
  );
}
