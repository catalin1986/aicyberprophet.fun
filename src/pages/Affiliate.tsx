import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Users, Copy, CheckCircle2, Wallet, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Affiliate: FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  // Generate affiliate link based on wallet address
  // In a real app, you might map this to a shorter ID in DB, but using wallet address is easiest for MVP
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Background Elements similar to Home/Fundraise */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 space-y-12 text-center">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
             <Users className="w-4 h-4" />
             Earn Passive Income
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Affiliate Program
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invite friends and developers to launch tokens on AiCyberProphet.
            Earn <span className="text-teal-400 font-bold">40% commission</span> for every token created through your link!
          </p>
        </div>

        {/* Main Card */}
        <div className="relative group max-w-lg mx-auto">
           <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
           <div className="relative bg-card/90 border border-border/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-8">
              
              <div className="grid grid-cols-2 gap-4 pb-8 border-b border-border/50">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Total SOL Earned</p>
                  <p className="text-2xl font-bold font-mono text-teal-400">0.0000 SOL</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Referred Mints</p>
                  <p className="text-2xl font-bold font-mono text-white">0</p>
                </div>
              </div>

              <div className="space-y-4">
                {!connected ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Connect your wallet to generate your unique referral link.</p>
                    <Button 
                      size="lg" 
                      className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                      onClick={() => setVisible(true)}
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2 text-left">
                      <label className="text-sm font-medium text-muted-foreground ml-1">Your Referral Link</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-mono truncate text-muted-foreground">
                          {affiliateLink}
                        </div>
                        <Button onClick={handleCopy} className="bg-teal-500 hover:bg-teal-600">
                          {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" onClick={handleCopy}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Link
                    </Button>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* How it works steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-8">
          <div className="p-6 rounded-xl bg-secondary/10 border border-border/50">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold mb-4">1</div>
            <h3 className="font-bold mb-2">Share Link</h3>
            <p className="text-sm text-muted-foreground">Copy your unique referral link and share it with your community, friends, or on social media.</p>
          </div>
          <div className="p-6 rounded-xl bg-secondary/10 border border-border/50">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mb-4">2</div>
            <h3 className="font-bold mb-2">They Mint</h3>
            <p className="text-sm text-muted-foreground">When someone clicks your link and creates a token, our smart contract tracks the referral.</p>
          </div>
          <div className="p-6 rounded-xl bg-secondary/10 border border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">3</div>
            <h3 className="font-bold mb-2">You Earn</h3>
            <p className="text-sm text-muted-foreground">You instantly receive 40% of the platform fees directly to your wallet. No waiting, no claiming.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
