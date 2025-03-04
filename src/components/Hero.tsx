
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { animate, useAnimateOnScroll } from '@/lib/animations';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(ref);

  return (
    <div 
      ref={ref}
      className={cn(
        "text-center max-w-3xl mx-auto px-4 animate-on-scroll", 
        className
      )}
    >
      <span className={cn(
        "inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary",
        animate('slide-down')
      )}>
        Test Tokens for Development
      </span>
      
      <h1 className={cn(
        "text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight",
        animate('slide-down', 1)
      )}>
        Sui Network Faucet
      </h1>
      
      <p className={cn(
        "mt-4 text-lg text-muted-foreground md:px-10",
        animate('slide-down', 2)
      )}>
        Request test tokens for Sui Network's devnet and testnet environments.
        Connect your wallet and start building on Sui today.
      </p>
      
      <div className={cn(
        "mt-8 relative",
        animate('slide-down', 3)
      )}>
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-2/3 aspect-[2/1] bg-gradient-radial from-primary/10 to-transparent opacity-50 blur-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
