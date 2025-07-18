import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { formatScore } from '../utils/gameLogic';

const { width } = Dimensions.get('window');

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
  onMenu,
}) => {
  const { highScore } = useGame();
  const isNewHighScore = score > highScore;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
          {isNewHighScore && (
            <View style={styles.newRecordBadge}>
              <Ionicons name="trophy" size={20} color="#f27121" />
              <Text style={styles.newRecordText}>NEW RECORD!</Text>
            </View>
          )}
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>FINAL SCORE</Text>
            <Text style={styles.scoreValue}>{formatScore(score)}</Text>
          </View>

          <View style={styles.highScoreCard}>
            <Text style={styles.highScoreLabel}>HIGH SCORE</Text>
            <Text style={styles.highScoreValue}>
              {formatScore(Math.max(score, highScore))}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="target" size={24} color="#e94560" />
            <Text style={styles.statLabel}>Accuracy</Text>
            <Text style={styles.statValue}>85%</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flash" size={24} color="#f27121" />
            <Text style={styles.statLabel}>Best Combo</Text>
            <Text style={styles.statValue}>x12</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="layers" size={24} color="#4fc3f7" />
            <Text style={styles.statLabel}>Levels</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onRestart}>
            <LinearGradient
              colors={['#e94560', '#f27121']}
              style={styles.primaryButtonGradient}
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.primaryButtonText}>PLAY AGAIN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onMenu}>
            <Ionicons name="home" size={18} color="#ffffff" />
            <Text style={styles.secondaryButtonText}>MAIN MENU</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social" size={18} color="#4fc3f7" />
            <Text style={styles.shareButtonText}>SHARE SCORE</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e94560',
    letterSpacing: 3,
    marginBottom: 10,
  },
  newRecordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 113, 33, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f27121',
  },
  newRecordText: {
    color: '#f27121',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
    letterSpacing: 1,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreCard: {
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#e94560',
    marginTop: 5,
  },
  highScoreCard: {
    backgroundColor: 'rgba(242, 113, 33, 0.1)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242, 113, 33, 0.3)',
  },
  highScoreLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    letterSpacing: 1,
  },
  highScoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f27121',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.8,
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 80,
  },
  statLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.7,
    marginTop: 5,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 2,
  },
  buttonContainer: {
    width: width * 0.8,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
    letterSpacing: 1,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  shareButtonText: {
    fontSize: 14,
    color: '#4fc3f7',
    marginLeft: 8,
    letterSpacing: 1,
  },
});

export default GameOverScreen;