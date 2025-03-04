
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import NetworkToggle from './NetworkToggle';
import TransactionStatus from './TransactionStatus';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animate } from '@/lib/animations';
import { useFaucet } from '@/lib/hooks';
import { toast } from 'sonner';

interface FaucetRequestProps {
  walletAddress?: string | null;
  isWalletConnected: boolean;
  className?: string;
}

const FaucetRequest: React.FC<FaucetRequestProps> = ({
  walletAddress,
  isWalletConnected,
  className
}) => {
  const [customAddress, setCustomAddress] = useState('');
  const {
    network,
    setNetwork,
    isRequesting,
    transactionStatus,
    transactionHash,
    requestTokens
  } = useFaucet();

  const handleRequestTokens = async () => {
    try {
      const addressToUse = walletAddress || customAddress;
      
      if (!addressToUse) {
        toast.error('Please connect your wallet or enter a valid address');
        return;
      }
      
      // Validate address format (basic check)
      if (!addressToUse.startsWith('0x') || addressToUse.length < 20) {
        toast.error('Please enter a valid Sui address');
        return;
      }
      
      await requestTokens(addressToUse);
      toast.success(`Tokens requested successfully on ${network}!`);
    } catch (error) {
      // Check if error is a specific API error or a general one
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to request tokens. Please try again later.';
        
      toast.error(errorMessage);
      console.error('Token request error:', error);
    }
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={animate('slide-up')}>Request Tokens</CardTitle>
            <CardDescription className={cn("mt-1.5", animate('slide-up', 1))}>
              Get test tokens for Sui {network}
            </CardDescription>
          </div>
          <NetworkToggle
            value={network}
            onChange={setNetwork}
            className={animate('slide-up', 2)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {!isWalletConnected && (
          <div className={cn("space-y-1.5", animate('slide-up', 2))}>
            <label htmlFor="address" className="text-sm font-medium text-muted-foreground">
              Sui Wallet Address
            </label>
            <Input
              id="address"
              placeholder="Enter your Sui address (0x...)"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
        )}
        
        {isWalletConnected && walletAddress && (
          <div className={cn("mt-1 p-3 bg-secondary/50 rounded-lg", animate('slide-up', 2))}>
            <p className="text-sm text-muted-foreground">Connected Wallet</p>
            <p className="font-medium mt-1">{walletAddress}</p>
          </div>
        )}

        <TransactionStatus 
          status={transactionStatus}
          transactionHash={transactionHash}
          network={network}
          className={animate('slide-up', 3)}
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleRequestTokens}
          disabled={isRequesting || (!isWalletConnected && !customAddress)}
          className={cn("w-full", animate('slide-up', 3))}
        >
          {isRequesting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Requesting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Request {network} Tokens
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FaucetRequest;
