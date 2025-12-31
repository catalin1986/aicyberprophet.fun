import React from 'react';
import { Rocket, Shield, Zap, Globe } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          About AiCyberProphet
        </h1>
        <p className="text-xl text-zinc-400">
          Empowering the next generation of digital asset creators on Solana.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-zinc-400">
            To democratize token creation by providing powerful, accessible, and secure tools that allow anyone to launch their digital assets on the Solana blockchain in minutes, not days.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-violet-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">The Technology</h3>
          <p className="text-zinc-400">
            Built on the lightning-fast Solana network, leveraging the Metaplex protocol for standard-compliant, secure, and efficient token minting and management.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            Why Choose Us?
          </h2>
          <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800/50">
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5" />
                <span><strong>No Coding Required:</strong> Our intuitive interface handles all the complex smart contract interactions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5" />
                <span><strong>Instant Deployment:</strong> Launch your token immediately to the mainnet.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5" />
                <span><strong>Full Ownership:</strong> You retain 100% control of your mint authority and freeze authority (unless you choose to revoke them).</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            Security & Trust
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Security is our top priority. We do not store your private keys. All transactions are signed directly by your wallet (Phantom, Solflare, etc.). Our smart contract interactions are built on open-source, audited libraries from Metaplex and Solana Labs.
          </p>
        </section>
      </div>
    </div>
  );
}
