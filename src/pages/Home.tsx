import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Shield, Coins, Wallet, Settings, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { clsx } from 'clsx';

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
      {/* Hero Section */}
      <div className="space-y-6 max-w-4xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium mb-4 backdrop-blur-sm mx-auto">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           Base Fee: 20,000 AICP + 10,000 AICP per Authority
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent pb-4 leading-tight">
          Mint Your Own Token Instantly!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Generate your custom Solana token in seconds—effortless, fast, and secure!
        </p>
        <div className="pt-8">
            <Button 
              size="lg" 
              className="h-14 px-10 text-lg gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:scale-105"
              onClick={handleLaunchClick}
            >
              <Rocket className="h-6 w-6" />
              Create Token Now
            </Button>
        </div>
      </div>

      {/* Why Choose QuickMint */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-teal-400">Why Choose AiCyberProphet?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Create your token in seconds, not hours. Our streamlined process eliminates all the technical complexity.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built on Solana's secure infrastructure with best practices for token creation. Your assets are safe and compliant.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm hover:bg-secondary/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-6">
              <Coins className="h-8 w-8 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Affordable</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lowest fees in the market. Create your token for a fraction of what other services charge.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold mb-12 text-teal-400">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20 -z-10" />
          
          {[
            { 
              icon: Wallet, 
              color: 'bg-teal-500', 
              title: 'Connect Wallet', 
              desc: 'Connect your Solana wallet to get started. We support most popular wallets including Phantom, Solflare, and more.' 
            },
            { 
              icon: Settings, 
              color: 'bg-purple-500', 
              title: 'Configure Token', 
              desc: 'Set your token\'s name, ticker, supply, and permissions in our simple interface. Add a logo and customize metadata.' 
            },
            { 
              icon: Rocket, 
              color: 'bg-pink-500', 
              title: 'Launch Token', 
              desc: 'Review your settings and create your token with one click. Your new token will be instantly available in your wallet.' 
            },
            { 
              icon: Send, 
              color: 'bg-yellow-500', 
              title: 'Airdrop Tokens', 
              desc: 'Distribute your tokens to multiple recipients at once with our powerful airdrop tool, saving time and transaction fees.' 
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
              <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">
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
            { q: "What is a token?", a: "A token is a digital asset that runs on the Solana blockchain. It can represent anything from a cryptocurrency to in-game items, loyalty points, or shares in a project. Solana tokens are known for their fast transactions and low fees." },
            { q: "What does the decimal of my token do?", a: "The decimals of your token determine how many decimal places your token can have. For example, if your token has 9 decimals, it can have 9 decimal places. If your token has 6 decimals, it can have 6 decimal places." },
            { q: "How much does creating a token cost?", a: "The base fee for creating a token is 20,000 AICP (0.02 SOL). This fee is the lowest fee in the market. Additional fees like revoking mint, freeze, or update are optional and are just 10,000 AICP (0.01 SOL) each. These fees are record breaking and no other services charges less than us. The fees cover all the blockchain fees and help us maintain our fast minting service." },
            { q: "Is my token secure?", a: "Yes, your token inherits the security of the Solana blockchain. We use standard token programs and best practices to ensure your token is secure. However, remember to keep your wallet's private keys safe, as they control your token's admin functions." },
            { q: "Can I update my token later?", a: "Yes, unless you choose to revoke the 'Update Authority'. If you keep it, you can change the name, logo, and metadata later." },
            { q: "What are token permissions?", a: "Token permissions determine what can be done with your token after creation. The Mint permission allows you to create more tokens later, while the Freeze permission lets you control token transfers. Choose these carefully as they cannot be changed after creation." },
            { q: "How does the Token Airdrop tool work?", a: "Our Token Airdrop tool lets you send your SPL tokens to multiple wallets in a single transaction. Simply enter your token's address, paste a list of recipient addresses with their amounts, and execute the transaction. Each airdrop can handle up to 25 recipients at once, with a small service fee of 0.001 SOL per address." },
            { q: "Where will my token appear?", a: "Instantly in your wallet (Phantom, Solflare) and on explorers like Solscan and SolanaFM." },
            { q: "My token is not showing up in my wallet?", a: "First verify that you have your solana, if your solana wasn't taken from your walet try again. If you were charged, verify that your wallet didn't mark it as spam, if so mark it as not spam." }
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

      {/* Footer Disclaimer */}
      <div className="flex flex-col items-center gap-4 max-w-4xl px-4 pb-8">
        <a 
          href="https://x.com/AiCyberProphet" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 text-muted-foreground hover:text-primary transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <div className="text-xs text-muted-foreground/50 leading-relaxed text-center">
          AiCyberProphet is an easy-to-use platform designed for users to create Solana-based tokens in no time, with no coding skills required. However, AiCyberProphet.fun is not responsible for issuing, endorsing, managing, or providing liquidity for any tokens created on our platform. We do not offer financial advice, investment guidance, or make any promises regarding the value, price, or potential returns of the tokens. The tokens generated through AiCyberProphet.fun are not considered securities, and users must ensure they comply with all relevant laws and regulations in their respective jurisdictions. AiCyberProphet.fun does not support token trading, fundraising, or liquidity provision. By using AiCyberProphet.fun, you understand and accept that creating and trading tokens carries inherent risks, such as the possibility of losing funds, market fluctuations, and regulatory uncertainties. Our platform is offered without any warranties or guarantees, and we disclaim any responsibility for the outcomes of its use. You assume full responsibility for your actions and any consequences that result. Always perform thorough research before engaging with any token or project.
        </div>
      </div>
    </div>
  );
};
