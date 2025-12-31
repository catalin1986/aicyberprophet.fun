import { FC, useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Users, Copy, CheckCircle2, Wallet, Share2, Calculator, HelpCircle, Twitter, Send, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Affiliate: FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  
  // Calculator state
  const [referralCount, setReferralCount] = useState(10);
  const platformFee = 0.1; // SOL (Example fee)
  const commissionRate = 0.4; // 40%
  const estimatedEarnings = (referralCount * platformFee * commissionRate).toFixed(2);

  // Generate affiliate link
  const affiliateLink = connected && publicKey 
    ? `${window.location.origin}?ref=${publicKey.toString()}`
    : '';

  const handleCopy = () => {
    if (!affiliateLink) return;
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success('Affiliate link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    if (!affiliateLink) return;
    const text = encodeURIComponent(`🚀 Launch your Solana token instantly with AiCyberProphet! \n\nCreate LP, manage authorities, and more. \n\n#Solana #AICP #AiCyberProphet\n\nUse my link:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(affiliateLink)}`, '_blank');
  };

  const shareOnTelegram = () => {
    if (!affiliateLink) return;
    const text = encodeURIComponent(`Launch your Solana token instantly with AiCyberProphet!`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(affiliateLink)}&text=${text}`, '_blank');
  };

  const handleDownloadBanner = () => {
    const link = document.createElement('a');
    link.href = '/images/affiliate-banner.png';
    link.download = 'AiCyberProphet-Affiliate-Banner.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Banner downloaded!');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
      <SEO 
        title="Affiliate Program | Earn 40% Commission"
        description="Join the AiCyberProphet Affiliate Program and earn 40% commission on every token launched through your referral link."
        keywords="solana affiliate program, crypto affiliate, earn solana, passive income crypto"
      />

      {/* Note: Global background is now in Layout.tsx */}

      <div className="max-w-5xl w-full relative z-10 space-y-16 text-center">
        
        {/* Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in">
             <Users className="w-4 h-4" />
             Earn Passive Income
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
            Affiliate Program
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invite friends and developers to launch tokens on AiCyberProphet.
            <br />
            Earn <span className="text-teal-400 font-bold">40% commission</span> for every token created through your link!
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="relative group max-w-2xl mx-auto">
           <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
           <div className="relative bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-8">
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-8 pb-8 border-b border-zinc-800">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Earned</p>
                  <p className="text-3xl md:text-4xl font-bold font-mono text-teal-400">0.00 SOL</p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Referred Mints</p>
                  <p className="text-3xl md:text-4xl font-bold font-mono text-white">0</p>
                </div>
              </div>

              {/* Connection/Link State */}
              <div className="space-y-6">
                {!connected ? (
                  <div className="space-y-6 py-4">
                    <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                      <Wallet className="w-8 h-8 text-zinc-400" />
                    </div>
                    <p className="text-zinc-300">Connect your wallet to generate your unique referral link and start earning.</p>
                    <Button 
                      size="lg" 
                      className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/20"
                      onClick={() => setVisible(true)}
                    >
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2 text-left">
                      <label className="text-sm font-medium text-teal-400 ml-1">Your Referral Link</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm font-mono truncate text-zinc-300 flex items-center">
                          {affiliateLink}
                        </div>
                        <Button onClick={handleCopy} className="h-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-4">
                          {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={shareOnTwitter}
                        className="w-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/20 h-12 rounded-xl"
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Tweet
                      </Button>
                      <Button 
                        onClick={shareOnTelegram}
                        className="w-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] border border-[#0088cc]/20 h-12 rounded-xl"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Telegram
                      </Button>
                    </div>
                    
                    {/* Promotional Asset */}
                    <div className="pt-4 border-t border-zinc-800">
                      <p className="text-sm text-zinc-400 mb-3 text-left">Promotional Banner</p>
                      <div className="relative group rounded-xl overflow-hidden border border-zinc-800">
                        <img 
                          src="/images/affiliate-banner.png" 
                          alt="Affiliate Banner" 
                          className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button onClick={handleDownloadBanner} variant="secondary" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download Banner
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Earnings Calculator */}
        <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-6 h-6 text-teal-500" />
                <h2 className="text-2xl font-bold">Earnings Calculator</h2>
              </div>
              <p className="text-zinc-400">
                Estimate your potential earnings based on the number of tokens launched through your link.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Referrals per month</span>
                  <span className="font-bold text-white">{referralCount}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={referralCount} 
                  onChange={(e) => setReferralCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>1</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <div className="bg-gradient-to-br from-teal-900/40 to-purple-900/40 border border-teal-500/20 rounded-2xl p-8 text-center space-y-2">
                <p className="text-sm text-teal-200 font-medium uppercase tracking-wider">Potential Monthly Income</p>
                <div className="text-5xl font-bold text-white flex items-center justify-center gap-2">
                  {estimatedEarnings} <span className="text-xl text-teal-500">SOL</span>
                </div>
                <p className="text-xs text-zinc-500 mt-4">*Based on average platform fees. Payouts are instant.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-teal-500/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold mb-6 text-xl">1</div>
            <h3 className="font-bold text-xl mb-3">Share Link</h3>
            <p className="text-zinc-400 leading-relaxed">Copy your unique referral link and share it with your community, Twitter followers, or Telegram groups.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold mb-6 text-xl">2</div>
            <h3 className="font-bold text-xl mb-3">They Mint</h3>
            <p className="text-zinc-400 leading-relaxed">When someone clicks your link and creates a token or liquidity pool, the smart contract tracks it.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold mb-6 text-xl">3</div>
            <h3 className="font-bold text-xl mb-3">You Earn</h3>
            <p className="text-zinc-400 leading-relaxed">You instantly receive 40% of the platform fees directly to your wallet. No waiting, no claiming, fully automated.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto text-left space-y-8 pb-12">
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem 
              question="How are payouts processed?" 
              answer="Payouts are programmatic and instant. When a referred user pays a fee to the platform, the smart contract automatically splits the transaction and sends 40% directly to your wallet in the same transaction block." 
            />
            <FaqItem 
              question="Is there a limit to how much I can earn?" 
              answer="No limits! You earn commission on every single transaction generated by your referred users forever (or as long as the program lasts)." 
            />
            <FaqItem 
              question="What if the user disconnects their wallet?" 
              answer="The referral is tracked via the link click. Once they enter the site via your link, a session is established. We recommend they mint immediately for best tracking." 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
      >
        <span className="font-semibold text-zinc-200">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};
