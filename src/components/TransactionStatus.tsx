
import React from 'react';
import { Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animate } from '@/lib/animations';

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
    const baseUrl = network === 'devnet' 
      ? 'https://explorer.sui.io/txblock/' 
      : 'https://explorer.sui.io/txblock/';
    
    return `${baseUrl}${transactionHash}?network=${network}`;
  };

  return (
    <div 
      className={cn(
        "mt-6 p-4 rounded-lg border animate-scale-in", 
        status === 'pending' && "bg-secondary border-secondary",
        status === 'success' && "bg-green-50 border-green-200",
        status === 'error' && "bg-red-50 border-red-200",
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
            <div className="mt-2 flex items-center text-sm">
              <span className="text-muted-foreground">
                Transaction: {transactionHash.slice(0, 8)}...{transactionHash.slice(-6)}
              </span>
              <a 
                href={getExplorerUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 hover:text-blue-600 inline-flex items-center"
              >
                View <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          )}
          
          {status === 'error' && (
            <p className="text-sm text-muted-foreground mt-1">
              Please try again or check your connection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
