import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import GameScreen from './src/screens/GameScreen';
import MenuScreen from './src/screens/MenuScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import { GameProvider } from './src/context/GameContext';

export type Screen = 'menu' | 'game' | 'gameOver';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [finalScore, setFinalScore] = useState(0);

  const navigateToScreen = (screen: Screen, score?: number) => {
    if (screen === 'gameOver' && score !== undefined) {
      setFinalScore(score);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MenuScreen onStartGame={() => navigateToScreen('game')} />;
      case 'game':
        return <GameScreen onGameOver={(score) => navigateToScreen('gameOver', score)} />;
      case 'gameOver':
        return (
          <GameOverScreen
            score={finalScore}
            onRestart={() => navigateToScreen('game')}
            onMenu={() => navigateToScreen('menu')}
          />
        );
      default:
        return <MenuScreen onStartGame={() => navigateToScreen('game')} />;
    }
  };

  return (
    <GameProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        {renderScreen()}
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});