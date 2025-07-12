import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageCompressor from './ImageCompressor';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageCompressor />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </Router>
  );
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to CompressMax
            </Link>
            <div className="flex items-center">
              <ImageIcon className="w-6 h-6 text-blue-600 mr-2" />
              <span className="font-bold text-gray-900">CompressMax</span>
            </div>
          </div>
        </div>
      </nav>
      <PrivacyPolicy />
    </div>
  );
};

const TermsOfServicePage: React.FC = () => {
  return (
    <div>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to CompressMax
            </Link>
            <div className="flex items-center">
              <ImageIcon className="w-6 h-6 text-blue-600 mr-2" />
              <span className="font-bold text-gray-900">CompressMax</span>
            </div>
          </div>
        </div>
      </nav>
      <TermsOfService />
    </div>
  );
};

export default AppRouter;