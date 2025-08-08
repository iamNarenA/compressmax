import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Filter, Search, CheckCircle } from 'lucide-react';
import { Worksheet, Subject, Grade, Difficulty } from '../types';
import { useGame } from '../context/GameContext';

const WorksheetsPage: React.FC = () => {
  const { state } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Mock worksheets data
  const worksheets: Worksheet[] = [
    {
      id: '1',
      title: 'Addition Adventures',
      description: 'Learn basic addition with fun characters and colorful illustrations',
      subject: 'math',
      grade: '1st',
      difficulty: 'easy',
      type: 'practice',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 15,
      points: 50,
      skills: ['Addition', 'Number Recognition', 'Problem Solving'],
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Reading Comprehension: Animals',
      description: 'Read short stories about animals and answer questions',
      subject: 'reading',
      grade: '2nd',
      difficulty: 'medium',
      type: 'assessment',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 20,
      points: 75,
      skills: ['Reading Comprehension', 'Vocabulary', 'Critical Thinking'],
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Science Experiments',
      description: 'Simple science experiments you can do at home',
      subject: 'science',
      grade: '3rd',
      difficulty: 'medium',
      type: 'practice',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 30,
      points: 100,
      skills: ['Scientific Method', 'Observation', 'Hypothesis'],
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Subtraction Safari',
      description: 'Go on a safari adventure while learning subtraction',
      subject: 'math',
      grade: '2nd',
      difficulty: 'easy',
      type: 'practice',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 18,
      points: 60,
      skills: ['Subtraction', 'Number Recognition', 'Problem Solving'],
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Creative Writing Workshop',
      description: 'Express your creativity through guided writing exercises',
      subject: 'reading',
      grade: '4th',
      difficulty: 'hard',
      type: 'challenge',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 25,
      points: 120,
      skills: ['Creative Writing', 'Grammar', 'Storytelling'],
      createdAt: new Date()
    },
    {
      id: '6',
      title: 'Art & Colors',
      description: 'Learn about colors, shapes, and artistic techniques',
      subject: 'art',
      grade: 'k',
      difficulty: 'easy',
      type: 'practice',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      pages: [],
      estimatedTime: 12,
      points: 40,
      skills: ['Color Recognition', 'Creativity', 'Fine Motor Skills'],
      createdAt: new Date()
    }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects', icon: '📚' },
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

  const filteredWorksheets = worksheets.filter(worksheet => {
    const matchesSearch = worksheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worksheet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || worksheet.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'all' || worksheet.grade === selectedGrade;
    const matchesDifficulty = selectedDifficulty === 'all' || worksheet.difficulty === selectedDifficulty;
    
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
            Interactive Worksheets
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover engaging worksheets designed to make learning fun and effective. 
            Track your progress and earn rewards as you complete each activity!
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
            <h3 className="text-lg font-semibold text-gray-800">Filter Worksheets</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search worksheets..."
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
            Showing {filteredWorksheets.length} worksheet{filteredWorksheets.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Worksheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorksheets.map((worksheet, index) => (
            <motion.div
              key={worksheet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="relative">
                <img
                  src={worksheet.thumbnail}
                  alt={worksheet.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(worksheet.subject)}`}>
                    {worksheet.subject}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(worksheet.difficulty)}`}>
                    {worksheet.difficulty}
                  </span>
                </div>
                {state.completedWorksheets.includes(worksheet.id) && (
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{worksheet.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{worksheet.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{worksheet.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{worksheet.points} pts</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {worksheet.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {worksheet.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{worksheet.skills.length - 2} more
                    </span>
                  )}
                </div>

                <Link
                  to={`/worksheets/${worksheet.id}`}
                  className="w-full btn-secondary text-center block"
                >
                  {state.completedWorksheets.includes(worksheet.id) ? 'Review' : 'Start Worksheet'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredWorksheets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No worksheets found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WorksheetsPage;