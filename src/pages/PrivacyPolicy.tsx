import React from 'react';
import { Shield, Eye, Lock, Cookie } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-900">No Image Storage</h3>
                <p className="text-sm text-blue-700">Your images are processed locally and never stored on our servers</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900">Secure Processing</h3>
                <p className="text-sm text-green-700">All compression happens in your browser for maximum security</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <Cookie className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-900">Minimal Cookies</h3>
                <p className="text-sm text-purple-700">We only use essential cookies for functionality</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Images and Files</h3>
            <p className="text-gray-700 mb-4">
              <strong>We do NOT store your images.</strong> All image compression is performed locally in your browser. 
              Your images never leave your device and are not uploaded to our servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Usage Analytics</h3>
            <p className="text-gray-700 mb-4">
              We collect anonymous usage data to improve our service, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Number of images compressed</li>
              <li>Compression settings used</li>
              <li>Browser type and version</li>
              <li>General location (country/region)</li>
              <li>Page views and session duration</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Advertising Data</h3>
            <p className="text-gray-700 mb-4">
              We use Google AdSense to display advertisements. Google may collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Cookies and similar technologies</li>
              <li>IP address and location data</li>
              <li>Browsing behavior for ad personalization</li>
              <li>Device and browser information</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Information</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance functionality</li>
              <li><strong>Performance Monitoring:</strong> Track site performance and fix issues</li>
              <li><strong>Advertising:</strong> Display relevant ads through Google AdSense</li>
              <li><strong>Security:</strong> Protect against abuse and ensure service availability</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Google AdSense</h3>
            <p className="text-gray-700 mb-4">
              We use Google AdSense to display advertisements. Google's use of advertising cookies 
              enables it and its partners to serve ads based on your visit to our site and other sites.
            </p>
            <p className="text-gray-700 mb-4">
              You can opt out of personalized advertising by visiting 
              <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline"> Google Ads Settings</a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Google Analytics</h3>
            <p className="text-gray-700 mb-4">
              We use Google Analytics to understand how visitors use our site. This helps us improve 
              the user experience and optimize our service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Access:</strong> Request information about data we have collected</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> Disable analytics and advertising cookies</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Policy</h2>
            <p className="text-gray-700 mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand site usage (Google Analytics)</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense for ad personalization</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>HTTPS encryption for all data transmission</li>
              <li>No server-side storage of user images</li>
              <li>Regular security audits and updates</li>
              <li>Minimal data collection practices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none mb-6 text-gray-700">
              <li><strong>Email:</strong> privacy@compressmax.com</li>
              <li><strong>Website:</strong> Contact form on our website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;