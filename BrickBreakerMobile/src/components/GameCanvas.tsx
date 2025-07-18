import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GameState, Ball, Paddle, Brick } from '../types';
import { 
  generateBricks, 
  calculateBallSpeed, 
  checkBallPaddleCollision, 
  checkBallBrickCollision 
} from '../utils/gameLogic';

const { width, height } = Dimensions.get('window');

interface GameCanvasProps {
  gameState: GameState;
  paddlePosition: number;
  difficulty: string;
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

const GameCanvas = forwardRef<GameCanvasRef, GameCanvasProps>(
  (
    {
      gameState,
      paddlePosition,
      difficulty,
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
        vx: 0,
        vy: 0,
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
      gameObjectsRef.current.bricks = generateBricks(level, width);
    };

    const resetBall = () => {
      const speed = calculateBallSpeed(gameObjectsRef.current.level, difficulty);
      gameObjectsRef.current.ball = {
        x: width / 2,
        y: height * 0.7,
        vx: (Math.random() > 0.5 ? 1 : -1) * speed,
        vy: -Math.abs(speed),
        radius: 8,
      };
    };

    const checkCollisions = () => {
      const { ball, paddle, bricks } = gameObjectsRef.current;

      // Ball-paddle collision
      if (checkBallPaddleCollision(ball, paddle)) {
        ball.vy = -Math.abs(ball.vy);
        // Add spin based on where ball hits paddle
        const hitPos = (ball.x - paddle.x) / (paddle.width / 2);
        ball.vx += hitPos * 1.5;
        // Limit ball speed
        const maxSpeed = 8;
        if (Math.abs(ball.vx) > maxSpeed) {
          ball.vx = Math.sign(ball.vx) * maxSpeed;
        }
      }

      // Ball-brick collisions
      for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        if (checkBallBrickCollision(ball, brick)) {
          ball.vy = -ball.vy;
          brick.hits++;
          
          if (brick.hits >= brick.maxHits) {
            brick.isDestroyed = true;
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
        if (gameObjectsRef.current.ball.vx === 0 && gameObjectsRef.current.ball.vy === 0) {
          resetBall();
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

    // Update paddle position
    useEffect(() => {
      gameObjectsRef.current.paddle.x = paddlePosition;
    }, [paddlePosition]);

    // Render game objects
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
          {bricks.map((brick) => (
            <View
              key={brick.id}
              style={[
                styles.brick,
                {
                  left: brick.x,
                  top: brick.y,
                  width: brick.width,
                  height: brick.height,
                  backgroundColor: brick.color,
                  opacity: Math.max(0.3, 1 - (brick.hits / brick.maxHits) * 0.7),
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default GameCanvas;