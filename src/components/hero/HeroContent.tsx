import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Your Trusted
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Marketplace
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
            & Services Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience seamless peer-to-peer transactions across ride-hailing, food delivery, 
          e-commerce, service apartments, auto maintenance, and general services — all with 
          secure escrow protection.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2 min-w-[200px]"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[200px]">
            <Play size={20} />
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-300 text-sm">Happy Customers</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-gray-300 text-sm">Verified Vendors</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-300 text-sm">Secure Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;