import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanGestureHandler,
  State,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameCanvas from '../components/GameCanvas';
import GameHUD from '../components/GameHUD';
import { useGame } from '../context/GameContext';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const { vibrationEnabled, setHighScore } = useGame();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    isPlaying: false,
    isPaused: false,
  });

  const [paddlePosition, setPaddlePosition] = useState(width / 2);
  const gameCanvasRef = useRef<any>(null);

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    gameCanvasRef.current?.startGame();
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    gameCanvasRef.current?.pauseGame();
  };

  const handleGameOver = () => {
    setHighScore(gameState.score);
    onGameOver(gameState.score);
  };

  const handleScoreUpdate = (newScore: number) => {
    setGameState(prev => ({ ...prev, score: newScore }));
  };

  const handleLivesUpdate = (newLives: number) => {
    setGameState(prev => ({ ...prev, lives: newLives }));
    if (newLives <= 0) {
      handleGameOver();
    }
  };

  const handleLevelUpdate = (newLevel: number) => {
    setGameState(prev => ({ ...prev, level: newLevel }));
  };

  const handlePaddleMove = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const newX = Math.max(50, Math.min(width - 50, event.nativeEvent.absoluteX));
      setPaddlePosition(newX);
      gameCanvasRef.current?.updatePaddlePosition(newX);
    }
  };

  const handleBrickHit = () => {
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleBallLost = () => {
    if (vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameHUD
        gameState={gameState}
        onStartGame={startGame}
        onPauseGame={pauseGame}
      />
      
      <PanGestureHandler onGestureEvent={handlePaddleMove}>
        <View style={styles.gameArea}>
          <GameCanvas
            ref={gameCanvasRef}
            gameState={gameState}
            paddlePosition={paddlePosition}
            onScoreUpdate={handleScoreUpdate}
            onLivesUpdate={handleLivesUpdate}
            onLevelUpdate={handleLevelUpdate}
            onBrickHit={handleBrickHit}
            onBallLost={handleBallLost}
            onGameOver={handleGameOver}
          />
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
});

export default GameScreen;