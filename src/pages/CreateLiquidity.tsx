import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Droplets, Info, Settings, Calendar, Wallet, Check, ChevronDown, ChevronUp, Zap, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { SEO } from '@/components/SEO';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does this Create Liquidity Pool Tool work?",
    answer: "Our Tool make the whole process of creating a liquidity pool on Solana for you. We work with Raydium API for giving you the best experience for creating a liquidity pool. All this process is faster and cheaper that any other option as it is automatically done. This tool is completely safe, audited by different developers teams and used by the best Solana Projects."
  },
  {
    question: "Is it Safe to Create a Liquidity here?",
    answer: "Yes, our tool is completely safe. It creates the Liquidity Pool on Raydium and does not have any access to your information. Our dApp is audited and used by hundred users every month."
  },
  {
    question: "How much time it will take to Create my Liquidity Pool?",
    answer: "The Liquidity Pool creation just takes some seconds. If you have any issue please contact us."
  },
  {
    question: "How much does creating a Liquidity Pool Cost?",
    answer: "The cost is 1-3 SOL, based on the advanced options you use (create token pair + liquidity pool). Take on account you also need SOL/USDC to add liquidity. You can also Create your own Token for 0.1 SOL."
  },
  {
    question: "Which wallet can I use?",
    answer: "You can use any Solana Wallet as Phantom, Solflare, Backpack, etc."
  }
];

export const CreateLiquidity: FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  
  // Form State
  const [baseToken, setBaseToken] = useState('');
  const [quoteToken, setQuoteToken] = useState('SOL');
  const [baseAmount, setBaseAmount] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [launchPrice, setLaunchPrice] = useState(''); // e.g., 1 Base = 0.0001 Quote
  const [isCreating, setIsCreating] = useState(false);
  
  // Advanced Options
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [snipeToken, setSnipeToken] = useState(false);
  const [snipeAmount, setSnipeAmount] = useState('');
  const [snipeTip, setSnipeTip] = useState('0.01');
  
  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const serviceFee = 0.5; // Service fee for creating LP
  const marketCreationCost = 0.4; // Approx cost if market needs to be created
  const estimatedTotalCost = (serviceFee + marketCreationCost + (snipeToken ? parseFloat(snipeAmount || '0') + parseFloat(snipeTip || '0') : 0)).toFixed(4);

  const handleCreateLiquidity = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    if (!baseToken) {
      toast.error('Please enter a base token address');
      return;
    }

    try {
      new PublicKey(baseToken);
    } catch (e) {
      toast.error('Invalid token address');
      return;
    }

    if (!baseAmount || !quoteAmount) {
      toast.error('Please specify liquidity amounts');
      return;
    }

    setIsCreating(true);
    const loadingToast = toast.loading('Initializing Liquidity Pool creation...');

    try {
      // Simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.loading('Verifying token authority...', { id: loadingToast });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.loading('Interacting with Raydium AMM...', { id: loadingToast });

      if (snipeToken) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.loading(`Sniping token with ${snipeAmount} ${quoteToken}...`, { id: loadingToast });
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.dismiss(loadingToast);
      toast.success('Liquidity Pool created successfully! (Simulation)');
      
      // Reset form
      setBaseToken('');
      setBaseAmount('');
      setQuoteAmount('');
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to create liquidity pool');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative flex flex-col items-center">
      <SEO 
        title="Create Liquidity Pool | Raydium & Solana"
        description="Create a Raydium Liquidity Pool for your Solana token in seconds. Add liquidity, snipe your own launch, and start trading immediately."
        keywords="create liquidity pool, raydium pool creator, add liquidity solana, snipe token launch, solana dex listing"
      />

      {/* Note: Global background is now in Layout.tsx, removed local blobs to prevent duplication */}

      <div className="max-w-5xl w-full relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
             <Droplets className="w-4 h-4" />
             Raydium Liquidity Pool
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
            Create Solana Liquidity Pool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Easily create a Liquidity Pool of any Solana Token.
            <br/>
            Your token will be available for trading on Raydium immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Configuration Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8 backdrop-blur-sm">
              
              {/* Token Selection */}
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold text-white">Base Token Address</Label>
                  <p className="text-sm text-zinc-400 mb-2">The token you want to list on Raydium.</p>
                  <Input 
                    placeholder="Enter mint address (e.g. 7eyK...)" 
                    className="bg-black/50 border-zinc-700 h-12 font-mono text-zinc-200"
                    value={baseToken}
                    onChange={(e) => setBaseToken(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold text-white">Quote Token</Label>
                  <p className="text-sm text-zinc-400 mb-2">The base currency for the pool (SOL or USDC).</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setQuoteToken('SOL')}
                      className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                        quoteToken === 'SOL' 
                          ? 'bg-zinc-800 border-cyan-500 text-white' 
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      SOL (Recommended)
                    </button>
                    <button 
                      onClick={() => setQuoteToken('USDC')}
                      className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                        quoteToken === 'USDC' 
                          ? 'bg-zinc-800 border-blue-500 text-white' 
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      USDC
                    </button>
                  </div>
                </div>
              </div>

              {/* Liquidity Amount */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-cyan-500" />
                  Add Liquidity
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-zinc-300 mb-1.5 block">Base Token Amount</Label>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      className="bg-black/50 border-zinc-700"
                      value={baseAmount}
                      onChange={(e) => setBaseAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-300 mb-1.5 block">Quote Token Amount ({quoteToken})</Label>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      className="bg-black/50 border-zinc-700"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Launch Settings */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                 <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Launch Settings
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                    <Label className="text-zinc-300 mb-1.5 block">Launch Price (Optional)</Label>
                    <Input 
                      type="number"
                      placeholder={`1 Base = X ${quoteToken}`}
                      className="bg-black/50 border-zinc-700"
                      value={launchPrice}
                      onChange={(e) => setLaunchPrice(e.target.value)}
                    />
                  </div>
                   <div className="flex flex-col justify-end pb-2">
                     <div className="text-sm text-zinc-500">
                       Liquidity pool will be created immediately upon confirmation.
                     </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Advanced Settings Toggle */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-zinc-300">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Advanced Options</span>
                </div>
                {showAdvanced ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              
              {showAdvanced && (
                <div className="p-6 border-t border-zinc-800 space-y-6 bg-black/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-white">Snipe your Token</Label>
                      <p className="text-xs text-zinc-400">Buy your own token in the same transaction as the LP creation.</p>
                    </div>
                    <Switch checked={snipeToken} onCheckedChange={setSnipeToken} />
                  </div>

                  {snipeToken && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                      <div>
                        <Label className="text-zinc-300 mb-1.5 block">Amount to Buy ({quoteToken})</Label>
                        <Input 
                          type="number"
                          placeholder="1.0"
                          className="bg-zinc-900 border-zinc-700"
                          value={snipeAmount}
                          onChange={(e) => setSnipeAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 mb-1.5 block">Jito Tip (SOL)</Label>
                        <Input 
                          type="number"
                          placeholder="0.01"
                          className="bg-zinc-900 border-zinc-700"
                          value={snipeTip}
                          onChange={(e) => setSnipeTip(e.target.value)}
                        />
                        <p className="text-[10px] text-zinc-500 mt-1">Higher tip = faster execution.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
                    >
                      <span className="font-medium text-zinc-200">{item.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-4 pb-4 text-sm text-zinc-400 border-t border-zinc-800/50 pt-4 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-24 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Market Creation</span>
                  <span className="text-white font-mono">~{marketCreationCost} SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Service Fee</span>
                  <span className="text-white font-mono">{serviceFee} SOL</span>
                </div>
                {snipeToken && (
                   <div className="flex justify-between text-sm text-cyan-400">
                    <span className="text-cyan-400/80">Snipe Amount</span>
                    <span className="font-mono">{snipeAmount || '0'} {quoteToken}</span>
                  </div>
                )}
                
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                  <span className="text-zinc-300 font-medium">Est. Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-cyan-500">{estimatedTotalCost}</span>
                    <span className="text-sm text-cyan-500/80 ml-1">SOL</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-xl text-xs text-cyan-200 leading-relaxed">
                <Info className="w-4 h-4 mb-2 inline-block mr-1" />
                This process involves multiple on-chain transactions. Please ensure you have sufficient SOL for gas fees and rent.
              </div>

              <Button 
                size="lg" 
                onClick={handleCreateLiquidity}
                disabled={isCreating}
                className={`w-full h-14 text-lg font-bold rounded-xl transition-all ${
                  isCreating 
                    ? 'bg-zinc-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-900/20'
                }`}
              >
                {isCreating ? 'Processing...' : 'Create Liquidity Pool'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                 <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-xs text-zinc-400">
                   <Shield className="w-3 h-3 text-green-500" /> Audited
                 </div>
                 <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-xs text-zinc-400">
                   <Zap className="w-3 h-3 text-yellow-500" /> Fast
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateLiquidity;
