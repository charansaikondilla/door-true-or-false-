import React, { useState } from 'react';
import { GameAssets, Question, AnswerResult } from '../types';
import Door from './Door';
import PixelatedButton from './PixelatedButton';

interface GameScreenProps {
  assets: GameAssets;
  question: Question;
  onAnswer: (choice: boolean) => void;
  answerResult: AnswerResult | null;
  onNextQuestion: () => void;
  isAnswered: boolean;
  questionNumber: number;
  totalQuestions: number;
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  assets,
  question,
  onAnswer,
  answerResult,
  onNextQuestion,
  isAnswered,
  questionNumber,
  totalQuestions,
  score,
}) => {
  const [playerPosition, setPlayerPosition] = useState<'center' | 'left' | 'right'>('center');

  const handleDoorClick = (choice: boolean, position: 'left' | 'right') => {
    if (isAnswered) return;
    setPlayerPosition(position);
    setTimeout(() => onAnswer(choice), 500); // Allow time for player to move
  };

  const getPlayerPositionClass = () => {
    switch(playerPosition) {
      case 'left': return '-translate-x-[120px] md:-translate-x-[160px]';
      case 'right': return 'translate-x-[120px] md:translate-x-[160px]';
      case 'center':
      default: return 'translate-x-0';
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-between bg-cover bg-center p-4 pixelated relative overflow-hidden"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      {/* Top UI Bar */}
      <div className="w-full max-w-4xl bg-black bg-opacity-70 p-2 border-b-4 border-white flex justify-between text-lg md:text-xl z-10">
        <div className="text-shadow">Q: {questionNumber}/{totalQuestions}</div>
        <div className="text-yellow-400 text-shadow">Score: {score}</div>
      </div>
      
      {/* Question */}
      <div className="w-full max-w-4xl text-center bg-black bg-opacity-70 p-4 border-4 border-white -mt-20 z-10">
        <p className="text-white text-lg md:text-2xl leading-tight text-shadow">{question.statement}</p>
      </div>
      
      {/* Doors & Player Container */}
      <div className="w-full flex flex-col items-center justify-end flex-grow relative">
        <div className="flex justify-center items-end gap-8 md:gap-16 w-full absolute bottom-20">
            <Door
              label="TRUE"
              assets={assets}
              onClick={() => handleDoorClick(true, 'left')}
              isAnswered={isAnswered}
              wasChosen={answerResult?.choice === true}
              isCorrect={answerResult?.correct ?? false}
            />
            <Door
              label="FALSE"
              assets={assets}
              onClick={() => handleDoorClick(false, 'right')}
              isAnswered={isAnswered}
              wasChosen={answerResult?.choice === false}
              isCorrect={answerResult?.correct ?? false}
            />
        </div>

        {/* Player */}
        <div className="absolute bottom-4 w-16 h-24">
            <img 
                src={assets.player} 
                alt="player character" 
                className={`w-full h-full pixelated transition-transform duration-500 ease-in-out ${getPlayerPositionClass()}`} 
            />
        </div>
      </div>


      {/* Next Question Button */}
      <div className="h-20 flex items-center z-10">
        {isAnswered && (
          <PixelatedButton onClick={() => {
              onNextQuestion();
              setPlayerPosition('center');
          }}>
            {questionNumber === totalQuestions ? 'Finish' : 'Next Question'}
          </PixelatedButton>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
