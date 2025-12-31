import { FC } from 'react';
import { useAllTokens } from '@/hooks/useAllTokens';
import { Loader2, ExternalLink, Copy, Search, Rocket } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Explore: FC = () => {
  const { tokens, isLoading, error } = useAllTokens();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied!');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              Explore Meme Coins
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the latest tokens created by the AiCyberProphet community.
          </p>
          
          {/* Search Bar Placeholder */}
          <div className="relative max-w-md mx-auto mt-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-border/50 rounded-full leading-5 bg-secondary/30 placeholder-muted-foreground focus:outline-none focus:bg-secondary/50 focus:ring-1 focus:ring-primary/50 sm:text-sm transition-all"
              placeholder="Search tokens by name or symbol..."
              disabled
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Loading the blockchain...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center text-destructive">
            <p>Error loading tokens: {error}</p>
          </div>
        ) : tokens.length === 0 ? (
          <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-border/50">
            <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Tokens Yet</h3>
            <p className="text-muted-foreground">Be the first to launch a token on AiCyberProphet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tokens.map((token) => (
              <div 
                key={token.id}
                className="group bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="aspect-square relative overflow-hidden bg-secondary/50">
                  {token.image_url ? (
                    <img 
                      src={token.image_url} 
                      alt={token.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Rocket className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                  
                  {/* Top Right Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                     <span className="px-2 py-1 rounded-md bg-background/80 backdrop-blur-md text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                       {token.symbol}
                     </span>
                  </div>
                </div>

                {/* Token Info */}
                <div className="p-5 space-y-4 relative">
                  <div>
                    <h3 className="font-bold text-lg truncate pr-2" title={token.name}>{token.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2.5em]">
                      {/* Description would go here if we fetched it, using placeholder for design */}
                      A community token launched on AiCyberProphet.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-border/30">
                    <div>
                      <div className="text-muted-foreground mb-0.5">Supply</div>
                      <div className="font-mono font-medium">{token.supply.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground mb-0.5">Decimals</div>
                      <div className="font-mono font-medium">{token.decimals}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                     <div className="flex items-center gap-1 bg-secondary/50 rounded-lg px-2 py-1.5 flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground truncate font-mono">
                          {token.address.slice(0, 4)}...{token.address.slice(-4)}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(token.address)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                     </div>
                     <a 
                        href={`https://solscan.io/token/${token.address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                        title="View on Solscan"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
