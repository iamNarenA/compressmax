export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Brick {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hits: number;
  maxHits: number;
  points: number;
  isDestroyed: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PowerUp {
  id: string;
  type: 'bigPaddle' | 'slowBall' | 'extraLife' | 'multiball';
  x: number;
  y: number;
  active: boolean;
  duration?: number;
}