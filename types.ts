export enum GameState {
  LOADING,
  READY_TO_PLAY,
  PLAYING,
  ANSWERED,
  GAME_OVER,
}

export interface AssetPrompt {
  key: keyof GameAssets;
  name: string;
  prompt: string;
  negativePrompt: string;
}

export interface GameAssets {
  background: string;
  doorClosed: string;
  doorOpen1: string;
  doorOpen2: string;
  brickBlock1: string;
  brickBlock2: string;
  correctIcon: string;
  wrongIcon: string;
  player: string;
}

export interface Question {
  statement: string;
  isTrue: boolean;
}

export interface AnswerResult {
  choice: boolean;
  correct: boolean;
}

export enum DoorState {
    CLOSED,
    OPENING_1,
    OPENING_2,
    BLOCKED_1,
    BLOCKED_2,
}
