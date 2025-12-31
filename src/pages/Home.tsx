import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Shield, Coins, Wallet, Settings, Send, ChevronDown, ChevronUp, Droplets, ShoppingCart } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { clsx } from 'clsx';
import { SEO } from '@/components/SEO';

export const Home: FC = () => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleLaunchClick = () => {
    if (connected) {
      navigate('/create');
    } else {
      setVisible(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-24 py-12 text-center w-full">
      <SEO 
        title="Solana Token Creator | Create Tokens, Markets & Liquidity Pools"
        description="The ultimate all-in-one Solana development platform. Create SPL tokens, OpenBook Markets, and Raydium Liquidity Pools in seconds without coding."
        keywords="solana token creator, create spl token, openbook market id, raydium liquidity pool, solana developer tools, launch meme coin"
      />

      {/* Hero Section */}
      <div className="space-y-6 max-w-4xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 backdrop-blur-sm mx-auto">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           Base Fee: 20,000 AICP + 10,000 AICP per Authority
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500 pb-4 leading-tight">
          Launch Your Solana Project Instantly!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          The most complete toolkit for Solana developers. Create Tokens, Markets, and Liquidity Pools in one place.
        </p>
        <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="h-14 px-10 text-lg gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:scale-105"
              onClick={handleLaunchClick}
            >
              <Rocket className="h-6 w-6" />
              Create Token
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-10 text-lg gap-2 border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
              onClick={() => navigate('/create-market')}
            >
              <ShoppingCart className="h-6 w-6" />
              Create Market
            </Button>
        </div>
      </div>

      {/* Live Activity / Social Proof */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold mb-8 text-teal-400">Latest Tokens Launched</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "MoonDog", symbol: "MDOG", time: "2 mins ago", price: "+12%" },
            { name: "SolanaGPT", symbol: "SGPT", time: "5 mins ago", price: "+450%" },
            { name: "PepeAI", symbol: "PEPEAI", time: "12 mins ago", price: "+32%" },
            { name: "CyberCat", symbol: "CCAT", time: "15 mins ago", price: "+8%" }
          ].map((token, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center justify-between animate-fade-in hover:border-primary/50 transition-colors cursor-pointer">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {token.symbol[0]}
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-white">{token.name}</h4>
                   <span className="text-xs text-zinc-500">{token.time}</span>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-green-400 text-sm font-mono font-bold">{token.price}</div>
                 <div className="text-[10px] text-zinc-600">Vol: $12k</div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose QuickMint */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-teal-400">Why Choose AiCyberProphet?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Create your token in seconds, not hours. Our streamlined process eliminates all the technical complexity.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built on Solana's secure infrastructure with best practices for token creation. Your assets are safe and compliant.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors group">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Coins className="h-8 w-8 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Affordable</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lowest fees in the market. Create OpenBook Markets for just 0.4 SOL and Tokens for pennies.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-teal-400">Complete Launch Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20 -z-10" />
          
          {[
            { 
              icon: Rocket, 
              color: 'bg-teal-500', 
              title: '1. Create Token', 
              desc: 'Set name, symbol, supply and decimals. Launch your SPL token instantly.' 
            },
            { 
              icon: ShoppingCart, 
              color: 'bg-orange-500', 
              title: '2. Create Market', 
              desc: 'Generate your OpenBook Market ID. Choose from Economy (0.4 SOL) to Professional.' 
            },
            { 
              icon: Droplets, 
              color: 'bg-purple-500', 
              title: '3. Add Liquidity', 
              desc: 'Create a Liquidity Pool on Raydium. Pair your token with SOL or USDC.' 
            },
            { 
              icon: Send, 
              color: 'bg-yellow-500', 
              title: '4. Grow', 
              desc: 'Use our Airdrop tool to distribute tokens and build your community.' 
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center relative group">
              <div className={clsx(
                "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg mb-6 z-10 transition-transform group-hover:scale-110",
                step.color
              )}>
                <step.icon className="h-8 w-8" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-teal-400">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is AiCyberProphet?", a: "AiCyberProphet is an all-in-one platform for Solana developers. We provide tools to create SPL Tokens, OpenBook Market IDs, and Raydium Liquidity Pools without any coding knowledge." },
            { q: "How much does it cost to create a Token?", a: "The base fee for creating a token is just 20,000 AICP (approx 0.02 SOL). This is one of the most competitive rates in the ecosystem." },
            { q: "What is an OpenBook Market ID?", a: "A Market ID is required to create a trading pair on Raydium. It represents the order book on the Solana blockchain. We offer optimized Market IDs starting at 0.4 SOL (vs standard 2.8 SOL)." },
            { q: "Is it safe?", a: "Yes. Our tools interact directly with the official Solana programs (Token Program, OpenBook, Raydium). We do not have access to your private keys or funds. We audit our code regularly for security." },
            { q: "Can I update my token later?", a: "Yes, unless you choose to revoke the 'Update Authority'. If you keep it, you can change the name, logo, and metadata later." },
            { q: "What if my transaction fails?", a: "Transactions can fail due to network congestion or insufficient funds. Ensure you have enough SOL for gas fees. If you encounter issues, check our Blog for troubleshooting guides." },
            { q: "Where will my token appear?", a: "Instantly in your wallet (Phantom, Solflare) and on explorers like Solscan and SolanaFM." }
          ].map((item, i) => (
            <div key={i} className="border border-border/50 rounded-lg overflow-hidden bg-secondary/5">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/10 transition-colors"
              >
                <span className="font-medium text-sm md:text-base">{item.q}</span>
                {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              {openFaq === i && (
                <div className="px-6 py-4 text-left text-sm text-muted-foreground border-t border-border/50 bg-secondary/10 animate-in slide-in-from-top-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
