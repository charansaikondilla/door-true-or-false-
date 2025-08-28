import React, { useState, useEffect } from 'react';
import { GameAssets, DoorState } from '../types';
import soundService from '../services/soundService';

interface DoorProps {
  label: 'TRUE' | 'FALSE';
  assets: GameAssets;
  onClick: () => void;
  isAnswered: boolean;
  wasChosen: boolean;
  isCorrect: boolean;
}

const Door: React.FC<DoorProps> = ({ label, assets, onClick, isAnswered, wasChosen, isCorrect }) => {
  const [doorState, setDoorState] = useState<DoorState>(DoorState.CLOSED);
  const [shake, setShake] = useState(false);
  const [showIcon, setShowIcon] = useState<null | 'correct' | 'wrong'>(null);

  useEffect(() => {
    if (!isAnswered) {
      setDoorState(DoorState.CLOSED);
      setShowIcon(null);
      return;
    }

    if (wasChosen) {
      if (isCorrect) {
        soundService.playCorrect();
        setTimeout(() => {
            setDoorState(DoorState.OPENING_1);
            setShowIcon('correct');
        }, 500); // Delay to sync with player movement
        setTimeout(() => setDoorState(DoorState.OPENING_2), 700);
      } else {
        soundService.playIncorrect();
        setShake(true);
        setTimeout(() => {
            setDoorState(DoorState.BLOCKED_1);
            setShowIcon('wrong');
        }, 500);
        setTimeout(() => setDoorState(DoorState.BLOCKED_2), 700);
        setTimeout(() => setShake(false), 800);
      }
    }
  }, [isAnswered, wasChosen, isCorrect]);

  const getDoorImage = () => {
    switch(doorState) {
        case DoorState.OPENING_1: return assets.doorOpen1;
        case DoorState.OPENING_2: return assets.doorOpen2;
        case DoorState.BLOCKED_1:
        case DoorState.BLOCKED_2:
        case DoorState.CLOSED:
        default: return assets.doorClosed;
    }
  }

  const shakeAnimation = shake ? 'animate-shake' : '';
  const buttonClasses = `relative group focus:outline-none transition-transform duration-100 ${!isAnswered ? 'hover:scale-105 active:scale-100 cursor-pointer' : 'cursor-default'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black bg-opacity-70 px-4 py-1 border-2 border-white mb-2">
        <h3 className="text-3xl text-white text-shadow">{label}</h3>
      </div>
      <button onClick={onClick} className={buttonClasses} disabled={isAnswered} aria-label={`Choose ${label}`}>
         <div className={`relative w-32 h-48 md:w-40 md:h-64 ${shakeAnimation}`} style={{ transformOrigin: 'center' }}>
            <img src={getDoorImage()} alt="door" className="w-full h-full pixelated" />
            
            {doorState === DoorState.BLOCKED_1 && <img src={assets.brickBlock1} alt="Bricked" className="absolute inset-0 w-full h-full pixelated"/>}
            {doorState === DoorState.BLOCKED_2 && <img src={assets.brickBlock2} alt="Bricked" className="absolute inset-0 w-full h-full pixelated"/>}

            <div className="absolute inset-0 flex items-center justify-center">
                {showIcon === 'correct' && <img src={assets.correctIcon} alt="Correct" className="w-16 h-16 pixelated animate-ping-once"/>}
                {showIcon === 'wrong' && <img src={assets.wrongIcon} alt="Wrong" className="w-16 h-16 pixelated"/>}
            </div>
         </div>
      </button>
      {/* Fix: The `jsx` prop on `<style>` is a Next.js feature and not valid in a standard React app. It has been removed to fix the TypeScript error. */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-2deg); }
          75% { transform: translateX(5px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        @keyframes ping-once {
          0% { transform: scale(0.5); opacity: 0.5; }
          75% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-ping-once {
            animation: ping-once 0.5s cubic-bezier(0.8, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Door;