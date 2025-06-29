import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import FoodDelivery from './pages/FoodDelivery';
import RideHailing from './pages/RideHailing';
import ServiceApartments from './pages/ServiceApartments';
import ECommerce from './pages/ECommerce';
import AutoMaintenance from './pages/AutoMaintenance';
import GeneralServices from './pages/GeneralServices';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-delivery" element={<FoodDelivery />} />
          <Route path="/ride-hailing" element={<RideHailing />} />
          <Route path="/service-apartments" element={<ServiceApartments />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/auto-maintenance" element={<AutoMaintenance />} />
          <Route path="/general-services" element={<GeneralServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;