import React from 'react';
import { Logo } from './logo';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showLogo = true,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center space-y-4 mb-8 ${className}`}>
      {showLogo && (
        <div className="mb-4 flex justify-center">
          <Logo size="lg" />
        </div>
      )}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-text-secondary text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}; 