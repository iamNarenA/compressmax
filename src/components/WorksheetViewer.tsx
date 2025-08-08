import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowLeft, ArrowRight, CheckCircle, Star, Clock, Download } from 'lucide-react';
import { useGame } from '../context/GameContext';

const WorksheetViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  // Mock worksheet data
  const worksheet = {
    id: '1',
    title: 'Addition Adventures',
    description: 'Learn basic addition with fun characters and colorful illustrations',
    subject: 'math',
    grade: '1st',
    difficulty: 'easy',
    estimatedTime: 15,
    points: 50,
    pages: [
      {
        id: '1',
        type: 'multiple-choice' as const,
        title: 'What is 2 + 3?',
        instruction: 'Choose the correct answer',
        content: {
          question: 'What is 2 + 3?',
          options: ['4', '5', '6', '7'],
          correctAnswer: '5'
        },
        points: 10
      },
      {
        id: '2',
        type: 'multiple-choice' as const,
        title: 'What is 4 + 1?',
        instruction: 'Choose the correct answer',
        content: {
          question: 'What is 4 + 1?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '5'
        },
        points: 10
      },
      {
        id: '3',
        type: 'fill-blank' as const,
        title: 'Complete the equation',
        instruction: 'Fill in the missing number',
        content: {
          question: '3 + ___ = 7',
          correctAnswer: '4'
        },
        points: 15
      },
      {
        id: '4',
        type: 'multiple-choice' as const,
        title: 'What is 6 + 2?',
        instruction: 'Choose the correct answer',
        content: {
          question: 'What is 6 + 2?',
          options: ['7', '8', '9', '10'],
          correctAnswer: '8'
        },
        points: 10
      },
      {
        id: '5',
        type: 'fill-blank' as const,
        title: 'Complete the equation',
        instruction: 'Fill in the missing number',
        content: {
          question: '5 + ___ = 9',
          correctAnswer: '4'
        },
        points: 15
      }
    ]
  };

  const currentPageData = worksheet.pages[currentPage];
  const totalPages = worksheet.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentPageData.id]: answer
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    worksheet.pages.forEach(page => {
      const userAnswer = answers[page.id];
      if (userAnswer === page.content.correctAnswer) {
        totalScore += page.points;
      }
    });
    return totalScore;
  };

  const handleNext = () => {
    if (isLastPage) {
      // Complete worksheet
      const finalScore = calculateScore();
      setScore(finalScore);
      setIsCompleted(true);
      setShowConfetti(true);
      
      // Update game state
      dispatch({ type: 'COMPLETE_WORKSHEET', payload: worksheet.id });
      dispatch({ type: 'ADD_POINTS', payload: finalScore });
      
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleDownloadCertificate = () => {
    // Mock certificate download
    alert('Certificate downloaded! 🎉');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        {showConfetti && <Confetti />}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Congratulations! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              You completed "{worksheet.title}" successfully!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-800">{score}</div>
                <div className="text-yellow-700">Points Earned</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  {Math.round((score / worksheet.pages.reduce((sum, page) => sum + page.points, 0)) * 100)}%
                </div>
                <div className="text-green-700">Accuracy</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">{worksheet.estimatedTime}</div>
                <div className="text-blue-700">Minutes</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadCertificate}
                className="btn-primary flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </button>
              
              <button
                onClick={() => navigate('/worksheets')}
                className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
              >
                More Worksheets
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/worksheets')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Worksheets
            </button>
            
            <div className="text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{worksheet.title}</h1>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="progress-bar h-3 rounded-full"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Progress: {Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>Up to {worksheet.points} points</span>
            </div>
          </div>
        </motion.div>

        {/* Worksheet Content */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="worksheet-page p-8 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentPageData.title}
            </h2>
            <p className="text-lg text-gray-600">
              {currentPageData.instruction}
            </p>
          </div>

          {/* Question Content */}
          <div className="max-w-2xl mx-auto">
            {currentPageData.type === 'multiple-choice' && (
              <div className="space-y-4">
                <div className="text-2xl font-bold text-center text-gray-800 mb-8 p-6 bg-blue-50 rounded-2xl">
                  {currentPageData.content.question}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {currentPageData.content.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`p-6 rounded-2xl border-2 font-semibold text-lg transition-all duration-200 ${
                        answers[currentPageData.id] === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentPageData.type === 'fill-blank' && (
              <div className="space-y-6">
                <div className="text-3xl font-bold text-center text-gray-800 mb-8 p-6 bg-green-50 rounded-2xl">
                  {currentPageData.content.question.split('___')[0]}
                  <input
                    type="text"
                    value={answers[currentPageData.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="mx-4 px-4 py-2 border-2 border-blue-300 rounded-lg text-center w-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="?"
                  />
                  {currentPageData.content.question.split('___')[1]}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between items-center"
        >
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentPageData.id]}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              !answers[currentPageData.id]
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isLastPage ? 'Complete' : 'Next'}
            {!isLastPage && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WorksheetViewer;