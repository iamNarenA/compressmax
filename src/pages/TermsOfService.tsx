import React from 'react';
import { FileText, AlertTriangle, Shield, Users } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-900">Free to Use</h3>
                <p className="text-sm text-blue-700">Our basic compression service is completely free</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-yellow-900">Fair Use</h3>
                <p className="text-sm text-yellow-700">Please use our service responsibly and ethically</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900">Your Content</h3>
                <p className="text-sm text-green-700">You retain all rights to your images and content</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using CompressMax ("the Service"), you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              CompressMax is a web-based image compression tool that allows users to reduce the file 
              size of their images while maintaining quality. The service includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Free image compression for JPEG, PNG, and WebP formats</li>
              <li>Batch processing capabilities</li>
              <li>Local processing (images don't leave your device)</li>
              <li>Premium features for enhanced functionality</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Acceptable Use</h3>
            <p className="text-gray-700 mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Upload or process illegal, harmful, or inappropriate content</li>
              <li>Attempt to reverse engineer or hack the Service</li>
              <li>Use the Service to violate any applicable laws or regulations</li>
              <li>Abuse the Service through excessive automated requests</li>
              <li>Upload copyrighted material without proper authorization</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Content Ownership</h3>
            <p className="text-gray-700 mb-4">
              You retain all rights, title, and ownership of any images or content you process through 
              our Service. We do not claim any ownership rights to your content.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to maintain high availability of our Service, but we do not guarantee 
              uninterrupted access. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Scheduled maintenance</li>
              <li>Technical difficulties</li>
              <li>Force majeure events</li>
              <li>Third-party service disruptions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Premium Services</h2>
            <p className="text-gray-700 mb-4">
              We offer premium features through paid subscriptions. Premium services include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Unlimited file size processing</li>
              <li>Advanced compression algorithms</li>
              <li>API access for developers</li>
              <li>Priority customer support</li>
              <li>Ad-free experience</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Payment Terms</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Subscription fees are billed monthly or annually</li>
              <li>All payments are processed securely through third-party providers</li>
              <li>Refunds are available within 7 days of purchase</li>
              <li>You can cancel your subscription at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our data practices are governed by our Privacy Policy, 
              which is incorporated into these Terms by reference. Key points:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Images are processed locally in your browser</li>
              <li>We do not store or have access to your images</li>
              <li>We collect minimal analytics data to improve the service</li>
              <li>We use cookies for functionality and advertising</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service, including its design, functionality, and underlying technology, is protected 
              by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Copy, modify, or distribute our software</li>
              <li>Use our trademarks without permission</li>
              <li>Create derivative works based on our Service</li>
              <li>Remove or alter any proprietary notices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Service Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL 
              WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL 
              DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to terminate or suspend your access to the Service at any time, 
              with or without cause, and with or without notice, for conduct that we believe violates 
              these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any 
              material changes by posting the updated Terms on our website. Your continued use of 
              the Service after such modifications constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the 
              jurisdiction in which our company is incorporated, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none mb-6 text-gray-700">
              <li><strong>Email:</strong> legal@compressmax.com</li>
              <li><strong>Support:</strong> support@compressmax.com</li>
              <li><strong>Website:</strong> Contact form on our website</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-2">Questions?</h3>
              <p className="text-blue-800 text-sm">
                If you have any questions about these terms or need clarification on any point, 
                please don't hesitate to contact our support team. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;