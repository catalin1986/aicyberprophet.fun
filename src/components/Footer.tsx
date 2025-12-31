import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-8 py-12 px-4 mt-auto border-t border-border/20 bg-background/50 backdrop-blur-sm">
      
      {/* AdSense Placeholder */}
      <div className="w-full max-w-4xl">
        <div className="w-full h-[100px] bg-secondary/10 border border-border/50 rounded-lg flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
             <span className="text-muted-foreground/50 text-sm font-medium z-10">Advertisement</span>
             {/* 
                 Once approved, replace this div with your AdSense Unit code:
                 <ins class="adsbygoogle"
                      style={{ display: 'block' }}
                      data-ad-client="ca-pub-8550835616344745"
                      data-ad-slot="YOUR_AD_SLOT_ID"
                      data-ad-format="auto"
                      data-full-width-responsive="true"></ins>
                 <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
             */}
        </div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col items-center gap-4 max-w-4xl text-center">
        <a 
          href="https://x.com/AiCyberProphet" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 text-muted-foreground hover:text-primary transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <div className="text-xs text-muted-foreground/50 leading-relaxed">
          AiCyberProphet is an easy-to-use platform designed for users to create Solana-based tokens in no time, with no coding skills required. However, AiCyberProphet.fun is not responsible for issuing, endorsing, managing, or providing liquidity for any tokens created on our platform. We do not offer financial advice, investment guidance, or make any promises regarding the value, price, or potential returns of the tokens. The tokens generated through AiCyberProphet.fun are not considered securities, and users must ensure they comply with all relevant laws and regulations in their respective jurisdictions. AiCyberProphet.fun does not support token trading, fundraising, or liquidity provision. By using AiCyberProphet.fun, you understand and accept that creating and trading tokens carries inherent risks, such as the possibility of losing funds, market fluctuations, and regulatory uncertainties. Our platform is offered without any warranties or guarantees, and we disclaim any responsibility for the outcomes of its use. You assume full responsibility for your actions and any consequences that result. Always perform thorough research before engaging with any token or project.
        </div>
        
        <div className="flex gap-6 text-xs text-muted-foreground mt-2">
          <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Knowledge Base</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
