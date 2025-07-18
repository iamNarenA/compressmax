import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GameState } from '../screens/GameScreen';

const { width } = Dimensions.get('window');

interface GameHUDProps {
  gameState: GameState;
  onStartGame: () => void;
  onPauseGame: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({
  gameState,
  onStartGame,
  onPauseGame,
}) => {
  const renderLives = () => {
    const lives = [];
    for (let i = 0; i < gameState.lives; i++) {
      lives.push(
        <Ionicons
          key={i}
          name="heart"
          size={20}
          color="#e94560"
          style={styles.lifeIcon}
        />
      );
    }
    return lives;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{gameState.score.toLocaleString()}</Text>
        </View>

        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <Text style={styles.levelValue}>{gameState.level}</Text>
        </View>

        <TouchableOpacity
          style={styles.pauseButton}
          onPress={gameState.isPlaying ? onPauseGame : onStartGame}
        >
          <Ionicons
            name={gameState.isPlaying ? (gameState.isPaused ? 'play' : 'pause') : 'play'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.livesContainer}>
          <Text style={styles.livesLabel}>LIVES</Text>
          <View style={styles.livesIcons}>
            {renderLives()}
          </View>
        </View>

        {!gameState.isPlaying && (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Tap PLAY to start • Move paddle to control ball
            </Text>
          </View>
        )}

        {gameState.isPaused && (
          <View style={styles.pausedContainer}>
            <Text style={styles.pausedText}>PAUSED</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreContainer: {
    alignItems: 'flex-start',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.7,
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f27121',
    marginTop: 2,
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.7,
    letterSpacing: 1,
  },
  levelValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4fc3f7',
    marginTop: 2,
  },
  pauseButton: {
    backgroundColor: '#e94560',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  livesContainer: {
    alignItems: 'flex-start',
  },
  livesLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.7,
    letterSpacing: 1,
    marginBottom: 5,
  },
  livesIcons: {
    flexDirection: 'row',
  },
  lifeIcon: {
    marginRight: 5,
  },
  instructionContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
  },
  instructionText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.6,
    textAlign: 'center',
  },
  pausedContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
  },
  pausedText: {
    fontSize: 16,
    color: '#e94560',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default GameHUD;