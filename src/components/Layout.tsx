
import React from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import WalletConnect from './WalletConnect';
import { useWallet } from '@/lib/hooks';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { isConnected, address } = useWallet();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 mx-auto px-4">
          <Logo />
          <WalletConnect />
        </div>
      </header>
      
      <main className={cn("flex-1 py-12", className)}>
        {children}
      </main>
      
      <footer className="py-6 border-t bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sui Network Faucet
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://sui.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sui Network
              </a>
              <a 
                href="https://docs.sui.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </a>
              <a 
                href="https://github.com/sui-foundation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
