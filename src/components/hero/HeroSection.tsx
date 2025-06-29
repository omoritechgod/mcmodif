import React from 'react';
import HeroContent from './HeroContent';
import HeroBackground from './HeroBackground';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </section>
  );
};

export default HeroSection;