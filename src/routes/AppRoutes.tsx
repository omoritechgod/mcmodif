
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import DashboardPage from "@/pages/DashboardPage";
import EcommercePage from "@/pages/EcommercePage";
import AutoMaintenancePage from "@/pages/AutoMaintenancePage";
import RidePage from "@/pages/RidePage";
import FoodPage from "@/pages/FoodPage";
import ApartmentsPage from "@/pages/ApartmentsPage";
import OilGasPage from "@/pages/OilGasPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ride" element={<RidePage />} />
      <Route path="/food" element={<FoodPage />} />
      <Route path="/shop" element={<EcommercePage />} />
      <Route path="/ecommerce" element={<EcommercePage />} />
      <Route path="/apartments" element={<ApartmentsPage />} />
      <Route path="/oil-gas" element={<OilGasPage />} />
      <Route path="/auto-maintenance" element={<AutoMaintenancePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/:userType" element={<DashboardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
