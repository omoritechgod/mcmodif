import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Background Video/GIF placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* Animated particles/dots */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 bg-opacity-40 rounded-full animate-bounce"></div>
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 bg-opacity-30 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-10 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBackground;