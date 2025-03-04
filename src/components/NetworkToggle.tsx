
import React from 'react';
import { cn } from '@/lib/utils';

interface NetworkToggleProps {
  value: 'devnet' | 'testnet';
  onChange: (value: 'devnet' | 'testnet') => void;
  className?: string;
}

const NetworkToggle: React.FC<NetworkToggleProps> = ({ 
  value, 
  onChange,
  className 
}) => {
  return (
    <div className={cn("flex p-1 bg-secondary rounded-lg", className)}>
      <button
        onClick={() => onChange('devnet')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          value === 'devnet' 
            ? "bg-white text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Devnet
      </button>
      <button
        onClick={() => onChange('testnet')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          value === 'testnet' 
            ? "bg-white text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Testnet
      </button>
    </div>
  );
};

export default NetworkToggle;
