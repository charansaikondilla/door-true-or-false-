import React from 'react';
import PixelatedButton from './PixelatedButton';

interface StartScreenProps {
  onStart: () => void;
  backgroundUrl: string;
  onRegenerate: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, backgroundUrl, onRegenerate }) => {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 pixelated"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="bg-black bg-opacity-70 p-8 border-4 border-white text-center">
        <h1 className="text-4xl md:text-6xl text-white mb-4 text-shadow">True or False</h1>
        <h2 className="text-2xl md:text-4xl text-yellow-400 mb-8 text-shadow">Door Challenge</h2>
        <PixelatedButton onClick={onStart}>
          Start Game
        </PixelatedButton>
        <button onClick={onRegenerate} className="text-xs text-gray-400 hover:text-white mt-6 block mx-auto underline">
            Clear Cache & Regenerate Assets
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
