
import React from 'react';
import { animate } from '@/lib/animations';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative ${sizes[size]} aspect-square ${animate('float')}`}>
        <div className="absolute inset-0 bg-sui-blue rounded-full opacity-70 blur-sm"></div>
        <div className="absolute inset-[15%] bg-gradient-to-br from-sui-teal to-sui-blue rounded-full"></div>
        <div className="absolute inset-[30%] bg-white rounded-full"></div>
      </div>
      <div className="font-medium">
        <span className="text-sui-dark">Sui</span>
        <span className="text-sui-blue">Faucet</span>
      </div>
    </div>
  );
};

export default Logo;
