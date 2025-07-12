import React from 'react';
import { Crown, Zap, Cloud, Code, Shield, Infinity } from 'lucide-react';

const PremiumUpgrade: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white mb-8 shadow-xl">
      <div className="text-center mb-6">
        <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
        <h3 className="text-2xl font-bold mb-2">Upgrade to CompressMax Pro</h3>
        <p className="text-purple-100">Unlock powerful features for professional image compression</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Infinity className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">Unlimited File Size</h4>
          <p className="text-sm text-purple-100">Compress images of any size without restrictions</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Zap className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">Batch Processing</h4>
          <p className="text-sm text-purple-100">Process up to 100 images simultaneously</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Cloud className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">Cloud Storage</h4>
          <p className="text-sm text-purple-100">Save compressed images to Google Drive & Dropbox</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Code className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">API Access</h4>
          <p className="text-sm text-purple-100">Integrate compression into your applications</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Shield className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">Ad-Free Experience</h4>
          <p className="text-sm text-purple-100">Enjoy uninterrupted compression workflow</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <Zap className="w-8 h-8 mb-3 text-yellow-300" />
          <h4 className="font-semibold mb-2">Advanced Algorithms</h4>
          <p className="text-sm text-purple-100">AI-powered compression for better results</p>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-4">
          <span className="text-3xl font-bold">$9.99</span>
          <span className="text-purple-200">/month</span>
          <div className="text-sm text-purple-200">or $99/year (save 17%)</div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Start Free Trial
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
        
        <p className="text-xs text-purple-200 mt-4">
          7-day free trial • Cancel anytime • No hidden fees
        </p>
      </div>
    </div>
  );
};

export default PremiumUpgrade;