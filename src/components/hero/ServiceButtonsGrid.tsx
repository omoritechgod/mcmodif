
import { useNavigate } from "react-router-dom";

interface ServiceButton {
  label: string;
  route: string;
  bgColor: string;
}

const ServiceButtonsGrid = () => {
  const navigate = useNavigate();

  const serviceButtons: ServiceButton[] = [
    { label: "Ride Hailing", route: "/ride", bgColor: "bg-blue-600" },
    { label: "Food", route: "/food", bgColor: "bg-orange-500" },
    { label: "Shop", route: "/shop", bgColor: "bg-green-600" },
    { label: "Automobile", route: "/auto-maintenance", bgColor: "bg-purple-600" },
    { label: "Apartment", route: "/apartments", bgColor: "bg-red-600" },
    { label: "Oil & Gas", route: "/oil-gas", bgColor: "bg-yellow-600" },
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
