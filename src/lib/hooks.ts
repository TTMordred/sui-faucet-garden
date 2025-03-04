
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
 * Hook for faucet requests
 */
export function useFaucet() {
  const [network, setNetwork] = useState<'devnet' | 'testnet'>('devnet');
  const [isRequesting, setIsRequesting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  const requestTokens = async (address: string) => {
    try {
      setIsRequesting(true);
      setTransactionStatus('pending');
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock transaction hash
      const hash = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setTransactionHash(hash);
      setTransactionStatus('success');
      
      // 90% success rate to simulate occasional errors
      if (Math.random() > 0.9) {
        throw new Error('Transaction failed');
      }
      
      return { hash };
    } catch (e) {
      setTransactionStatus('error');
      setTransactionHash(null);
      throw e;
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
