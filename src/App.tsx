import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FoodDelivery from './pages/FoodDelivery';
import RideHailing from './pages/RideHailing';
import ServiceApartments from './pages/ServiceApartments';
import ECommerce from './pages/ECommerce';
import AutoMaintenance from './pages/AutoMaintenance';
import GeneralServices from './pages/GeneralServices';
import VendorDashboard from './components/dashboard/VendorDashboard';

// Import new dashboard components
import UserDashboard from './pages/dashboard/user';
import MechanicDashboard from './pages/dashboard/mechanic';
import RiderDashboard from './pages/dashboard/rider';
import ProductVendorDashboard from './pages/dashboard/product-vendor';
import ServiceVendorDashboard from './pages/dashboard/service-vendor';
import ApartmentDashboard from './pages/dashboard/apartment';
import FoodVendorDashboard from './pages/dashboard/food-vendor';
import GeneralVendorDashboard from './pages/dashboard/vendor';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/food-delivery" element={<FoodDelivery />} />
          <Route path="/ride-hailing" element={<RideHailing />} />
          <Route path="/service-apartments" element={<ServiceApartments />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/auto-maintenance" element={<AutoMaintenance />} />
          <Route path="/general-services" element={<GeneralServices />} />
          
          {/* New Dashboard Routes */}
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/mechanic" element={<MechanicDashboard />} />
          <Route path="/dashboard/rider" element={<RiderDashboard />} />
          <Route path="/dashboard/product-vendor" element={<ProductVendorDashboard />} />
          <Route path="/dashboard/service-vendor" element={<ServiceVendorDashboard />} />
          <Route path="/dashboard/apartment" element={<ApartmentDashboard />} />
          <Route path="/dashboard/food-vendor" element={<FoodVendorDashboard />} />
          <Route path="/dashboard/vendor" element={<GeneralVendorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;