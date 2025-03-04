
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FaucetRequest from '@/components/FaucetRequest';
import { useWallet } from '@/lib/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { animate } from '@/lib/animations';

const Index = () => {
  const { isConnected, address } = useWallet();
  
  // Animation effect for initial load
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Hero className="mb-12" />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FaucetRequest 
                walletAddress={address}
                isWalletConnected={isConnected}
              />
            </div>
            
            <div className="space-y-6">
              <Card className={animate('slide-up')}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">What are test tokens?</h3>
                  <p className="text-muted-foreground text-sm">
                    Test tokens are used for development and testing on Sui's non-production networks. 
                    These tokens have no real value and can be freely requested from this faucet.
                  </p>
                </CardContent>
              </Card>
              
              <Card className={animate('slide-up', 1)}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Networks</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">Devnet</p>
                      <p>Used for early development and testing new features.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Testnet</p>
                      <p>Mirrors the mainnet environment for final testing.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={animate('slide-up', 2)}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Ready to build?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get started with Sui Network development using our resources:
                  </p>
                  <div className="space-y-2 text-sm">
                    <a 
                      href="https://docs.sui.io/guides/developer/getting-started" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-2 rounded-md bg-secondary hover:bg-secondary/70 transition-colors"
                    >
                      Developer Guides
                    </a>
                    <a 
                      href="https://sui.io/ecosystem" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-2 rounded-md bg-secondary hover:bg-secondary/70 transition-colors"
                    >
                      Sui Ecosystem
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
