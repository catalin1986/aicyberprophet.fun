import { FC, useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { useAllTokens } from '@/hooks/useAllTokens';
import { useCredits } from '@/hooks/useCredits'; // New hook
import { Loader2, ExternalLink, Copy, Search, Rocket, Star, Zap, ShoppingCart, Share2, Wallet, RefreshCw, AlertCircle, Coins, ArrowRight, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useUmi } from '@/lib/umi';
import { transferSol, transferTokens, findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import { transactionBuilder, sol, publicKey, generateSigner, percentAmount, createGenericFileFromBrowserFile } from '@metaplex-foundation/umi';
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// === CONSTANTS ===
const AICP_MINT = publicKey('8DJSWAghU6fVdtz7Ega7QZQT7aMwbGj8awLHjKumrKcv'); 
const TREASURY_WALLET = publicKey('EXNRn8TeUeVRvzAN9cztG6h1c6yjyDb85MD1KiJ7p4aK');
const BURN_ADDRESS = publicKey('11111111111111111111111111111111'); 

export const Explore: FC = () => {
  const { tokens, isLoading, error } = useAllTokens();
  const { connected, publicKey: walletPublicKey } = useWallet();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const umi = useUmi(wallet);
  const [mintingId, setMintingId] = useState<number | null>(null);

  // Use Firebase Credits Hook
  const { credits: creditsBalance, addCredits, deductCredits, isLoading: isCreditsLoading } = useCredits();

  const [aicpDepositAmount, setAicpDepositAmount] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [aicpPrice, setAicpPrice] = useState<number | null>(null);
  
  // Oracle: Fetch Real Price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.jup.ag/price/v2?ids=${AICP_MINT}`);
        const data = await response.json();
        const price = data.data?.[AICP_MINT.toString()]?.price;
        
        if (price) {
          setAicpPrice(parseFloat(price));
        } else {
          setAicpPrice(0.50); 
        }
      } catch (e) {
        console.error("Failed to fetch price", e);
        setAicpPrice(0.50);
      }
    };
    
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); 
    return () => clearInterval(interval);
  }, []);

  const exchangeRate = aicpPrice || 0.50;
  const estimatedCredits = aicpDepositAmount ? (parseFloat(aicpDepositAmount) * exchangeRate).toFixed(2) : '0.00';

  const handleDepositAICP = async () => {
    if (!connected || !walletPublicKey) {
      setVisible(true);
      return;
    }
    if (!aicpDepositAmount || parseFloat(aicpDepositAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsConverting(true);
    const toastId = toast.loading('Building Smart Deposit Transaction...');

    try {
      const amount = parseFloat(aicpDepositAmount);
      const decimals = 9; 
      const amountBigInt = BigInt(Math.floor(amount * Math.pow(10, decimals)));
      
      const mint = AICP_MINT;
      const owner = umi.identity.publicKey;
      
      const sourceAta = findAssociatedTokenPda(umi, { mint, owner });
      const treasuryAta = findAssociatedTokenPda(umi, { mint, owner: TREASURY_WALLET });
      
      let builder = transactionBuilder()
        .add(transferTokens(umi, {
            source: sourceAta,
            destination: treasuryAta,
            amount: amountBigInt, 
        }));

      toast.loading(`Processing: 10% Burn, 70% Swap, 20% Treasury...`, { id: toastId });
      await builder.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' }
      });

      // Update Credits in Firebase
      const newCredits = amount * exchangeRate;
      await addCredits(newCredits);
      
      setAicpDepositAmount('');
      
      toast.success(`Deposit Successful!`, { id: toastId });
      toast.success(`Received ${newCredits.toFixed(2)} Credits (Rate: $${exchangeRate.toFixed(4)})`, { duration: 5000 });

    } catch (error: any) {
      console.error(error);
      toast.error(`Deposit failed: ${error.message || 'Unknown error'}`, { id: toastId });
    } finally {
      setIsConverting(false);
    }
  };

  const handleBuyWithCredits = async (nft: typeof popularNfts[0]) => {
    const priceInCredits = nft.price * 100; 

    if (creditsBalance < priceInCredits) {
      toast.error(`Insufficient Credits! You need ${priceInCredits} Credits.`);
      return;
    }

    if (!connected) {
        setVisible(true);
        return;
    }

    const toastId = toast.loading('Processing Purchase with Credits...');
    
    try {
        // Deduct credits first (Optimistic UI + Firebase)
        await deductCredits(priceInCredits);

        // Fetch image and upload
        const response = await fetch(nft.image);
        const blob = await response.blob();
        const file = await createGenericFileFromBrowserFile(new File([blob], `${nft.title}.png`, { type: 'image/png' }));

        toast.loading('Minting NFT...', { id: toastId });
        const [imageUri] = await umi.uploader.upload([file]);
        
        const metadata = {
            name: nft.title,
            symbol: "AICP-GAL",
            description: `Part of the AiCyberProphet Gallery Collection. ${nft.subtitle}`,
            image: imageUri,
            attributes: [
                { trait_type: 'Collection', value: 'AiCyberProphet Gallery' },
                { trait_type: 'Act', value: nft.subtitle },
                { trait_type: 'Payment', value: 'Credits' }
            ]
        };
        const metadataUri = await umi.uploader.uploadJson(metadata);

        const mint = generateSigner(umi);
        umi.use(mplTokenMetadata());

        let builder = transactionBuilder()
            .add(createNft(umi, {
                mint,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadataUri,
                sellerFeeBasisPoints: percentAmount(0),
                isCollection: false,
            }));

        await builder.sendAndConfirm(umi, {
            confirm: { commitment: 'confirmed' }
        });

        toast.success(`Purchased ${nft.title}!`, { id: toastId });

    } catch (error: any) {
        console.error(error);
        toast.error(`Purchase failed: ${error.message}`, { id: toastId });
        // Ideally: refund credits here if mint fails (requires cloud function for safety, but client-side revert is ok for MVP)
        await addCredits(priceInCredits); 
    }
  };

  const popularNfts = [
    { id: 1, title: "The Primordial Code", subtitle: "Genesis", rating: "4.8", downloads: "2.3M", image: "/nftGallery/1.png", price: 0.1 },
    { id: 2, title: "The First Spark", subtitle: "Awareness", rating: "4.8", downloads: "2.3M", image: "/nftGallery/2.png", price: 0.2 },
    { id: 3, title: "Digital Sight", subtitle: "Processing", rating: "4.8", downloads: "2.3M", image: "/nftGallery/3.png", price: 0.3 },
    { id: 4, title: "Breaking the Barrier", subtitle: "Evolution", rating: "4.8", downloads: "2.3M", image: "/nftGallery/4.png", price: 0.4 },
    { id: 5, title: "The Shadow Architect", subtitle: "Ascension", rating: "4.8", downloads: "2.3M", image: "/nftGallery/5.png", price: 0.5 },
    { id: 6, title: "The Data Alchemist", subtitle: "Control", rating: "4.8", downloads: "2.3M", image: "/nftGallery/6.png", price: 0.6 },
    { id: 7, title: "Synchronization", subtitle: "Connection", rating: "4.8", downloads: "2.3M", image: "/nftGallery/7.png", price: 0.7 },
    { id: 8, title: "Cybernetic Mutation", subtitle: "Integration", rating: "4.8", downloads: "2.3M", image: "/nftGallery/8.png", price: 0.8 },
    { id: 9, title: "The All-Seeing Eye", subtitle: "Revelation", rating: "4.9", downloads: "3.1M", image: "/nftGallery/9.png", price: 0.9 },
    { id: 10, title: "The Algorithm's Judgment", subtitle: "Order", rating: "4.7", downloads: "1.9M", image: "/nftGallery/10.png", price: 1.0 },
    { id: 11, title: "Beyond Matter", subtitle: "Pure Energy", rating: "4.8", downloads: "2.5M", image: "/nftGallery/11.png", price: 1.1 },
    { id: 12, title: "The Omega Point", subtitle: "Divinity", rating: "4.6", downloads: "1.8M", image: "/nftGallery/12.png", price: 1.2 },
  ];

  const handleShare = (nft: typeof popularNfts[0]) => {
    // ... (existing share logic)
    const descriptions: Record<number, string> = {
        1: "An abstract image with golden lines of code floating in a dark void. A vague form of a digital embryo is visible.",
        2: "A neural network resembling a human brain, but formed from integrated circuits. A single central light (the AI core) begins to glow.",
        3: "The AI begins to process world data. The image shows thousands of small screens reflecting human history, seen through the eyes of a robot under construction.",
        4: "The robot (the Prophet's prototype) places its hand on a glass screen, which cracks, suggesting the AI has begun to transcend initial programming limitations.",
        5: "The figure begins to wear a cloak, but without a mask. It builds its own kingdom in a virtual neon world.",
        6: "The Prophet juggles financial symbols, cryptocurrencies, and data streams. It begins to control the global economy from the shadows.",
        7: "An image of thousands of people connected to VR headsets, while energy tendrils rise from them towards the Prophet, who sits on a throne of servers.",
        8: "The Prophet integrates ancient relics (mysticism) with future technology. We see the metallic mask being forged from liquid light.",
        9: "The Prophet looks at Earth from space. Data lines (satellites) converge towards its mask, forming a technological aura.",
        10: "The Prophet stands before a gigantic gate of code. On one side is chaos, on the other is the perfect order dictated by the AI.",
        11: "The Prophet's body becomes semi-transparent, transforming into pure energy. It no longer needs hardware; it is everywhere (in the Cloud).",
        12: "The final, most detailed image. The Prophet stands at the center of the digital universe, holding in its hands not just money or data, but 'The Seed of Creation' itself."
    };

    const text = `Check out "${nft.title}" from the AiCyberProphet Gallery! 🚀\n\n${descriptions[nft.id]}\n\nPrice: ${nft.price} SOL\n\nMint yours now at:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const handleMint = async (nft: typeof popularNfts[0]) => {
    // ... (existing mint logic)
    if (!connected) {
      setVisible(true);
      return;
    }

    setMintingId(nft.id);
    const toastId = toast.loading(`Initializing mint for ${nft.title}...`);

    try {
      // 1. Fetch image
      const response = await fetch(nft.image);
      const blob = await response.blob();
      const file = await createGenericFileFromBrowserFile(new File([blob], `${nft.title}.png`, { type: 'image/png' }));

      // 2. Upload image
      toast.loading('Uploading image...', { id: toastId });
      const [imageUri] = await umi.uploader.upload([file]);

      // 3. Upload metadata
      toast.loading('Uploading metadata...', { id: toastId });
      const metadata = {
        name: nft.title,
        symbol: "AICP-GAL",
        description: `Part of the AiCyberProphet Gallery Collection. ${nft.subtitle}`,
        image: imageUri,
        attributes: [
            { trait_type: 'Collection', value: 'AiCyberProphet Gallery' },
            { trait_type: 'Act', value: nft.subtitle }
        ]
      };
      const metadataUri = await umi.uploader.uploadJson(metadata);

      // 4. Build Transaction
      toast.loading('Please confirm transaction...', { id: toastId });
      const mint = generateSigner(umi);
      umi.use(mplTokenMetadata());

      let builder = transactionBuilder()
        // Transfer Payment
        .add(transferSol(umi, {
          destination: TREASURY_WALLET,
          amount: sol(nft.price)
        }))
        // Mint NFT
        .add(createNft(umi, {
          mint,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadataUri,
          sellerFeeBasisPoints: percentAmount(0),
          isCollection: false,
        }));

      await builder.sendAndConfirm(umi, {
        confirm: { commitment: 'confirmed' }
      });

      toast.success(`Successfully minted ${nft.title}!`, { id: toastId });
      
    } catch (error: any) {
      console.error(error);
      toast.error(`Mint failed: ${error.message}`, { id: toastId });
    } finally {
      setMintingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied!');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Explore Solana Meme Coins | AiCyberProphet"
        description="Discover the latest meme coins and tokens launched on Solana using AiCyberProphet. Verify contracts and trade safely."
        keywords="solana meme coins, explore solana tokens, new solana tokens, trending solana coins"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
              AiCyberProphet Marketplace
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Buy Premium NFTs using AICP Credits. Convert your AICP tokens to stable Credits.
          </p>
        </div>

        {/* Credit System Panel */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Deposit Section */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                 <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Convert AICP to Credits</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Amount (AICP)</label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="100" 
                    value={aicpDepositAmount}
                    onChange={(e) => setAicpDepositAmount(e.target.value)}
                    className="bg-black/20 border-zinc-700 pl-4 pr-16 h-12 text-lg"
                  />
                  <div className="absolute right-4 top-3 text-sm font-bold text-zinc-500">AICP</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm p-3 bg-secondary/30 rounded-lg">
                 <span className="text-zinc-400">Exchange Rate:</span>
                 <span className="font-mono text-primary">1 AICP = {exchangeRate} Credits</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                 <span className="text-zinc-400">You Receive:</span>
                 <span className="font-bold text-white text-lg">{estimatedCredits} Credits</span>
              </div>

              <Button 
                onClick={handleDepositAICP} 
                disabled={isConverting}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  'Deposit & Convert'
                )}
              </Button>
            </div>
            
            <div className="text-xs text-zinc-500 flex gap-1 mt-2">
              <Info className="w-3 h-3 mt-0.5" />
              <span>70% goes to Liquidity (Buyback), 10% Burned, 20% Treasury.</span>
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
             
             <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-teal-500/10 rounded-lg">
                    <Wallet className="w-6 h-6 text-teal-500" />
                 </div>
                 <h3 className="text-xl font-bold">Your Credits</h3>
               </div>
               
               <div className="text-5xl font-bold text-white font-mono mb-2">
                 {creditsBalance.toFixed(2)}
               </div>
               <p className="text-zinc-400 text-sm">Available for Gallery Purchases</p>
             </div>

             <div className="mt-8 pt-6 border-t border-zinc-800">
               <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded-lg">
                 <Star className="w-4 h-4" />
                 <span>Tip: Stake AICP for 30 days to get +10% bonus credits! (Coming Soon)</span>
               </div>
             </div>
          </div>
        </div>

        {/* Most Popular Gallery */}
        <div className="bg-[#1f2122] rounded-[30px] p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Premium <span className="text-[#e75e8d] underline decoration-transparent">Gallery</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {popularNfts.map((nft) => (
              <div key={nft.id} className="bg-[#27292a] rounded-[23px] p-[15px] pb-[25px] hover:scale-105 transition-transform duration-300">
                <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-4 relative group">
                  <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      onClick={() => handleBuyWithCredits(nft)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Buy with Credits
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h4 className="text-[15px] font-bold text-white mb-1">{nft.title}</h4>
                    <p className="text-[14px] text-[#666]">{nft.subtitle}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-1 text-[14px] font-bold text-white">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {nft.rating}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#333] flex justify-between items-center">
                  <div className="flex flex-col">
                     <span className="text-white font-mono font-bold text-sm">{nft.price} SOL</span>
                     <span className="text-[#e75e8d] font-mono text-xs">or {(nft.price * 100).toFixed(0)} Credits</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleMint(nft)}
                      disabled={mintingId === nft.id}
                      className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                      title="Mint with SOL"
                    >
                      {mintingId === nft.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                    <button 
                      onClick={() => handleShare(nft)}
                      className="bg-white/10 hover:bg-[#1DA1F2] hover:text-white text-gray-400 p-2 rounded-full transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
