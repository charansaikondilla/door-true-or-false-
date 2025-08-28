import React from 'react';
import soundService from '../services/soundService';

interface PixelatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ children, onClick, ...props }) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundService.playClick();
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button
      className="bg-blue-600 text-white text-xl px-6 py-3 border-b-4 border-blue-800 hover:bg-blue-500 hover:border-blue-700 active:border-b-0 active:mt-1 transition-all duration-100 focus:outline-none text-shadow"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;
