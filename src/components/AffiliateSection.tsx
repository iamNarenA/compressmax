import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

const AffiliateSection: React.FC = () => {
  const affiliateTools = [
    {
      name: 'Adobe Photoshop',
      description: 'Professional image editing and design software',
      price: '$20.99/month',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      link: '#adobe-affiliate',
      badge: 'Most Popular'
    },
    {
      name: 'Canva Pro',
      description: 'Easy-to-use design platform with premium templates',
      price: '$14.99/month',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      link: '#canva-affiliate',
      badge: 'Best Value'
    },
    {
      name: 'Shutterstock',
      description: 'Premium stock photos and graphics library',
      price: '$29/month',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      link: '#shutterstock-affiliate',
      badge: 'Premium'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Take Your Images to the Next Level
        </h3>
        <p className="text-gray-600">
          Professional tools recommended by image compression experts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {affiliateTools.map((tool, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={tool.image} 
                alt={tool.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {tool.badge}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{tool.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{tool.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">{tool.price}</span>
                <a 
                  href={tool.link}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
                >
                  Try Free <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          * We may earn a commission from purchases made through these links at no extra cost to you
        </p>
      </div>
    </div>
  );
};

export default AffiliateSection;