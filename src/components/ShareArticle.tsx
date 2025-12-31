import React, { useState } from 'react';
import { Twitter, Send, Link as LinkIcon, Check } from 'lucide-react';

interface ShareArticleProps {
  title: string;
}

export default function ShareArticle({ title }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this article: ${title} on @AiCyberProphet\n\n${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(`Check out this article: ${title}\n${url}`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className="border-t border-zinc-800 mt-12 pt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Share this article</h3>
        
        <div className="flex items-center gap-3">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 rounded-lg transition-colors font-medium"
          >
            <Twitter className="w-4 h-4" />
            <span>Tweet</span>
          </button>

          <button
            onClick={shareOnTelegram}
            className="flex items-center gap-2 px-4 py-2 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 rounded-lg transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
