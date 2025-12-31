import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Rocket, Coins, LayoutDashboard, Send, Gem, Droplets, Briefcase, Users, BookOpen, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

/* CSS for wallet button override */
const walletButtonStyle = `
  .wallet-adapter-button {
    background-color: hsl(var(--primary)) !important;
    height: 40px !important;
    border-radius: 0.5rem !important;
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
    font-weight: 500 !important;
    font-family: inherit !important;
    font-size: 0.875rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    min-width: 140px !important;
    line-height: 1 !important;
  }
  .wallet-adapter-button:hover {
    background-color: hsl(var(--primary) / 0.9) !important;
  }
`;

export const Navbar: FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Create Token', path: '/create', icon: Rocket },
    { name: 'Create Market', path: '/create-market', icon: ShoppingCart },
    { name: 'Create Liquidity', path: '/create-liquidity', icon: Droplets },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', path: '/explore', icon: Coins },
    { name: 'Learn', path: '/blog', icon: BookOpen },
    { name: 'Fundraise', path: '/fundraise', icon: Gem },
    { name: 'Airdrop', path: '/airdrop', icon: Send },
    { name: 'Affiliate', path: '/affiliate', icon: Users },
  ];

  return (
    <>
    <style>{walletButtonStyle}</style>
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <img src="/favicon.svg" alt="AiCyberProphet Logo" className="h-8 w-8 rounded-full" />
            <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">AiCyberProphet</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton />
        </div>
      </div>
    </nav>
    </>
  );
};
