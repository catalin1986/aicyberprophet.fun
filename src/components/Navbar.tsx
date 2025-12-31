import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Rocket, Coins, LayoutDashboard, Send, Gem, Droplets, Briefcase, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Create Token', path: '/create', icon: Rocket },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', path: '/explore', icon: Coins },
    { name: 'Fundraise', path: '/fundraise', icon: Gem },
    { name: 'Airdrop', path: '/airdrop', icon: Send },
    { name: 'Affiliate', path: '/affiliate', icon: Users },
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <img src="/logo.png" alt="AiCyberProphet Logo" className="h-8 w-8 rounded-full" />
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
            
            {/* External Links */}
            <a
              href="https://raydium.io/liquidity/create-pool/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Droplets className="h-4 w-4" />
              Create Liquidity
            </a>
            <a
              href="https://raydium.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              Manage Liquidity
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !h-10 !rounded-md !px-4 !py-2 !font-medium" />
        </div>
      </div>
    </nav>
  );
};
