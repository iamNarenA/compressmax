import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';

const { width, height } = Dimensions.get('window');

interface MenuScreenProps {
  onStartGame: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  const { highScore } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>BRICK</Text>
          <Text style={styles.subtitle}>BREAKER</Text>
          <Text style={styles.version}>PRO</Text>
        </View>

        <View style={styles.gameIcon}>
          <Ionicons name="game-controller" size={80} color="#e94560" />
        </View>

        <View style={styles.stats}>
          <Text style={styles.highScoreLabel}>HIGH SCORE</Text>
          <Text style={styles.highScoreValue}>{highScore.toLocaleString()}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.playButton} onPress={onStartGame}>
            <LinearGradient
              colors={['#e94560', '#f27121']}
              style={styles.playButtonGradient}
            >
              <Ionicons name="play" size={24} color="white" />
              <Text style={styles.playButtonText}>PLAY</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>SETTINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>LEADERBOARD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Tap to break all bricks!</Text>
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
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e94560',
    letterSpacing: 4,
    marginTop: -10,
  },
  version: {
    fontSize: 16,
    color: '#f27121',
    letterSpacing: 2,
    marginTop: 5,
  },
  gameIcon: {
    marginVertical: 20,
  },
  stats: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
  highScoreLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    letterSpacing: 1,
  },
  highScoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f27121',
    marginTop: 5,
  },
  buttonContainer: {
    width: width * 0.8,
    alignItems: 'center',
  },
  playButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    letterSpacing: 2,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.6,
  },
});

export default MenuScreen;