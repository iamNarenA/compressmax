import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Clock, Star, Filter, Search, Trophy, Play } from 'lucide-react';
import { Game, Subject, Grade, Difficulty } from '../types';
import { useGame } from '../context/GameContext';

const GamesPage: React.FC = () => {
  const { state } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Mock games data
  const games: Game[] = [
    {
      id: '1',
      title: 'Math Monster Mayhem',
      description: 'Defeat math monsters by solving addition and subtraction problems!',
      subject: 'math',
      grade: '2nd',
      difficulty: 'easy',
      type: 'educational',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Use your math skills to defeat the monsters!',
      estimatedTime: 10,
      points: 100,
      skills: ['Addition', 'Subtraction', 'Quick Thinking'],
      highScore: 850,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Word Adventure Quest',
      description: 'Embark on a reading adventure and discover new words!',
      subject: 'reading',
      grade: '3rd',
      difficulty: 'medium',
      type: 'educational',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Read the story and answer questions to progress!',
      estimatedTime: 15,
      points: 150,
      skills: ['Reading Comprehension', 'Vocabulary', 'Story Analysis'],
      highScore: 1200,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Science Lab Explorer',
      description: 'Conduct virtual experiments and learn about science!',
      subject: 'science',
      grade: '4th',
      difficulty: 'medium',
      type: 'educational',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Follow the scientific method to complete experiments!',
      estimatedTime: 20,
      points: 200,
      skills: ['Scientific Method', 'Observation', 'Analysis'],
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Memory Palace',
      description: 'Test and improve your memory with fun challenges!',
      subject: 'math',
      grade: '1st',
      difficulty: 'easy',
      type: 'memory',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Remember the sequence and repeat it back!',
      estimatedTime: 8,
      points: 75,
      skills: ['Memory', 'Pattern Recognition', 'Concentration'],
      highScore: 650,
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Art Studio Creator',
      description: 'Create beautiful digital artwork with guided tutorials!',
      subject: 'art',
      grade: 'k',
      difficulty: 'easy',
      type: 'educational',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Follow the steps to create amazing art!',
      estimatedTime: 12,
      points: 80,
      skills: ['Creativity', 'Color Theory', 'Digital Art'],
      createdAt: new Date()
    },
    {
      id: '6',
      title: 'Geography Explorer',
      description: 'Travel the world and learn about different countries!',
      subject: 'social-studies',
      grade: '5th',
      difficulty: 'hard',
      type: 'quiz',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      instructions: 'Answer questions about world geography!',
      estimatedTime: 18,
      points: 180,
      skills: ['Geography', 'Cultural Awareness', 'Map Reading'],
      highScore: 1500,
      createdAt: new Date()
    }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects', icon: '🎮' },
    { value: 'math', label: 'Mathematics', icon: '🔢' },
    { value: 'reading', label: 'Reading', icon: '📖' },
    { value: 'science', label: 'Science', icon: '🔬' },
    { value: 'art', label: 'Art', icon: '🎨' },
    { value: 'social-studies', label: 'Social Studies', icon: '🌍' },
    { value: 'music', label: 'Music', icon: '🎵' }
  ];

  const grades = [
    { value: 'all', label: 'All Grades' },
    { value: 'pre-k', label: 'Pre-K' },
    { value: 'k', label: 'Kindergarten' },
    { value: '1st', label: '1st Grade' },
    { value: '2nd', label: '2nd Grade' },
    { value: '3rd', label: '3rd Grade' },
    { value: '4th', label: '4th Grade' },
    { value: '5th', label: '5th Grade' },
    { value: '6th', label: '6th Grade' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'hard', label: 'Hard', color: 'text-red-600' }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || game.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'all' || game.grade === selectedGrade;
    const matchesDifficulty = selectedDifficulty === 'all' || game.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesGrade && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSubjectColor = (subject: Subject) => {
    switch (subject) {
      case 'math': return 'bg-blue-100 text-blue-800';
      case 'reading': return 'bg-green-100 text-green-800';
      case 'science': return 'bg-purple-100 text-purple-800';
      case 'art': return 'bg-pink-100 text-pink-800';
      case 'social-studies': return 'bg-yellow-100 text-yellow-800';
      case 'music': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Educational Games
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn while you play! Our educational games make learning fun and engaging. 
            Challenge yourself and compete for high scores!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Games</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as Subject | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject.value} value={subject.value}>
                  {subject.icon} {subject.label}
                </option>
              ))}
            </select>

            {/* Grade Filter */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value as Grade | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {grades.map(grade => (
                <option key={grade.value} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(game.subject)}`}>
                    {game.subject}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{game.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{game.points} pts</span>
                  </div>
                </div>

                {game.highScore && (
                  <div className="flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 mb-4">
                    <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      High Score: {game.highScore}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {game.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{game.skills.length - 2} more
                    </span>
                  )}
                </div>

                <Link
                  to={`/games/${game.id}`}
                  className="w-full btn-secondary text-center block"
                >
                  Play Game
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;