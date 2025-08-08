import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, GameSession, Worksheet, Game } from '../types';

interface GameState {
  user: User | null;
  currentSession: GameSession | null;
  completedWorksheets: string[];
  completedGames: string[];
  totalPoints: number;
  streakDays: number;
  isLoading: boolean;
}

type GameAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'START_GAME_SESSION'; payload: GameSession }
  | { type: 'END_GAME_SESSION'; payload: { score: number; timeSpent: number } }
  | { type: 'COMPLETE_WORKSHEET'; payload: string }
  | { type: 'COMPLETE_GAME'; payload: string }
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'UPDATE_STREAK'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: GameState = {
  user: {
    id: '1',
    name: 'Alex',
    age: 8,
    grade: '2nd',
    avatar: '👦',
    points: 1250,
    badges: [
      {
        id: '1',
        name: 'Math Wizard',
        description: 'Completed 10 math worksheets',
        icon: '🧙‍♂️',
        color: 'blue',
        earnedAt: new Date()
      },
      {
        id: '2',
        name: 'Reading Star',
        description: 'Read 5 stories',
        icon: '⭐',
        color: 'yellow',
        earnedAt: new Date()
      }
    ],
    completedWorksheets: ['1', '2', '3'],
    completedGames: ['1', '2'],
    streakDays: 5,
    lastActive: new Date()
  },
  currentSession: null,
  completedWorksheets: ['1', '2', '3'],
  completedGames: ['1', '2'],
  totalPoints: 1250,
  streakDays: 5,
  isLoading: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'START_GAME_SESSION':
      return { ...state, currentSession: action.payload };
    case 'END_GAME_SESSION':
      return {
        ...state,
        currentSession: null,
        totalPoints: state.totalPoints + action.payload.score,
      };
    case 'COMPLETE_WORKSHEET':
      return {
        ...state,
        completedWorksheets: [...state.completedWorksheets, action.payload],
      };
    case 'COMPLETE_GAME':
      return {
        ...state,
        completedGames: [...state.completedGames, action.payload],
      };
    case 'ADD_POINTS':
      return {
        ...state,
        totalPoints: state.totalPoints + action.payload,
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        streakDays: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}