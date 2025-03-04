
import { useState, useEffect } from 'react';

/**
 * Mock hook for wallet connectivity - in a real app, this would use Sui SDK
 */
export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock address
      const mockAddress = '0x' + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setAddress(mockAddress);
      setIsConnected(true);
      
      // Store in session storage
      sessionStorage.setItem('walletAddress', mockAddress);
      sessionStorage.setItem('isConnected', 'true');
      
    } catch (e) {
      setError('Failed to connect wallet');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    sessionStorage.removeItem('walletAddress');
    sessionStorage.removeItem('isConnected');
  };

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('walletAddress');
    const savedConnection = sessionStorage.getItem('isConnected');
    
    if (savedAddress && savedConnection === 'true') {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  return {
    isConnected,
    address,
    isLoading,
    error,
    connect,
    disconnect
  };
}

/**
 * Hook for faucet requests using actual Sui faucet API
 */
export function useFaucet() {
  const [network, setNetwork] = useState<'devnet' | 'testnet'>('devnet');
  const [isRequesting, setIsRequesting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  // Get the correct faucet API URL based on the selected network
  const getFaucetUrl = () => {
    return network === 'devnet' 
      ? 'https://faucet.devnet.sui.io/gas'
      : 'https://faucet.testnet.sui.io/gas';
  };

  const requestTokens = async (address: string) => {
    try {
      setIsRequesting(true);
      setTransactionStatus('pending');
      
      // Create the request payload
      const payload = {
        FixedAmountRequest: {
          recipient: address
        }
      };

      // Make the API request to the Sui faucet
      const response = await fetch(getFaucetUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Parse the response
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to request tokens');
      }
      
      // Extract transaction hash from the response
      // The actual structure may vary based on the Sui faucet API response
      // This is based on current documentation
      const txHash = data.txHash || data.tx_digest || null;
      
      setTransactionHash(txHash);
      setTransactionStatus('success');
      
      return { hash: txHash };
    } catch (error) {
      console.error('Faucet request error:', error);
      setTransactionStatus('error');
      setTransactionHash(null);
      throw error;
    } finally {
      setIsRequesting(false);
    }
  };
  
  return {
    network,
    setNetwork,
    isRequesting,
    transactionStatus,
    transactionHash,
    requestTokens
  };
}
