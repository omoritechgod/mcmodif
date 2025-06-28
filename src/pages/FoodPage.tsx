
import { FC } from "react";

const FoodPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Food Delivery</h1>
        <p className="text-lg text-gray-600">Order delicious food from local vendors</p>
        <div className="mt-8 text-orange-500 text-6xl">🍕</div>
      </div>
    </div>
  );
};

export default FoodPage;
