import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUmi } from '@/lib/umi';
import { publicKey } from '@metaplex-foundation/umi';
import { fetchDigitalAsset, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { Loader2, Copy, Check, Globe, Twitter, MessageCircle, ExternalLink, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TokenData {
  name: string;
  symbol: string;
  uri: string;
  mint: string;
  description?: string;
  image?: string;
  external_url?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
  authorities?: {
    update: boolean;
  };
}

export const TokenProfile: FC = () => {
  const { mintAddress } = useParams<{ mintAddress: string }>();
  const wallet = useWallet();
  const umi = useUmi(wallet);
  
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!mintAddress) return;
      
      try {
        setLoading(true);
        setError(null);
        const mintPubkey = publicKey(mintAddress);
        
        // Use fetchDigitalAsset to get both Mint and Metadata data
        const asset = await fetchDigitalAsset(umi, mintPubkey);
        
        // Fetch JSON Metadata
        let json: any = {};
        if (asset.metadata.uri) {
          try {
            const response = await fetch(asset.metadata.uri);
            json = await response.json();
          } catch (e) {
            console.warn("Failed to fetch JSON metadata uri", e);
          }
        }
        
        setTokenData({
          name: asset.metadata.name,
          symbol: asset.metadata.symbol,
          uri: asset.metadata.uri,
          mint: mintAddress,
          description: json.description,
          image: json.image,
          external_url: json.external_url,
          attributes: json.attributes,
          authorities: {
            // If updateAuthority matches the expected type or is not default system
            update: asset.metadata.updateAuthority.toString() !== '11111111111111111111111111111111', 
          }
        });

      } catch (err: any) {
        console.error("Failed to fetch token data", err);
        setError(err.message || "Failed to load token data");
        toast.error("Failed to load token data. Please check the address.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [mintAddress, umi]);

  const handleCopy = () => {
    if (mintAddress) {
      navigator.clipboard.writeText(mintAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!tokenData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Token Not Found</h1>
        <p className="text-muted-foreground">Could not load data for address: {mintAddress}</p>
        {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md text-center">
                <p className="text-sm text-destructive font-mono break-all">{error}</p>
            </div>
        )}
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  // Helper to find attribute
  const getAttribute = (key: string) => tokenData.attributes?.find(a => a.trait_type === key)?.value;

  const website = getAttribute('Website') || tokenData.external_url;
  const twitter = getAttribute('Twitter');
  const telegram = getAttribute('Telegram');
  const discord = getAttribute('Discord');

  return (
    <div className="min-h-screen bg-background bg-grid-pattern py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-green-500/20 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Token Image */}
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-background shadow-2xl shrink-0">
              {tokenData.image ? (
                <img src={tokenData.image} alt={tokenData.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl">🪙</div>
              )}
            </div>

            {/* Token Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                  {tokenData.name}
                  <span className="text-xl bg-secondary/50 px-3 py-1 rounded-full text-muted-foreground border border-border/50">
                    {tokenData.symbol}
                  </span>
                </h1>
              </div>

              {/* Address */}
              <div className="flex items-center justify-center md:justify-start gap-2 max-w-md">
                <code className="text-sm bg-black/40 px-3 py-1.5 rounded-lg font-mono text-muted-foreground truncate border border-white/5">
                  {tokenData.mint}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-white"
                  title="Copy Address"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-lg transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Website</span>
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 text-[#1DA1F2] rounded-lg transition-colors">
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">Twitter</span>
                  </a>
                )}
                {telegram && (
                  <a href={telegram} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/20 text-[#0088cc] rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Telegram</span>
                  </a>
                )}
                <a href={`https://solscan.io/token/${tokenData.mint}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Solscan</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">About {tokenData.name}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {tokenData.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Authorities Status */}
            <div className="bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Security Status</h3>
              <div className="space-y-4">
                {/* Note: In a real app we'd check actual authorities on the Mint Account, 
                    here we only have Metadata Update Authority easily available without fetching Mint info.
                    If updateAuthority is null/none (or system program), it's revoked.
                */}
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Update Authority</span>
                  </div>
                  {/* Simplistic check: if it's the 1111...111 address or a special address, it might be revoked. 
                      Actually `fetchMetadataFromSeeds` returns the struct. 
                      Let's assume if we can't edit it, it's safer. 
                      But we don't know for sure without checking the logic.
                  */}
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                     Unknown
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Note: This is a preview. Full security analysis requires fetching Mint Account data.
              </p>
            </div>

            {/* Attributes */}
            {tokenData.attributes && tokenData.attributes.length > 0 && (
              <div className="bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Attributes</h3>
                <div className="space-y-3">
                  {tokenData.attributes.map((attr, idx) => (
                     !['Website', 'Twitter', 'Telegram', 'Discord', 'Creator'].includes(attr.trait_type) && (
                      <div key={idx} className="flex justify-between items-center text-sm p-2 border-b border-border/30 last:border-0">
                        <span className="text-muted-foreground">{attr.trait_type}</span>
                        <span className="font-medium">{attr.value}</span>
                      </div>
                     )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
