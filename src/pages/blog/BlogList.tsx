import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Lock, BookOpen, ShieldAlert, Layers, Droplets, ShoppingCart, Send, FileJson, Coins, Search, Flame, BarChart3, Settings } from 'lucide-react';

export default function BlogList() {
  const articles = [
    {
      id: 'raydium-pool-failed',
      title: 'Why your Raydium pool creation failed (and how to fix it)',
      excerpt: 'There is nothing more frustrating than a red error message. Here is the definitive guide to troubleshooting pool errors.',
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: 'from-red-500/20 to-orange-500/20',
      date: 'December 29, 2025',
      readTime: '5 min read'
    },
    {
      id: 'cheapest-openbook-2025',
      title: 'The cheapest way to create an OpenBook Market ID in 2025',
      excerpt: 'Stop paying 2.8 SOL. Learn how to create a fully functional Market ID for just 0.4 SOL using the Economy standard.',
      icon: <Coins className="w-8 h-8 text-green-500" />,
      color: 'from-green-500/20 to-emerald-500/20',
      date: 'December 29, 2025',
      readTime: '4 min read'
    },
    {
      id: 'tick-size-mistakes',
      title: 'Common Tick Size mistakes that kill your token\'s volume',
      excerpt: 'Setting the wrong "Min Order Size" can make your token untradable. Here is the cheat sheet for perfect values.',
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-500/20 to-indigo-500/20',
      date: 'December 29, 2025',
      readTime: '6 min read'
    },
    {
      id: 'how-to-launch-token',
      title: 'How to Launch a Successful Token on Solana',
      excerpt: 'A comprehensive guide to planning, creating, and marketing your Solana token for maximum impact.',
      icon: <Rocket className="w-8 h-8 text-pink-500" />,
      color: 'from-pink-500/20 to-purple-500/20',
      date: 'December 28, 2025',
      readTime: '8 min read'
    },
    {
      id: 'spl-vs-erc20',
      title: 'Introduction to SPL Standard: Solana vs. Ethereum',
      excerpt: 'Understanding the technical differences between SPL tokens and ERC-20, and why Solana architecture is superior for speed.',
      icon: <Layers className="w-8 h-8 text-teal-500" />,
      color: 'from-teal-500/20 to-emerald-500/20',
      date: 'December 28, 2025',
      readTime: '7 min read'
    },
    {
      id: 'metadata-guide',
      title: 'Mastering Metadata: How to Upload Logos & Descriptions',
      excerpt: 'Learn how to handle logos, descriptions, and Arweave storage using the Metaplex standard for a professional look.',
      icon: <FileJson className="w-8 h-8 text-cyan-500" />,
      color: 'from-cyan-500/20 to-blue-500/20',
      date: 'December 28, 2025',
      readTime: '6 min read'
    },
    {
      id: 'supply-management',
      title: 'Minting & Supply Management: Fixed vs. Infinite',
      excerpt: 'Deciding between a fixed supply or infinite inflation. When to revoke Mint Authority for investor trust.',
      icon: <Coins className="w-8 h-8 text-green-500" />,
      color: 'from-green-500/20 to-lime-500/20',
      date: 'December 28, 2025',
      readTime: '7 min read'
    },
    {
      id: 'liquidity-pool-guide',
      title: 'How to Create a Liquidity Pool on Raydium',
      excerpt: 'Step-by-step guide to pairing your token with SOL and launching a trading pool on Solana\'s biggest DEX.',
      icon: <Droplets className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500/20 to-indigo-500/20',
      date: 'December 28, 2025',
      readTime: '9 min read'
    },
    {
      id: 'burn-liquidity-guide',
      title: 'The Guide to Burning Liquidity (LP Tokens)',
      excerpt: 'What does "Liquidity Burned" mean? How to permanently lock your LP tokens to prove your project is safe.',
      icon: <Flame className="w-8 h-8 text-orange-600" />,
      color: 'from-orange-600/20 to-red-600/20',
      date: 'December 28, 2025',
      readTime: '5 min read'
    },
    {
      id: 'openbook-market-guide',
      title: 'Creating an Openbook Market ID in Solana: Step-by-step guide',
      excerpt: 'Learn how to create an OpenBook Market ID in 1 minute starting from 0.4 SOL. No coding required.',
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-500/20 to-red-500/20',
      date: 'December 28, 2025',
      readTime: '8 min read'
    },
    {
      id: 'market-id-guide',
      title: 'The Guide to OpenBook Market IDs',
      excerpt: 'What is a Market ID, why do you need one, and how to create one without overpaying on storage fees.',
      icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-500/20 to-red-500/20',
      date: 'December 28, 2025',
      readTime: '6 min read'
    },
    {
      id: 'contract-analysis',
      title: 'Smart Contract Analysis: How to Check for Rugs',
      excerpt: 'How to audit a token contract in 5 minutes. Spotting red flags like active Mint Authority or Honeypots.',
      icon: <Search className="w-8 h-8 text-red-500" />,
      color: 'from-red-500/20 to-pink-500/20',
      date: 'December 28, 2025',
      readTime: '8 min read'
    },
    {
      id: 'airdrop-strategies',
      title: 'Effective Airdrop Strategies on Solana',
      excerpt: 'How to target the right communities and distribute your token efficiently to build a strong holder base.',
      icon: <Send className="w-8 h-8 text-yellow-500" />,
      color: 'from-yellow-500/20 to-amber-500/20',
      date: 'December 28, 2025',
      readTime: '8 min read'
    },
    {
      id: 'dex-listing-guide',
      title: 'Getting Listed on Dexscreener & Birdeye',
      excerpt: 'How to update your token profile, add social links, and get verified on the major charting platforms.',
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
      color: 'from-indigo-500/20 to-violet-500/20',
      date: 'December 28, 2025',
      readTime: '5 min read'
    },
    {
      id: 'freeze-authority-explained',
      title: 'What is Freeze Authority and Why It Matters',
      excerpt: 'Understanding the security implications of Freeze Authority and why revoking it can build trust with your community.',
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-500/20 to-cyan-500/20',
      date: 'December 27, 2025',
      readTime: '6 min read'
    },
    {
      id: 'tokenomics-guide',
      title: 'Complete Guide to Tokenomics for Beginners',
      excerpt: 'Learn the fundamentals of token economics, supply management, and how to design a sustainable token model.',
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      color: 'from-green-500/20 to-emerald-500/20',
      date: 'December 26, 2025',
      readTime: '10 min read'
    },
    {
      id: 'avoid-crypto-scams',
      title: 'How to Avoid Scams in Crypto',
      excerpt: 'Essential tips and red flags to watch out for to protect your investments and stay safe in the DeFi space.',
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: 'from-red-500/20 to-orange-500/20',
      date: 'December 25, 2025',
      readTime: '7 min read'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Knowledge Base
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Master the art of Solana token creation. Expert guides, security tips, and strategies for your crypto journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            to={`/blog/${article.id}`}
            className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  {article.icon}
                </div>
                <div className="flex flex-col items-end text-sm text-zinc-500">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-zinc-400 mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              
              <span className="inline-flex items-center text-sm font-medium text-blue-500 group-hover:text-blue-400">
                Read Article 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
