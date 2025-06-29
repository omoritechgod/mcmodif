import React from "react";
import { useNavigate } from "react-router-dom";

interface ServiceButton {
  label: string;
  route: string;
  bgColor: string;
}

const ServiceButtonsGrid: React.FC = () => {
  const navigate = useNavigate();

  const serviceButtons: ServiceButton[] = [
    { label: "Ride Hailing", route: "/ride-hailing", bgColor: "bg-blue-600" },
    { label: "Food Delivery", route: "/food-delivery", bgColor: "bg-orange-500" },
    { label: "E-commerce", route: "/ecommerce", bgColor: "bg-green-600" },
    { label: "Auto Maintenance", route: "/auto-maintenance", bgColor: "bg-purple-600" },
    { label: "Service Apartments", route: "/service-apartments", bgColor: "bg-red-600" },
    { label: "General Services", route: "/general-services", bgColor: "bg-yellow-600" },
  ];

  const handleButtonClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
      {serviceButtons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(button.route)}
          className={`${button.bgColor} text-white py-4 px-6 rounded-2xl font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ServiceButtonsGrid;