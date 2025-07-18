import { Ball, Paddle, Brick } from '../types';

export const checkBallPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
  return (
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height &&
    ball.x >= paddle.x - paddle.width / 2 &&
    ball.x <= paddle.x + paddle.width / 2
  );
};

export const checkBallBrickCollision = (ball: Ball, brick: Brick): boolean => {
  if (brick.isDestroyed) return false;
  
  return (
    ball.x + ball.radius >= brick.x &&
    ball.x - ball.radius <= brick.x + brick.width &&
    ball.y + ball.radius >= brick.y &&
    ball.y - ball.radius <= brick.y + brick.height
  );
};

export const generateBricks = (level: number, screenWidth: number): Brick[] => {
  const bricks: Brick[] = [];
  const brickWidth = screenWidth / 8 - 4;
  const brickHeight = 20;
  const colors = ['#e94560', '#f27121', '#4fc3f7', '#66bb6a', '#ab47bc'];
  
  const rows = Math.min(5 + Math.floor(level / 2), 8);
  const cols = 8;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const maxHits = Math.min(row + 1, 3);
      bricks.push({
        id: `${row}-${col}`,
        x: col * (brickWidth + 4) + 2,
        y: 100 + row * (brickHeight + 4),
        width: brickWidth,
        height: brickHeight,
        color: colors[row % colors.length],
        hits: 0,
        maxHits,
        points: maxHits * 10 * level,
        isDestroyed: false,
      });
    }
  }
  
  return bricks;
};

export const calculateBallSpeed = (level: number, difficulty: string): number => {
  const baseSpeed = 3;
  const difficultyMultiplier = {
    easy: 0.8,
    medium: 1.0,
    hard: 1.3,
  }[difficulty] || 1.0;
  
  return baseSpeed * difficultyMultiplier * (1 + level * 0.1);
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};