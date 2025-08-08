import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Gamepad2, User, Menu, X, Star, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useGame();

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Worksheets', href: '/worksheets', icon: BookOpen },
    { name: 'Games', href: '/games', icon: Gamepad2 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-gradient-to-r from-blue-400 to-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduKids Pro
              </h1>
              <p className="text-xs text-gray-500 comic-font">Learn & Play</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-yellow-700">{state.totalPoints}</span>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-purple-700">{state.streakDays} days</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
              {state.user?.avatar}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">{state.totalPoints} points</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <span className="font-bold text-purple-700">{state.streakDays} day streak</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;