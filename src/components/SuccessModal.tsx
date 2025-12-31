import { FC } from 'react';
import { X, Twitter, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenData: {
    name: string;
    symbol: string;
    mint: string;
    image: string | null;
  };
}

export const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose, tokenData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenData.mint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetText = encodeURIComponent(
    `🚀 Just launched $${tokenData.symbol} on @AiCyberProphet!\n\n` +
    `Check it out here: https://aicyberprophet.fun/token/${tokenData.mint}\n\n` +
    `#Solana #Memecoin #AiCyberProphet`
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#0a0b0d] border border-green-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2 relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 bg-black">
              {tokenData.image ? (
                <img src={tokenData.image} alt={tokenData.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🚀</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Token Created!</h2>
            <p className="text-muted-foreground">
              <span className="text-green-400 font-semibold">{tokenData.name}</span> ({tokenData.symbol}) is now live on Solana.
            </p>
          </div>

          <div className="w-full space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Token Address</label>
            <div className="flex items-center gap-2 bg-secondary/30 border border-border/50 rounded-lg p-3">
              <code className="flex-1 text-sm font-mono text-white truncate">
                {tokenData.mint}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-muted-foreground hover:text-white"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full pt-4">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Twitter className="w-5 h-5" />
              Share on X
            </a>
            
            <Link
              to={`/token/${tokenData.mint}`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-secondary/80 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
            >
              View Profile
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
