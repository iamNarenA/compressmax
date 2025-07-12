import React from 'react';

interface AdBannerProps {
  size: 'banner' | 'rectangle' | 'leaderboard';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ size, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'h-[250px] w-full';
      case 'rectangle':
        return 'h-[250px] w-[300px]';
      case 'leaderboard':
        return 'h-[90px] w-full';
      default:
        return 'h-[250px] w-full';
    }
  };

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getSizeClasses()} ${className}`}>
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-2">Advertisement</div>
        <div className="text-sm text-gray-600">
          {size === 'leaderboard' ? 'Google AdSense - Leaderboard' : 'Google AdSense - Banner'}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Ad content will appear here after approval
        </div>
      </div>
    </div>
  );
};

export default AdBanner;