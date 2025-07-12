import React from 'react';
import { Coffee, Heart, DollarSign } from 'lucide-react';

const SupportSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Coffee className="w-8 h-8 text-yellow-600 mr-4" />
          <div>
            <h4 className="font-bold text-yellow-800 text-lg">Love CompressMax?</h4>
            <p className="text-yellow-700 text-sm">
              Support our development and keep this tool free for everyone
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="https://buymeacoffee.com/compressmax" 
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center font-medium shadow-lg"
          >
            <Coffee className="w-4 h-4 mr-2" />
            Buy me a coffee
          </a>
          
          <button className="border-2 border-yellow-500 text-yellow-700 px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors flex items-center font-medium">
            <Heart className="w-4 h-4 mr-2" />
            Donate $5
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-yellow-200">
        <div className="flex items-center justify-center space-x-8 text-sm text-yellow-700">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>100% goes to development</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            <span>Keep the tool free</span>
          </div>
          <div className="flex items-center">
            <Coffee className="w-4 h-4 mr-1" />
            <span>Fuel more features</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;