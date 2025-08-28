import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface AssetGeneratorScreenProps {
  progressLog: string[];
  hasError: boolean;
}

const AssetGeneratorScreen: React.FC<AssetGeneratorScreenProps> = ({ progressLog, hasError }) => {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl mb-6 text-shadow">Building Your Game...</h1>
      {!hasError && <LoadingSpinner />}
      <div className="mt-6 p-4 bg-gray-900 border-2 border-gray-700 w-full max-w-lg h-64 overflow-y-auto font-mono text-sm">
        {progressLog.map((log, index) => (
          <p key={index} className="text-green-400">
            &gt; {log}
          </p>
        ))}
        {hasError && <p className="text-red-500 mt-2">&gt; An error occurred. Please check the console and your API Key, then refresh to try again.</p>}
      </div>
      <p className="text-sm text-yellow-500 mt-4 text-shadow">This may take a moment on the first run...</p>
    </div>
  );
};

export default AssetGeneratorScreen;
