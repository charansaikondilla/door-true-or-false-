import { useState, useEffect, useCallback } from 'react';
import { GameAssets, Question } from '../types';
import { generateGameAssets, generateQuestions } from '../services/geminiService';

const CACHE_KEY = 'trueOrFalseGameAssets';

const useGameAssets = () => {
  const [assets, setAssets] = useState<GameAssets | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressLog, setProgressLog] = useState<string[]>(['Initializing...']);
  const [hasError, setHasError] = useState<boolean>(false);

  const logProgress = (message: string, isError: boolean = false) => {
    setProgressLog(prev => [...prev, message]);
    if (isError) setHasError(true);
  };

  const generateAndCacheAssets = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setProgressLog(['Starting fresh asset generation...']);

    try {
      let generatedAssets: GameAssets | null = null;
      let generatedQuestions: Question[] = [];

      const assetsPromise = generateGameAssets((msg, err) => logProgress(msg, err)).then(res => {
        generatedAssets = res;
      });

      const questionsPromise = generateQuestions((msg, err) => logProgress(msg, err)).then(res => {
        generatedQuestions = res;
      });

      await Promise.all([assetsPromise, questionsPromise]);

      if (generatedAssets && generatedQuestions.length > 0) {
        const cachedData = { assets: generatedAssets, questions: generatedQuestions, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
        setAssets(generatedAssets);
        setQuestions(generatedQuestions);
        logProgress('All assets ready! Starting game...');
      } else {
        throw new Error('Asset generation did not complete successfully.');
      }
    } catch (error) {
      console.error('Asset generation failed:', error);
      logProgress('A critical error occurred during asset generation.', true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      const cachedItem = localStorage.getItem(CACHE_KEY);
      if (cachedItem) {
        try {
          const { assets: cachedAssets, questions: cachedQuestions } = JSON.parse(cachedItem);
          logProgress('Found cached assets. Loading game...');
          setAssets(cachedAssets);
          setQuestions(cachedQuestions);
          setIsLoading(false);
          return;
        } catch (error) {
          logProgress('Cache corrupted. Clearing cache and regenerating.');
          localStorage.removeItem(CACHE_KEY);
        }
      }
      await generateAndCacheAssets();
    };

    loadAssets();
  }, [generateAndCacheAssets]);

  const regenerateAssets = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setAssets(null);
    setQuestions(null);
    generateAndCacheAssets();
  }, [generateAndCacheAssets]);

  return { assets, questions, isLoading, progressLog, hasError, regenerateAssets };
};

export default useGameAssets;
