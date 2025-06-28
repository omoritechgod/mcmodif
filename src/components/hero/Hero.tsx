
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import bgGif from "@/assets/hero/modif-gif.gif";
import mobileBg from "@/assets/hero/Mobile-bg.jpg";
import MobileOrbit from "./MobileOrbit";
import ServiceButtonsGrid from "./ServiceButtonsGrid";
import DesktopCarousel from "./DesktopCarousel";
import DesktopServiceButtons from "./DesktopServiceButtons";

// Import service icons
import foodImg from "@/assets/hero/food-1.png";
import shopImg from "@/assets/hero/cart_shop.png";
import deliveryImg from "@/assets/hero/delivery.png";
import rideImg from "@/assets/hero/okada-ride.png";
import oilGasImg from "@/assets/hero/oil_gas.png";
import mechImg from "@/assets/hero/mech_2.png";

const carouselItems = [
  {
    sub: "Online Shopping has never been more Interesting than it is with Us",
    btn1: "Learn More",
    btn2: "Get Started",
  },
  {
    sub: "Get picked up faster with verified local riders near you",
    btn1: "How It Works",
    btn2: "Book Now",
  },
  {
    sub: "Discover affordable service apartments near you",
    btn1: "Explore Rooms",
    btn2: "Book Now",
  },
];

const heroIcons = [
  { img: rideImg, label: "Ride Hailing", route: "/ride" },
  { img: foodImg, label: "Food", route: "/food" },
  { img: shopImg, label: "Shop", route: "/shop" },
  { img: mechImg, label: "Automobile", route: "/auto-maintenance" },
  { img: deliveryImg, label: "Apartment", route: "/apartments" },
  { img: oilGasImg, label: "Oil & Gas", route: "/oil-gas" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animTarget, setAnimTarget] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 3000);

    // Synchronize the orbit animation with carousel timing
    const animInterval = setInterval(() => {
      setAnimTarget((prev) => (prev + 1) % heroIcons.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(animInterval);
    };
  }, []);

  if (isMobile) {
    return (
      <section className="relative min-h-screen w-full text-white overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        {/* Mobile Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={mobileBg}
            alt="Mobile background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
          {/* Header Text */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-white">
              ORDER FROM LOCAL VENDORS
            </h1>
            <p className="text-lg text-white/80 max-w-sm mx-auto">
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
    <section
      className="relative min-h-screen w-full text-white overflow-hidden bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bgGif})`,
      }}
    >
      {/* Desktop Carousel Text */}
      <DesktopCarousel currentItem={carouselItems[current]} />

      {/* Desktop Service Buttons */}
      <DesktopServiceButtons heroIcons={heroIcons} animTarget={animTarget} />
    </section>
  );
};

export default Hero;
