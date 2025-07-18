import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  highScore: number;
  setHighScore: (score: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (enabled: boolean) => void;
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
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const updateHighScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <GameContext.Provider
      value={{
        highScore,
        setHighScore: updateHighScore,
        soundEnabled,
        setSoundEnabled,
        vibrationEnabled,
        setVibrationEnabled,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};