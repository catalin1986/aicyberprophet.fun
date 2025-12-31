import { FC, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="container py-8">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};
