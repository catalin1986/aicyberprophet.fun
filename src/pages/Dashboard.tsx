import { FC } from 'react';
import { useUserTokens } from '@/hooks/useUserTokens';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2, Plus, ExternalLink, Shield, ShieldAlert, ShieldCheck, Copy, CheckCircle2, Circle, Trophy, Award, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const Dashboard: FC = () => {
  const { connected } = useWallet();
  const { tokens, isLoading, error } = useUserTokens();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied!');
  };

  const getDeveloperRank = (count: number) => {
    if (count >= 5) return { title: 'Certified Prophet', icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' };
    if (count >= 3) return { title: 'Adept Prophet', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/50' };
    return { title: 'Novice Prophet', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/50' };
  };

  if (!connected) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Connect Wallet</h1>
        <p className="text-muted-foreground max-w-md">
          Please connect your wallet to view and manage your tokens.
        </p>
      </div>
    );
  }

  const rank = getDeveloperRank(tokens.length);
  const RankIcon = rank.icon;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Developer Status */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
                Prophet Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your created tokens in one place.
            </p>
          </div>
          
          <div className={`p-4 rounded-xl border ${rank.border} ${rank.bg} flex items-center gap-4`}>
            <div className={`p-3 rounded-full ${rank.bg} border ${rank.border}`}>
              <RankIcon className={`w-8 h-8 ${rank.color}`} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Developer Status</div>
              <div className={`text-xl font-bold ${rank.color}`}>{rank.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{tokens.length} Projects Launched</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border/50 pb-8">
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-sm font-medium text-muted-foreground">Solana Network: <span className="text-green-500">Operational</span></span>
              </div>
           </div>
           
           <Link 
            to="/create" 
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Token
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center text-destructive">
            <p>Error loading tokens: {error}</p>
          </div>
        ) : tokens.length === 0 ? (
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-12 text-center space-y-6 backdrop-blur-sm">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">No Tokens Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't created any tokens yet. Start your journey by creating your first Solana token!
              </p>
            </div>
            <Link 
              to="/create" 
              className="inline-flex px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg transition-all"
            >
              Create Your First Token
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <div 
                key={token.id}
                className="group bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col"
              >
                {/* Token Header */}
                <div className="p-6 border-b border-border/50 relative">
                   {/* Background Glow */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all" />

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary border border-border overflow-hidden">
                        {token.image_url ? (
                          <img src={token.image_url} alt={token.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Img</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-none mb-1">{token.name}</h3>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                          {token.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <a 
                        href={`https://solscan.io/token/${token.address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"
                        title="View on Solscan"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>Mint Address</span>
                      <button 
                        onClick={() => copyToClipboard(token.address)}
                        className="hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {token.address.slice(0, 4)}...{token.address.slice(-4)}
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Token Details */}
                <div className="p-6 space-y-6 bg-secondary/5 flex-grow">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Supply</div>
                      <div className="font-mono font-medium">{token.supply.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Decimals</div>
                      <div className="font-mono font-medium">{token.decimals}</div>
                    </div>
                  </div>

                  {/* Authorities Status */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs text-muted-foreground mb-2">Authorities Status</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className={`flex flex-col items-center p-2 rounded-lg border ${!token.mint_authority ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                        {!token.mint_authority ? <ShieldCheck className="w-4 h-4 mb-1" /> : <Shield className="w-4 h-4 mb-1" />}
                        <span className="text-[10px] font-medium">Mint</span>
                      </div>
                      <div className={`flex flex-col items-center p-2 rounded-lg border ${!token.freeze_authority ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                        {!token.freeze_authority ? <ShieldCheck className="w-4 h-4 mb-1" /> : <Shield className="w-4 h-4 mb-1" />}
                        <span className="text-[10px] font-medium">Freeze</span>
                      </div>
                      <div className={`flex flex-col items-center p-2 rounded-lg border ${!token.update_authority ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-secondary/50 border-border text-muted-foreground'}`}>
                        {!token.update_authority ? <ShieldCheck className="w-4 h-4 mb-1" /> : <Shield className="w-4 h-4 mb-1" />}
                        <span className="text-[10px] font-medium">Update</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Launch Checklist */}
                  <div className="bg-black/20 rounded-xl p-4 border border-zinc-800/50 space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Launch Checklist</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Step 1/4</span>
                    </h4>
                    
                    <div className="flex items-center gap-3 text-sm text-green-400 bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">1. Token Created</span>
                    </div>

                    <Link to="/create-market" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white group/item transition-all p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-600 group-hover/item:border-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-transparent group-hover/item:bg-orange-500 transition-colors" />
                      </div>
                      <span className="flex-1">2. Create Market ID</span>
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded whitespace-nowrap">Save 2 SOL</span>
                    </Link>

                    <Link to="/create-liquidity" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white group/item transition-all p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-600 group-hover/item:border-blue-500 flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-transparent group-hover/item:bg-blue-500 transition-colors" />
                      </div>
                      <span>3. Add Liquidity</span>
                    </Link>

                    <a href={`https://dexscreener.com/solana/${token.address}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white group/item transition-all p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-600 group-hover/item:border-purple-500 flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-transparent group-hover/item:bg-purple-500 transition-colors" />
                      </div>
                      <span>4. Verify on Dexscreener</span>
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
