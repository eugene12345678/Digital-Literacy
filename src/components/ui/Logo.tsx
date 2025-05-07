import React from 'react';
import { LayoutGrid } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-50"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center h-full w-full border border-primary/30">
        <LayoutGrid className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
};

export default Logo;