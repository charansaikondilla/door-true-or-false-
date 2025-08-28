import React, { useState, useCallback, useEffect } from 'react';
import { GameState, AnswerResult, Question } from './types';
import AssetGeneratorScreen from './components/AssetGeneratorScreen';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import useGameAssets from './hooks/useGameAssets';
import soundService from './services/soundService';

const App: React.FC = () => {
  const { assets, questions, isLoading, progressLog, hasError, regenerateAssets } = useGameAssets();
  const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);

  useEffect(() => {
    if (!isLoading && assets && questions) {
      setGameState(GameState.READY_TO_PLAY);
    } else {
      setGameState(GameState.LOADING);
    }
  }, [isLoading, assets, questions]);

  const startGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerResult(null);
    setGameState(GameState.PLAYING);
    // You might want to add a start game sound here
  };

  const handleAnswer = (choice: boolean) => {
    const correct = choice === (questions as Question[])[currentQuestionIndex].isTrue;
    if (correct) {
      setScore(prev => prev + 1);
    }
    setAnswerResult({ choice, correct });
    setGameState(GameState.ANSWERED);
  };

  const handleNextQuestion = () => {
    setAnswerResult(null);
    if (currentQuestionIndex < (questions as Question[]).length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setGameState(GameState.PLAYING);
    } else {
      soundService.playGameOver();
      setGameState(GameState.GAME_OVER);
    }
  };

  const renderContent = () => {
    if (!process.env.API_KEY) {
      return (
        <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-2xl text-red-500 mb-4 text-shadow">Configuration Error</h1>
            <p className="text-lg text-shadow">API_KEY environment variable not set.</p>
            <p className="mt-4 text-sm text-yellow-400 text-shadow">Please follow the setup instructions to provide a valid Gemini API key.</p>
        </div>
      );
    }
    
    switch (gameState) {
      case GameState.LOADING:
        return <AssetGeneratorScreen progressLog={progressLog} hasError={hasError} />;
      case GameState.READY_TO_PLAY:
        return assets && <StartScreen onStart={startGame} backgroundUrl={assets.background} onRegenerate={regenerateAssets}/>;
      case GameState.PLAYING:
      case GameState.ANSWERED:
        return assets && questions && (
          <GameScreen
            assets={assets}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            answerResult={answerResult}
            onNextQuestion={handleNextQuestion}
            isAnswered={gameState === GameState.ANSWERED}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            score={score}
          />
        );
      case GameState.GAME_OVER:
        return assets && questions && <GameOverScreen score={score} totalQuestions={questions.length} onRestart={startGame} backgroundUrl={assets.background}/>;
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen bg-gray-800 text-white overflow-hidden select-none">
      {renderContent()}
    </main>
  );
};

export default App;
