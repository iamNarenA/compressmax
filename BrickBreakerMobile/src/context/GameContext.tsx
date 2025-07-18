import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameSettings } from '../types';

interface GameContextType {
  highScore: number;
  setHighScore: (score: number) => void;
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  totalGamesPlayed: number;
  incrementGamesPlayed: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [highScore, setHighScoreState] = useState(0);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    vibrationEnabled: true,
    difficulty: 'medium',
  });

  const setHighScore = (score: number) => {
    if (score > highScore) {
      setHighScoreState(score);
      // Here you could add AsyncStorage to persist the high score
    }
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    // Here you could add AsyncStorage to persist settings
  };

  const incrementGamesPlayed = () => {
    setTotalGamesPlayed(prev => prev + 1);
  };

  return (
    <GameContext.Provider
      value={{
        highScore,
        setHighScore,
        settings,
        updateSettings,
        totalGamesPlayed,
        incrementGamesPlayed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};