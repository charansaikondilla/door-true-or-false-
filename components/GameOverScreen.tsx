import React from 'react';
import PixelatedButton from './PixelatedButton';

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  backgroundUrl: string;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, totalQuestions, onRestart, backgroundUrl }) => {
  const getFeedback = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Perfect Score! Mastermind!";
    if (percentage >= 80) return "Excellent! You're a trivia star!";
    if (percentage >= 50) return "Nice job! A worthy effort!";
    return "Better luck next time!";
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 pixelated"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="bg-black bg-opacity-70 p-8 border-4 border-white text-center">
        <h1 className="text-5xl text-white mb-4 text-shadow">Game Over</h1>
        <p className="text-2xl text-yellow-400 mb-2 text-shadow">Final Score</p>
        <p className="text-6xl text-white mb-6 text-shadow">{score} / {totalQuestions}</p>
        <p className="text-xl text-green-400 mb-8 text-shadow">{getFeedback()}</p>
        <PixelatedButton onClick={onRestart}>
          Play Again
        </PixelatedButton>
      </div>
    </div>
  );
};

export default GameOverScreen;
