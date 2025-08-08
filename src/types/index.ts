export interface User {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  points: number;
  badges: Badge[];
  completedWorksheets: string[];
  completedGames: string[];
  streakDays: number;
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: Grade;
  difficulty: Difficulty;
  type: WorksheetType;
  thumbnail: string;
  pages: WorksheetPage[];
  estimatedTime: number;
  points: number;
  skills: string[];
  createdAt: Date;
}

export interface WorksheetPage {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'drawing' | 'matching' | 'sorting';
  title: string;
  instruction: string;
  content: any;
  correctAnswer?: any;
  points: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  grade: Grade;
  difficulty: Difficulty;
  type: GameType;
  thumbnail: string;
  instructions: string;
  estimatedTime: number;
  points: number;
  skills: string[];
  highScore?: number;
  createdAt: Date;
}

export interface GameSession {
  id: string;
  gameId: string;
  userId: string;
  score: number;
  timeSpent: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export type Subject = 'math' | 'reading' | 'science' | 'social-studies' | 'art' | 'music';
export type Grade = 'pre-k' | 'k' | '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type WorksheetType = 'practice' | 'assessment' | 'review' | 'challenge';
export type GameType = 'puzzle' | 'quiz' | 'memory' | 'strategy' | 'action' | 'educational';