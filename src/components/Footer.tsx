import React from 'react';
import { BookOpen, Heart, Mail, Shield, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">EduKids Pro</h3>
                <p className="text-sm text-white/70 comic-font">Learn & Play</p>
              </div>
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              Making learning fun and engaging for children worldwide. Our interactive 
              worksheets and games help kids develop essential skills while having a blast!
            </p>
            <div className="flex items-center text-white/60">
              <Heart className="w-4 h-4 mr-2 text-pink-400" />
              <span className="text-sm">Made with love for young learners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/worksheets" className="hover:text-white transition-colors">Worksheets</a></li>
              <li><a href="/games" className="hover:text-white transition-colors">Games</a></li>
              <li><a href="/profile" className="hover:text-white transition-colors">My Profile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parent Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Progress Reports</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; 2025 EduKids Pro. All rights reserved. Empowering young minds through play.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <span>Ages 3-12</span>
                <span>•</span>
                <span>Safe & Secure</span>
                <span>•</span>
                <span>Ad-Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;