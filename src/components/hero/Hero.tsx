import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import MobileOrbit from "./MobileOrbit";
import ServiceButtonsGrid from "./ServiceButtonsGrid";
import DesktopCarousel from "./DesktopCarousel";
import DesktopServiceButtons from "./DesktopServiceButtons";

const carouselItems = [
  {
    sub: "Experience seamless peer-to-peer transactions across all essential lifestyle services with secure escrow protection.",
    btn1: "Learn More",
    btn2: "Get Started",
  },
  {
    sub: "Get picked up faster with verified local riders near you. Safe, reliable, and affordable transportation.",
    btn1: "How It Works",
    btn2: "Book Now",
  },
  {
    sub: "Discover comfortable service apartments, hotels, and hostels with verified listings and secure bookings.",
    btn1: "Explore Rooms",
    btn2: "Book Now",
  },
  {
    sub: "Shop from verified vendors with secure transactions and reliable delivery across Nigeria.",
    btn1: "Start Shopping",
    btn2: "Join Now",
  },
  {
    sub: "Connect with skilled mechanics for reliable car repairs and maintenance services near you.",
    btn1: "Find Mechanics",
    btn2: "Get Quote",
  },
  {
    sub: "Find trusted professionals for home services, repairs, and specialized tasks with quality assurance.",
    btn1: "Browse Services",
    btn2: "Get Help",
  },
];

const heroIcons = [
  { img: "", label: "Ride Hailing", route: "/ride-hailing" },
  { img: "", label: "Food Delivery", route: "/food-delivery" },
  { img: "", label: "E-commerce", route: "/ecommerce" },
  { img: "", label: "Auto Maintenance", route: "/auto-maintenance" },
  { img: "", label: "Service Apartments", route: "/service-apartments" },
  { img: "", label: "General Services", route: "/general-services" },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animTarget, setAnimTarget] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 4000);

    // Synchronize the orbit animation with carousel timing
    const animInterval = setInterval(() => {
      setAnimTarget((prev) => (prev + 1) % heroIcons.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(animInterval);
    };
  }, []);

  if (isMobile) {
    return (
      <section className="relative min-h-screen w-full text-white overflow-hidden">
        {/* Mobile Background with Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-8 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-4 w-16 h-16 bg-orange-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
          {/* Header Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
              Your Trusted
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Marketplace
              </span>
              <span className="block text-2xl mt-2">
                & Services Platform
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-sm mx-auto leading-relaxed">
              {carouselItems[current].sub}
            </p>
          </div>

          {/* Orbit Animation */}
          <div className="mb-12">
            <MobileOrbit icons={heroIcons} activeIndex={animTarget} />
          </div>

          {/* Active Service Label */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white">
              {heroIcons[animTarget].label}
            </h2>
          </div>

          {/* Service Buttons Grid */}
          <ServiceButtonsGrid />
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Desktop Background with Enhanced Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
          {/* Animated background elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Center Title */}
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Your Trusted
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Marketplace
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-4">
              & Services Platform
            </span>
          </h1>
        </div>
      </div>

      {/* Desktop Carousel Text */}
      <DesktopCarousel currentItem={carouselItems[current]} />

      {/* Desktop Service Buttons */}
      <DesktopServiceButtons heroIcons={heroIcons} animTarget={animTarget} />
    </section>
  );
};

export default Hero;