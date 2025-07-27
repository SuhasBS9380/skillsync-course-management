import React from 'react';
import { Logo } from './logo';

interface WelcomeBannerProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  title = "Welcome to SkylSync",
  subtitle = "Your comprehensive course management platform",
  showLogo = true,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        {showLogo && (
          <div className="mb-2 flex justify-center">
            <Logo size="lg" />
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 max-w-md">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}; 