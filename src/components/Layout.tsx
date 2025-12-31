import { FC, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

import { Link } from 'react-router-dom';

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Navbar />
      <main className="container py-8 flex-1">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AiCyberProphet. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-right" />
    </div>
  );
};
