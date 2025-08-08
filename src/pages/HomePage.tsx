import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Star, Trophy, Target, Zap, Users, Shield } from 'lucide-react';
import { useGame } from '../context/GameContext';

const HomePage: React.FC = () => {
  const { state } = useGame();

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Worksheets',
      description: 'Engaging worksheets that adapt to your child\'s learning pace',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gamepad2,
      title: 'Educational Games',
      description: 'Fun games that make learning math, reading, and science exciting',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Skill Tracking',
      description: 'Monitor progress and celebrate achievements with detailed reports',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Rewards System',
      description: 'Earn points, badges, and unlock new content as you learn',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const subjects = [
    { name: 'Mathematics', icon: '🔢', color: 'bg-blue-100 text-blue-800', count: 45 },
    { name: 'Reading', icon: '📚', color: 'bg-green-100 text-green-800', count: 38 },
    { name: 'Science', icon: '🔬', color: 'bg-purple-100 text-purple-800', count: 32 },
    { name: 'Art & Creativity', icon: '🎨', color: 'bg-pink-100 text-pink-800', count: 28 },
    { name: 'Social Studies', icon: '🌍', color: 'bg-yellow-100 text-yellow-800', count: 25 },
    { name: 'Music', icon: '🎵', color: 'bg-indigo-100 text-indigo-800', count: 20 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Learning Made
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Fun & Easy!
                </span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Join thousands of kids on an amazing learning adventure with interactive 
                worksheets, educational games, and personalized progress tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/worksheets"
                  className="btn-primary text-center"
                >
                  Start Learning Now
                </Link>
                <Link
                  to="/games"
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-200 text-center"
                >
                  Play Games
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Kids learning"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg bounce-gentle">
                  🎉 Fun Learning!
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Back Section */}
      {state.user && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome back, {state.user.name}! {state.user.avatar}
                  </h2>
                  <p className="text-white/90 text-lg">
                    You're on a {state.streakDays}-day learning streak! Keep it up!
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
                      <Star className="w-8 h-8 text-yellow-300" />
                    </div>
                    <p className="font-bold text-2xl">{state.totalPoints}</p>
                    <p className="text-white/80 text-sm">Points</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
                      <Trophy className="w-8 h-8 text-yellow-300" />
                    </div>
                    <p className="font-bold text-2xl">{state.user.badges.length}</p>
                    <p className="text-white/80 text-sm">Badges</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Kids Love EduKids Pro
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines education with entertainment to create an engaging 
              learning experience that kids actually enjoy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore Different Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From math and reading to science and art, we have engaging content 
              for every subject your child loves.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover text-center"
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{subject.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${subject.color}`}>
                  {subject.count} activities
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Users className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Happy Students</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Worksheets</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white/80">Educational Games</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Safe & Secure</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of kids who are already having fun while learning. 
              Start your educational adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/worksheets"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Worksheets
              </Link>
              <Link
                to="/games"
                className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full border-2 border-white/30 hover:bg-white/30 transition-colors"
              >
                Play Games
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;