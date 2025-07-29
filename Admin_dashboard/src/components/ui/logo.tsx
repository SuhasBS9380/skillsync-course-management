import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <img
      src="/logo.png"
      alt="SkylSync Logo"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
      style={{ maxHeight: '100%' }}
    />
  );
}; 