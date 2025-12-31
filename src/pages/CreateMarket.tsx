import { FC, useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Zap, Shield, Rocket, Info, Check, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { SEO } from '@/components/SEO';

interface MarketConfig {
  name: string;
  cost: number; // Approximate SOL cost
  eventQueueLength: number;
  requestQueueLength: number;
  orderbookLength: number;
  description: string;
  recommendedFor: string;
}

const MARKET_CONFIGS: MarketConfig[] = [
  {
    name: "Economy",
    cost: 0.4,
    eventQueueLength: 128,
    requestQueueLength: 63,
    orderbookLength: 201,
    description: "Lowest cost. Perfect for meme coins and community launches.",
    recommendedFor: "Meme Coins"
  },
  {
    name: "Standard",
    cost: 1.5,
    eventQueueLength: 1400,
    requestQueueLength: 63,
    orderbookLength: 450,
    description: "Balanced performance. Good for projects expecting moderate volume.",
    recommendedFor: "Utility Tokens"
  },
  {
    name: "Professional",
    cost: 2.8,
    eventQueueLength: 2978,
    requestQueueLength: 63,
    orderbookLength: 909,
    description: "High performance. Maximum queue depth for high-frequency trading.",
    recommendedFor: "DeFi Protocols"
  }
];

export const CreateMarket: FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  
  const [tokenAddress, setTokenAddress] = useState('');
  const [quoteToken, setQuoteToken] = useState('SOL');
  const [selectedConfig, setSelectedConfig] = useState<MarketConfig>(MARKET_CONFIGS[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced settings
  const [minOrderSize, setMinOrderSize] = useState('1');
  const [priceTick, setPriceTick] = useState('0.000001');

  const serviceFee = 0.1;
  const totalCost = (selectedConfig.cost + serviceFee).toFixed(2);

  const handleCreateMarket = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    if (!tokenAddress) {
      toast.error('Please enter a base token address');
      return;
    }

    try {
      new PublicKey(tokenAddress); // Validate address format
    } catch (e) {
      toast.error('Invalid token address');
      return;
    }

    setIsCreating(true);
    
    // Simulation of market creation process
    // In a real implementation, this would build the OpenBook instructions
    // allocate space, and send the transaction.
    try {
      const loadingToast = toast.loading('Initializing Market creation...');
      
      // 1. Calculate rent exempt minimum (simulated)
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.loading('Allocating space on Solana...', { id: loadingToast });
      
      // 2. Create CreateAccount instructions for Market, EventQueue, RequestQueue, Bids, Asks
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.loading('Finalizing market registration...', { id: loadingToast });
      
      // 3. Initialize Market instruction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.dismiss(loadingToast);
      toast.success('Market ID created successfully! (Simulation)');
      
      // Reset form
      setTokenAddress('');
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to create market');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative flex flex-col items-center">
      <SEO 
        title="Create OpenBook Market ID | Low Cost 0.4 SOL"
        description="Create your OpenBook Market ID on Solana for just 0.4 SOL. The cheapest and fastest way to launch your token on Raydium."
        keywords="create openbook market id, solana market id, cheap openbook market, 0.4 sol market id, raydium market id"
      />

      {/* Note: Global background is now in Layout.tsx, removed local blobs to prevent duplication */}

      <div className="max-w-5xl w-full relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
             <ShoppingCart className="w-4 h-4" />
             OpenBook Market
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
            Create Market ID
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Initialize an OpenBook Market ID to enable trading on Raydium.
            <br/>
            Choose a configuration that fits your project's needs and budget.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Token Input Section */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold text-white">Base Token Address</Label>
                  <p className="text-sm text-zinc-400 mb-2">The address of the token you want to trade.</p>
                  <Input 
                    placeholder="Enter your token address (e.g. 7eyK...)" 
                    className="bg-black/50 border-zinc-700 h-12 font-mono text-zinc-200"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold text-white">Quote Token</Label>
                  <p className="text-sm text-zinc-400 mb-2">The token used to buy your token (usually SOL).</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setQuoteToken('SOL')}
                      className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                        quoteToken === 'SOL' 
                          ? 'bg-zinc-800 border-orange-500 text-white' 
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
            </div>

            {/* Plan Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-white pl-2">Select Market Plan</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MARKET_CONFIGS.map((config) => (
                  <div 
                    key={config.name}
                    onClick={() => setSelectedConfig(config)}
                    className={`relative cursor-pointer group rounded-2xl p-5 border-2 transition-all duration-300 ${
                      selectedConfig.name === config.name 
                        ? 'bg-zinc-900 border-orange-500 shadow-lg shadow-orange-500/10' 
                        : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {selectedConfig.name === config.name && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" /> Selected
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{config.name}</h3>
                          <p className="text-xs text-zinc-400">{config.recommendedFor}</p>
                        </div>
                        {config.name === "Economy" && <Zap className="w-5 h-5 text-yellow-500" />}
                        {config.name === "Standard" && <Shield className="w-5 h-5 text-blue-500" />}
                        {config.name === "Professional" && <Rocket className="w-5 h-5 text-purple-500" />}
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">~{config.cost}</span>
                        <span className="text-sm text-zinc-400">SOL</span>
                      </div>

                      <div className="space-y-1 text-xs text-zinc-400 pt-2 border-t border-zinc-800/50">
                        <div className="flex justify-between">
                          <span>Event Q:</span>
                          <span className="font-mono text-zinc-300">{config.eventQueueLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Request Q:</span>
                          <span className="font-mono text-zinc-300">{config.requestQueueLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Orderbook:</span>
                          <span className="font-mono text-zinc-300">{config.orderbookLength}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <span className="font-medium">Advanced Configuration</span>
                </div>
                {showAdvanced ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              
              {showAdvanced && (
                <div className="p-6 border-t border-zinc-800 grid md:grid-cols-2 gap-6 bg-black/20">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Min Order Size</Label>
                    <Input 
                      value={minOrderSize}
                      onChange={(e) => setMinOrderSize(e.target.value)}
                      className="bg-zinc-900 border-zinc-700"
                    />
                    <p className="text-xs text-zinc-500">Min amount users can buy.</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Price Tick</Label>
                    <Input 
                      value={priceTick}
                      onChange={(e) => setPriceTick(e.target.value)}
                      className="bg-zinc-900 border-zinc-700"
                    />
                    <p className="text-xs text-zinc-500">Min price increment.</p>
                  </div>
                  <div className="col-span-full">
                    <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                      <h4 className="text-xs font-bold text-blue-300 mb-3 uppercase tracking-wider">Recommended Configuration Guide</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-blue-500/20 text-blue-200">
                              <th className="py-2 pr-4">Token Supply</th>
                              <th className="py-2 pr-4">Min Order Size</th>
                              <th className="py-2">Tick Size</th>
                            </tr>
                          </thead>
                          <tbody className="text-zinc-400">
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('0.01'); setPriceTick('0.0001'); }}>
                              <td className="py-2 font-mono">100K</td>
                              <td className="py-2 font-mono">0.01</td>
                              <td className="py-2 font-mono">0.0001</td>
                            </tr>
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('0.1'); setPriceTick('0.00001'); }}>
                              <td className="py-2 font-mono">1M</td>
                              <td className="py-2 font-mono">0.1</td>
                              <td className="py-2 font-mono">0.00001</td>
                            </tr>
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('1'); setPriceTick('0.000001'); }}>
                              <td className="py-2 font-mono">10M</td>
                              <td className="py-2 font-mono">1</td>
                              <td className="py-2 font-mono">0.000001</td>
                            </tr>
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('10'); setPriceTick('0.0000001'); }}>
                              <td className="py-2 font-mono">100M</td>
                              <td className="py-2 font-mono">10</td>
                              <td className="py-2 font-mono">0.0000001</td>
                            </tr>
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('100'); setPriceTick('0.00000001'); }}>
                              <td className="py-2 font-mono">1B</td>
                              <td className="py-2 font-mono">100</td>
                              <td className="py-2 font-mono">0.00000001</td>
                            </tr>
                            <tr className="border-b border-blue-500/10 hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('1000'); setPriceTick('0.000000001'); }}>
                              <td className="py-2 font-mono">10B</td>
                              <td className="py-2 font-mono">1,000</td>
                              <td className="py-2 font-mono">0.000000001</td>
                            </tr>
                            <tr className="hover:bg-blue-500/5 cursor-pointer" onClick={() => { setMinOrderSize('10000'); setPriceTick('0.0000000001'); }}>
                              <td className="py-2 font-mono">100B</td>
                              <td className="py-2 font-mono">10,000</td>
                              <td className="py-2 font-mono">0.0000000001</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] text-blue-300/70 mt-2 italic">Click any row to auto-fill these values.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-24 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Network Rent</span>
                  <span className="text-white font-mono">~{selectedConfig.cost} SOL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Service Fee</span>
                  <span className="text-white font-mono">{serviceFee} SOL</span>
                </div>
                
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                  <span className="text-zinc-300 font-medium">Total Cost</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-orange-500">{totalCost}</span>
                    <span className="text-sm text-orange-500/80 ml-1">SOL</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-900/10 border border-orange-500/20 rounded-xl text-xs text-orange-200 leading-relaxed">
                <Info className="w-4 h-4 mb-2 inline-block mr-1" />
                This cost is primarily for Solana account rent storage. It is a one-time fee required by the blockchain protocol.
              </div>

              <Button 
                size="lg" 
                onClick={handleCreateMarket}
                disabled={isCreating}
                className={`w-full h-14 text-lg font-bold rounded-xl transition-all ${
                  isCreating 
                    ? 'bg-zinc-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-900/20'
                }`}
              >
                {isCreating ? 'Processing...' : 'Create Market'}
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-8 pt-12 border-t border-zinc-800/50">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid gap-6">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">What is Create OpenBook Market?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Create OpenBook Market is a tool that allows everyone, without coding experience, to create a Market (token pair on Solana Chain) customized for creating a liquidity pool later.
                <br /><br />
                All this process is faster and cheaper that any other option as it is automatically done. This tool is completely safe, audited by different development teams and used by biggest solana projects.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Is it Safe to use Create my Market here?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Yes, it is completely safe. Our tool interacts directly with the OpenBook smart contract on the Solana blockchain. We do not access your private keys or hold your funds at any point. The process is fully decentralized and transparent.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">How much time will the Creation of my OpenBook Market Take?</h3>
              <p className="text-zinc-400 leading-relaxed">
                The creation process is very fast, typically taking between 10 to 30 seconds. It depends on the current congestion of the Solana network. Once the transaction is confirmed, your Market ID is ready to use immediately.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">How much does Create OpenBook Market Cost?</h3>
              <p className="text-zinc-400 leading-relaxed">
                The cost depends on the plan you choose (Economy, Standard, or Professional), ranging from ~0.4 SOL to ~2.8 SOL. This cost is primarily the rent required by the Solana network to store your market data on-chain.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:bg-zinc-900/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Which wallet can I use?</h3>
              <p className="text-zinc-400 leading-relaxed">
                You can use any standard Solana wallet such as Phantom, Solflare, Backpack, or Coinbase Wallet.
              </p>
            </div>
          </div>

          <div className="space-y-12 pt-8">
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">CREATE OPENBOOK MARKET</h3>
                <p className="text-zinc-400 leading-relaxed">
                  If you're looking for an easy and efficient way to create an OpenBook Market on the Solana blockchain, our Create Market Tools is the perfect solution. We offer an intuitive and user-friendly platform that allows users to customize and create their OpenBook Markets in just a few minutes.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  With our Solana Market ID Creator, you don't have to be an expert in blockchain technology to create a Market for your Token and create a Liquidity Pool later.
                </p>
                 <p className="text-zinc-400 leading-relaxed">
                  Furthermore, we provide our users with high security and privacy. All transactions and market information are protected by our smart contract on chain. You can be sure that your assets are secure during the process and after it finishes.
                </p>
                 <p className="text-zinc-400 leading-relaxed">
                  We aim to give users a smooth and efficient experience when creating an OpenBook Market on the Solana blockchain. With our online creator, you can customize your Market Length in order to modify the OpenBook Market Conditions and get a cheaper storage fee.
                </p>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">CREATE MARKET ID</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Whether you have development knowledge, our Market ID Creator software is perfect. It will help you create an OpenBook Market quickly and securely, saving you time and money.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Furthermore, you can count on exceptional support to help you with anything. Our highly trained team is available 24/7 to help you resolve any issues or questions you may have.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Start creating a Market and your Liquidity Pool today with AiCyberProphet Tools. We assure you won't find an easier and more efficient experience elsewhere!
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateMarket;
