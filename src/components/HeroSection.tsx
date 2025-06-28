import React from 'react';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-animation min-h-screen flex items-center relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Shield className="text-white" size={28} />
        </div>
      </div>
      <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Users className="text-white" size={32} />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 floating-animation" style={{ animationDelay: '4s' }}>
        <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Zap className="text-white" size={20} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Trusted
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Marketplace
            </span>
            Platform
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience seamless peer-to-peer transactions across ride-hailing, food delivery, 
            e-commerce, service apartments, auto maintenance, and general services — all with 
            secure escrow protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2">
              Start Shopping
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105">
              Become a Vendor
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">5K+</div>
              <div className="text-white/80">Verified Vendors</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80">Secure Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;