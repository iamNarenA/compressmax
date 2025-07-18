import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import { GameState } from '../screens/GameScreen';

const { width, height } = Dimensions.get('window');

interface GameCanvasProps {
  gameState: GameState;
  paddlePosition: number;
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onLevelUpdate: (level: number) => void;
  onBrickHit: () => void;
  onBallLost: () => void;
  onGameOver: () => void;
}

interface GameCanvasRef {
  startGame: () => void;
  pauseGame: () => void;
  updatePaddlePosition: (x: number) => void;
}

// Game objects
interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hits: number;
  maxHits: number;
  points: number;
}

const GameCanvas = forwardRef<GameCanvasRef, GameCanvasProps>(
  (
    {
      gameState,
      paddlePosition,
      onScoreUpdate,
      onLivesUpdate,
      onLevelUpdate,
      onBrickHit,
      onBallLost,
      onGameOver,
    },
    ref
  ) => {
    const gameObjectsRef = useRef({
      ball: {
        x: width / 2,
        y: height * 0.7,
        vx: 3,
        vy: -3,
        radius: 8,
      } as Ball,
      paddle: {
        x: width / 2,
        y: height * 0.85,
        width: 80,
        height: 12,
      } as Paddle,
      bricks: [] as Brick[],
      score: 0,
      lives: 3,
      level: 1,
      isPlaying: false,
      isPaused: false,
    });

    const initializeBricks = (level: number) => {
      const bricks: Brick[] = [];
      const brickWidth = width / 8 - 4;
      const brickHeight = 20;
      const colors = ['#e94560', '#f27121', '#4fc3f7', '#66bb6a', '#ab47bc'];
      
      const rows = Math.min(5 + Math.floor(level / 2), 8);
      const cols = 8;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const maxHits = Math.min(row + 1, 3);
          bricks.push({
            x: col * (brickWidth + 4) + 2,
            y: 100 + row * (brickHeight + 4),
            width: brickWidth,
            height: brickHeight,
            color: colors[row % colors.length],
            hits: 0,
            maxHits,
            points: maxHits * 10,
          });
        }
      }
      
      gameObjectsRef.current.bricks = bricks;
    };

    const resetBall = () => {
      gameObjectsRef.current.ball = {
        x: width / 2,
        y: height * 0.7,
        vx: (Math.random() > 0.5 ? 1 : -1) * (3 + gameObjectsRef.current.level * 0.5),
        vy: -Math.abs(3 + gameObjectsRef.current.level * 0.5),
        radius: 8,
      };
    };

    const checkCollisions = () => {
      const { ball, paddle, bricks } = gameObjectsRef.current;

      // Ball-paddle collision
      if (
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height &&
        ball.x >= paddle.x - paddle.width / 2 &&
        ball.x <= paddle.x + paddle.width / 2
      ) {
        ball.vy = -Math.abs(ball.vy);
        // Add spin based on where ball hits paddle
        const hitPos = (ball.x - paddle.x) / (paddle.width / 2);
        ball.vx += hitPos * 2;
      }

      // Ball-brick collisions
      for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        if (
          ball.x + ball.radius >= brick.x &&
          ball.x - ball.radius <= brick.x + brick.width &&
          ball.y + ball.radius >= brick.y &&
          ball.y - ball.radius <= brick.y + brick.height
        ) {
          ball.vy = -ball.vy;
          brick.hits++;
          
          if (brick.hits >= brick.maxHits) {
            gameObjectsRef.current.score += brick.points;
            onScoreUpdate(gameObjectsRef.current.score);
            bricks.splice(i, 1);
          }
          
          onBrickHit();
          break;
        }
      }

      // Wall collisions
      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= width) {
        ball.vx = -ball.vx;
      }
      if (ball.y - ball.radius <= 0) {
        ball.vy = -ball.vy;
      }

      // Ball lost
      if (ball.y > height) {
        gameObjectsRef.current.lives--;
        onLivesUpdate(gameObjectsRef.current.lives);
        onBallLost();
        
        if (gameObjectsRef.current.lives <= 0) {
          onGameOver();
        } else {
          resetBall();
        }
      }

      // Level complete
      if (bricks.length === 0) {
        gameObjectsRef.current.level++;
        onLevelUpdate(gameObjectsRef.current.level);
        initializeBricks(gameObjectsRef.current.level);
        resetBall();
      }
    };

    const updateGame = () => {
      if (!gameObjectsRef.current.isPlaying || gameObjectsRef.current.isPaused) {
        return;
      }

      const { ball } = gameObjectsRef.current;
      
      // Update ball position
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Check collisions
      checkCollisions();
    };

    useImperativeHandle(ref, () => ({
      startGame: () => {
        gameObjectsRef.current.isPlaying = true;
        gameObjectsRef.current.isPaused = false;
        if (gameObjectsRef.current.bricks.length === 0) {
          initializeBricks(gameObjectsRef.current.level);
        }
      },
      pauseGame: () => {
        gameObjectsRef.current.isPaused = !gameObjectsRef.current.isPaused;
      },
      updatePaddlePosition: (x: number) => {
        gameObjectsRef.current.paddle.x = x;
      },
    }));

    // Initialize game
    useEffect(() => {
      initializeBricks(1);
    }, []);

    // Game loop
    useEffect(() => {
      const gameLoop = setInterval(updateGame, 16); // ~60 FPS
      return () => clearInterval(gameLoop);
    }, []);

    // Simple 2D rendering using View components
    const renderGame = () => {
      const { ball, paddle, bricks } = gameObjectsRef.current;

      return (
        <View style={styles.gameArea}>
          {/* Ball */}
          <View
            style={[
              styles.ball,
              {
                left: ball.x - ball.radius,
                top: ball.y - ball.radius,
                width: ball.radius * 2,
                height: ball.radius * 2,
              },
            ]}
          />

          {/* Paddle */}
          <View
            style={[
              styles.paddle,
              {
                left: paddle.x - paddle.width / 2,
                top: paddle.y,
                width: paddle.width,
                height: paddle.height,
              },
            ]}
          />

          {/* Bricks */}
          {bricks.map((brick, index) => (
            <View
              key={index}
              style={[
                styles.brick,
                {
                  left: brick.x,
                  top: brick.y,
                  width: brick.width,
                  height: brick.height,
                  backgroundColor: brick.color,
                  opacity: 1 - (brick.hits / brick.maxHits) * 0.5,
                },
              ]}
            />
          ))}
        </View>
      );
    };

    return renderGame();
  }
);

const styles = StyleSheet.create({
  gameArea: {
    flex: 1,
    backgroundColor: '#0f0f23',
    position: 'relative',
  },
  ball: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  paddle: {
    position: 'absolute',
    backgroundColor: '#4fc3f7',
    borderRadius: 6,
    shadowColor: '#4fc3f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  brick: {
    position: 'absolute',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default GameCanvas;