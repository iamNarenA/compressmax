import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Calendar, BookOpen, Gamepad2, Award, Target, TrendingUp } from 'lucide-react';
import { useGame } from '../context/GameContext';

const ProfilePage: React.FC = () => {
  const { state } = useGame();

  if (!state.user) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      icon: BookOpen,
      label: 'Worksheets Completed',
      value: state.completedWorksheets.length,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gamepad2,
      label: 'Games Played',
      value: state.completedGames.length,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Star,
      label: 'Total Points',
      value: state.totalPoints,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Trophy,
      label: 'Badges Earned',
      value: state.user.badges.length,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const recentActivity = [
    { type: 'worksheet', title: 'Addition Adventures', points: 50, date: '2 hours ago' },
    { type: 'game', title: 'Math Monster Mayhem', points: 100, date: '1 day ago' },
    { type: 'badge', title: 'Earned "Math Wizard" badge', points: 0, date: '2 days ago' },
    { type: 'worksheet', title: 'Reading Comprehension', points: 75, date: '3 days ago' },
  ];

  const weeklyProgress = [
    { day: 'Mon', points: 120 },
    { day: 'Tue', points: 85 },
    { day: 'Wed', points: 200 },
    { day: 'Thu', points: 150 },
    { day: 'Fri', points: 180 },
    { day: 'Sat', points: 95 },
    { day: 'Sun', points: 220 },
  ];

  const maxPoints = Math.max(...weeklyProgress.map(d => d.points));

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
                {state.user.avatar}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Hello, {state.user.name}!</h1>
                <p className="text-white/90 text-lg">
                  Grade {state.user.grade} • Age {state.user.age}
                </p>
                <div className="flex items-center mt-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-white/80">
                    {state.streakDays} day learning streak! 🔥
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{state.totalPoints}</div>
              <div className="text-white/80">Total Points</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Weekly Progress</h3>
            </div>
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.points / maxPoints) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm font-medium text-gray-800 text-right">
                    {day.points} pts
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-yellow-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Badges Earned</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {state.user.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-bold text-gray-800 text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </motion.div>
              ))}
              
              {/* Locked badges */}
              <div className="bg-gray-50 rounded-xl p-4 text-center border-2 border-dashed border-gray-300">
                <div className="text-3xl mb-2 opacity-50">🏆</div>
                <div className="font-bold text-gray-400 text-sm mb-1">Reading Master</div>
                <div className="text-xs text-gray-400">Complete 20 reading activities</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 text-center border-2 border-dashed border-gray-300">
                <div className="text-3xl mb-2 opacity-50">🎯</div>
                <div className="font-bold text-gray-400 text-sm mb-1">Perfect Score</div>
                <div className="text-xs text-gray-400">Get 100% on 5 worksheets</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg mt-8"
        >
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    activity.type === 'worksheet' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'game' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'worksheet' ? <BookOpen className="w-5 h-5" /> :
                     activity.type === 'game' ? <Gamepad2 className="w-5 h-5" /> :
                     <Award className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{activity.title}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
                {activity.points > 0 && (
                  <div className="flex items-center text-yellow-600 font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    +{activity.points}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;