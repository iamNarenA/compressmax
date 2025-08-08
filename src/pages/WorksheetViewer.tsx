import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Print, Share2, Star, Clock, Users, BookOpen } from 'lucide-react';

const WorksheetViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  // Mock worksheet data - in a real app, this would come from an API
  const worksheet = {
    id: 'math-addition-1',
    title: 'Basic Addition Practice',
    subject: 'Mathematics',
    grade: '1st',
    difficulty: 'Easy',
    duration: '15 min',
    downloads: 1250,
    rating: 4.8,
    description: 'Practice basic addition with numbers 1-10. Perfect for beginners learning their first math skills.',
    pages: 3,
    topics: ['Addition', 'Numbers', 'Basic Math'],
    instructions: [
      'Look at each addition problem carefully',
      'Count the objects or use your fingers to help',
      'Write your answer in the box provided',
      'Check your work when finished'
    ],
    learningObjectives: [
      'Understand the concept of addition',
      'Practice adding numbers 1-10',
      'Develop number recognition skills',
      'Build confidence in basic math'
    ]
  };

  const handleDownload = () => {
    // In a real app, this would trigger a PDF download
    alert('Worksheet downloaded successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: worksheet.title,
        text: worksheet.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/worksheets"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Worksheets
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {worksheet.subject}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Grade {worksheet.grade}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {worksheet.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {worksheet.title}
                </h1>

                <p className="text-gray-600 text-lg mb-6">
                  {worksheet.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{worksheet.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{worksheet.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{worksheet.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{worksheet.pages} pages</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {worksheet.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleDownload}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </button>
                    <button
                      onClick={handlePrint}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                    >
                      <Print className="w-5 h-5 mr-2" />
                      Print
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center font-medium"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Worksheet Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Worksheet Preview</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Page</span>
                    <select
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {Array.from({ length: worksheet.pages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-500">of {worksheet.pages}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Mock worksheet content */}
                <div className="worksheet-content min-h-[600px] bg-white border-2 border-gray-200 rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Addition Practice</h3>
                    <p className="text-gray-600">Page {currentPage} of {worksheet.pages}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {Array.from({ length: 8 }, (_, i) => {
                      const num1 = Math.floor(Math.random() * 5) + 1;
                      const num2 = Math.floor(Math.random() * 5) + 1;
                      return (
                        <div key={i} className="text-center">
                          <div className="text-3xl font-bold text-gray-800 mb-4">
                            {num1} + {num2} = ___
                          </div>
                          <div className="flex justify-center gap-2">
                            {Array.from({ length: num1 }, (_, j) => (
                              <div key={j} className="w-6 h-6 bg-blue-200 rounded-full"></div>
                            ))}
                            <span className="text-xl font-bold text-gray-600 mx-2">+</span>
                            {Array.from({ length: num2 }, (_, j) => (
                              <div key={j} className="w-6 h-6 bg-red-200 rounded-full"></div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
              <ol className="space-y-2">
                {worksheet.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
              <ul className="space-y-2">
                {worksheet.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Worksheets */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Worksheets</h3>
              <div className="space-y-3">
                {['Subtraction Practice', 'Number Recognition', 'Counting Objects'].map((title, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{title}</div>
                    <div className="text-sm text-gray-500">Grade 1st • Mathematics</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetViewer;