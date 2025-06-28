
import { useNavigate } from "react-router-dom";
import anim1 from "@/assets/hero/rec-element-anim1.png";
import anim2 from "@/assets/hero/rec-element-anim2.png";

interface ServiceIcon {
  img: string;
  label: string;
  route: string;
}

interface DesktopServiceButtonsProps {
  heroIcons: ServiceIcon[];
  animTarget: number;
}

const DesktopServiceButtons = ({ heroIcons, animTarget }: DesktopServiceButtonsProps) => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  // Define the scattered layout pattern
  const buttonLayout = [
    "Ride Hailing", "", "Shop",
    "", "Food", "",
    "Automobile", "", "Oil & Gas",
    "", "Apartment", ""
  ];

  // Define colors for each service based on your specification
  const colors: Record<string, string> = {
    "Ride Hailing": "bg-[#4F9CF9]/60 text-white",
    "Food": "bg-white text-[#043873]",
    "Shop": "bg-[#FF7B4E]/70 text-white",
    "Automobile": "bg-[#0A5BFF]/60 text-white",
    "Apartment": "bg-[#36C6FF]/60 text-white",
    "Oil & Gas": "bg-[#FFE492]/60 text-[#043873]",
  };

  // Create a mapping of service names to icons
  const iconMap = heroIcons.reduce((acc, icon) => {
    acc[icon.label] = icon;
    return acc;
  }, {} as Record<string, ServiceIcon>);

  // Get the currently animated service
  const animatedService = heroIcons[animTarget]?.label;

  return (
    <div className="absolute right-[8%] bottom-[150px] z-20">
      <div className="grid grid-cols-3 gap-y-4 gap-x-6">
        {buttonLayout.map((serviceName, idx) => {
          if (serviceName === "") {
            return <div key={idx} className="w-[180px] h-[45px]"></div>;
          }

          const service = iconMap[serviceName];
          if (!service) return null;

          const isAnimated = animatedService === serviceName;

          return (
            <div className="relative w-[180px] h-[45px]" key={idx}>
              {isAnimated && (
                <>
                  <img
                    src={anim1}
                    alt="Animation 1"
                    className="absolute top-[-10px] left-[-15px] w-[200px] h-[50px] z-0 animate-pulse"
                  />
                  <img
                    src={anim2}
                    alt="Animation 2"
                    className="absolute bottom-[-10px] right-[-15px] w-[200px] h-[50px] z-0 animate-pulse"
                  />
                </>
              )}
              <button
                onClick={() => handleButtonClick(service.route)}
                className={`relative z-10 ${colors[service.label]} font-semibold px-6 py-3 rounded-[20px] w-full h-full flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                {service.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopServiceButtons;
