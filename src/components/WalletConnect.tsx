
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Loader2, Check, Copy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animate } from '@/lib/animations';
import { useWallet } from '@/lib/hooks';
import { toast } from 'sonner';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  const { isConnected, address, isLoading, connect, disconnect } = useWallet();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  // Format address for display
  const displayAddress = address ? 
    `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {isConnected ? (
        <>
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow" />
            <span className="text-sm font-medium">{displayAddress}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleCopyAddress}
            className="h-9 w-9"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={disconnect}
            className="h-9 w-9 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button 
          onClick={connect} 
          disabled={isLoading}
          className="relative overflow-hidden group"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Wallet className="h-4 w-4 mr-2" />
          )}
          Connect Wallet
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
