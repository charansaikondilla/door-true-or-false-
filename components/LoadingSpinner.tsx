import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-12 h-12 border-4 border-dashed border-blue-500 rounded-full animate-spin pixelated"></div>
  );
};

export default LoadingSpinner;
