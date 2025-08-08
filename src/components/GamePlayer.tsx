import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowLeft, Play, Pause, RotateCcw, Star, Trophy, Clock } from 'lucide-react';
import { useGame } from '../context/GameContext';

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'completed'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Mock game data - Math Monster Mayhem
  const game = {
    id: '1',
    title: 'Math Monster Mayhem',
    description: 'Defeat math monsters by solving addition and subtraction problems!',
    subject: 'math',
    grade: '2nd',
    difficulty: 'easy',
    instructions: 'Solve the math problems to defeat the monsters. You have 60 seconds!',
    points: 100,
    questions: [
      { question: '5 + 3 = ?', options: ['6', '7', '8', '9'], correct: '8', monster: '👹' },
      { question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correct: '6', monster: '👺' },
      { question: '7 + 2 = ?', options: ['8', '9', '10', '11'], correct: '9', monster: '🧌' },
      { question: '12 - 5 = ?', options: ['6', '7', '8', '9'], correct: '7', monster: '👹' },
      { question: '4 + 6 = ?', options: ['9', '10', '11', '12'], correct: '10', monster: '👺' },
      { question: '15 - 8 = ?', options: ['6', '7', '8', '9'], correct: '7', monster: '🧌' },
      { question: '9 + 3 = ?', options: ['11', '12', '13', '14'], correct: '12', monster: '👹' },
      { question: '14 - 6 = ?', options: ['7', '8', '9', '10'], correct: '8', monster: '👺' },
    ]
  };

  const currentQuestionData = game.questions[currentQuestion];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      const isCorrect = answer === currentQuestionData.correct;
      
      if (isCorrect) {
        setScore(prev => prev + 100);
        setCorrectAnswers(prev => prev + 1);
      }
      
      if (currentQuestion < game.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Game completed
        setGameState('completed');
        setShowConfetti(true);
        
        // Update game state
        dispatch({ type: 'COMPLETE_GAME', payload: game.id });
        dispatch({ type: 'ADD_POINTS', payload: score + (isCorrect ? 100 : 0) });
        
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 1000);
  };

  const getAccuracy = () => {
    const totalAnswered = currentQuestion + (selectedAnswer ? 1 : 0);
    return totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
              <button
                onClick={() => navigate('/games')}
                className="flex items-center text-white/80 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Games
              </button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{game.title}</h1>
                  <p className="text-white/90 text-lg">{game.description}</p>
                </div>
                <div className="text-6xl">{currentQuestionData?.monster}</div>
              </div>
            </div>

            {/* Game Info */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">60</div>
                  <div className="text-blue-600">Seconds</div>
                </div>
                
                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">{game.points}</div>
                  <div className="text-green-600">Max Points</div>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-6 text-center">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">{game.questions.length}</div>
                  <div className="text-purple-600">Questions</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-yellow-800 mb-2">How to Play:</h3>
                <p className="text-yellow-700">{game.instructions}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={startGame}
                  className="btn-primary text-xl px-12 py-4 flex items-center justify-center mx-auto"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Game
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        {showConfetti && <Confetti />}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Game Complete! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              You defeated all the math monsters!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-800">{score}</div>
                <div className="text-yellow-700">Final Score</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">{correctAnswers}</div>
                <div className="text-green-700">Correct Answers</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">{getAccuracy()}%</div>
                <div className="text-blue-700">Accuracy</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="btn-primary flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </button>
              
              <button
                onClick={() => navigate('/games')}
                className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
              >
                More Games
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={gameState === 'playing' ? pauseGame : resumeGame}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {gameState === 'playing' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {gameState === 'playing' ? 'Pause' : 'Resume'}
              </button>
              
              <button
                onClick={resetGame}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
                  {timeLeft}s
                </div>
                <div className="text-sm text-gray-600">Time Left</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / game.questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="progress-bar h-3 rounded-full"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Question {currentQuestion + 1} of {game.questions.length}</span>
            <span>{correctAnswers} correct</span>
          </div>
        </motion.div>

        {/* Game Content */}
        {gameState === 'paused' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <Pause className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Paused</h2>
            <p className="text-gray-600 mb-8">Take a break! Click resume when you're ready to continue.</p>
            <button
              onClick={resumeGame}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Resume Game
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{currentQuestionData.monster}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Defeat the Monster!
              </h2>
              <div className="text-4xl font-bold text-blue-600 bg-blue-50 rounded-2xl p-6 inline-block">
                {currentQuestionData.question}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 rounded-2xl border-2 font-bold text-2xl transition-all duration-200 ${
                    selectedAnswer === option
                      ? selectedAnswer === currentQuestionData.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : selectedAnswer !== null && option === currentQuestionData.correct
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamePlayer;