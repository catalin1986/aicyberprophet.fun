import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, ShieldCheck, TrendingUp, Zap, Loader2 } from 'lucide-react';
import { useUmi } from '@/lib/umi';
import { transferSol } from '@metaplex-foundation/mpl-toolbox';
import { transactionBuilder, sol, publicKey } from '@metaplex-foundation/umi';
import { toast } from 'react-hot-toast';

const TREASURY_WALLET = publicKey('EXNRn8TeUeVRvzAN9cztG6h1c6yjyDb85MD1KiJ7p4aK');
const NFT_PRICE_SOL = 0.5;

export const NFTFundraise: FC = () => {
  const { connected } = useWallet();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const umi = useUmi(wallet);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyClick = async () => {
    if (!connected) {
      setVisible(true);
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Initializing purchase...');

    try {
      // Create a simple transfer transaction for the Fundraise
      // In a real NFT mint, this would call a Candy Machine or similar program
      // For this MVP fundraise, we transfer SOL directly to treasury
      
      const builder = transactionBuilder()
        .add(transferSol(umi, {
          destination: TREASURY_WALLET,
          amount: sol(NFT_PRICE_SOL)
        }));

      const { signature } = await builder.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' }
      });

      toast.success('Contribution Successful! You are now a Founder.', { id: toastId });
      console.log('Signature:', signature);
      
    } catch (error: any) {
      console.error(error);
      toast.error(`Transaction failed: ${error.message}`, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
             <Zap className="w-4 h-4" />
             Exclusive Founder Access
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
              AiCyberProphet Origins
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Own a piece of the future. Mint your Founder NFT using <span className="text-foreground font-semibold">SOL</span> and help us build the liquidity pool for AICP. Unlock exclusive platform benefits and revenue sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* NFT Preview Card */}
          <div className="relative group perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
             <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="/logo.png" 
                  alt="Founder NFT" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 space-y-4 bg-background/95 backdrop-blur-sm">
                   <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">Genesis Prophet #001</h3>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">Legendary</span>
                   </div>
                   <div className="flex justify-between items-end border-t border-border/50 pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Mint Price</p>
                        <p className="text-2xl font-bold font-mono">0.5 SOL</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Supply</p>
                        <p className="text-lg font-bold">100 / 1000</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Details & Action */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Mint?</h2>
              <div className="grid gap-6">
                <div className="flex gap-4 items-start p-4 rounded-xl bg-secondary/20 border border-border/50">
                   <div className="p-3 bg-teal-500/10 rounded-lg">
                     <TrendingUp className="w-6 h-6 text-teal-400" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-1">Build Liquidity</h3>
                     <p className="text-muted-foreground text-sm">All proceeds go directly to the AICP Liquidity Pool, ensuring token stability and growth.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-xl bg-secondary/20 border border-border/50">
                   <div className="p-3 bg-purple-500/10 rounded-lg">
                     <ShieldCheck className="w-6 h-6 text-purple-400" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-1">Staking Multiplier</h3>
                     <p className="text-muted-foreground text-sm">Stake your NFT to earn AICP rewards with up to 2x APY multiplier.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-xl bg-secondary/20 border border-border/50">
                   <div className="p-3 bg-pink-500/10 rounded-lg">
                     <Wallet className="w-6 h-6 text-pink-400" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg mb-1">Governance Rights</h3>
                     <p className="text-muted-foreground text-sm">Vote on future platform features and treasury allocations.</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
               <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Phase</p>
                    <p className="text-xl font-bold text-primary">Public Sale</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className="text-xl font-bold font-mono">0 AICP</p>
                  </div>
               </div>
               
               <Button 
                 size="lg" 
                 disabled={isLoading}
                 className="w-full h-14 text-lg font-bold bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 shadow-lg shadow-primary/25"
                 onClick={handleBuyClick}
               >
                 {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                 ) : (
                    connected ? 'Mint Founder NFT' : 'Connect Wallet to Mint'
                 )}
               </Button>
               <p className="text-xs text-center text-muted-foreground mt-3">
                 By minting, you agree to the Terms of Service.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
