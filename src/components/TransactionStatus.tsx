
import React from 'react';
import { Loader2, CheckCircle2, AlertCircle, ArrowUpRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animate } from '@/lib/animations';
import { Button } from '@/components/ui/button';

interface TransactionStatusProps {
  status: 'idle' | 'pending' | 'success' | 'error';
  transactionHash?: string | null;
  network: 'devnet' | 'testnet';
  className?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  transactionHash,
  network,
  className
}) => {
  if (status === 'idle') return null;

  const getExplorerUrl = () => {
    // Use the correct explorer URL based on the network
    return `https://explorer.sui.io/txblock/${transactionHash}?network=${network}`;
  };

  return (
    <div 
      className={cn(
        "mt-6 p-4 rounded-lg border animate-scale-in", 
        status === 'pending' && "bg-secondary border-secondary",
        status === 'success' && "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900",
        status === 'error' && "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {status === 'pending' && (
          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
        )}
        {status === 'success' && (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        )}
        {status === 'error' && (
          <AlertCircle className="h-5 w-5 text-red-500" />
        )}
        
        <div className="flex-1">
          <p className="font-medium">
            {status === 'pending' && "Processing request..."}
            {status === 'success' && "Tokens sent successfully!"}
            {status === 'error' && "Failed to send tokens"}
          </p>
          
          {status === 'success' && transactionHash && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">
                Transaction ID: {transactionHash.slice(0, 8)}...{transactionHash.slice(-6)}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => window.open(getExplorerUrl(), '_blank', 'noopener,noreferrer')}
              >
                View on Explorer <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <p className="text-sm text-muted-foreground mt-1">
              Please check your connection and wallet address, then try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
