
import React from 'react';
import { useParams } from 'react-router-dom';
import UserDashboard from '@/components/dashboards/UserDashboard';
import VendorDashboard from '@/components/dashboards/VendorDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import RiderDashboard from '@/components/dashboards/RiderDashboard';
import DeliveryDashboard from '@/components/dashboards/DeliveryDashboard';

const DashboardPage = () => {
  const { userType } = useParams();

  // Default to user dashboard if no userType specified
  const currentUserType = userType || 'user';

  switch (currentUserType) {
    case 'vendor':
      return <VendorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'rider':
      return <RiderDashboard />;
    case 'delivery':
      return <DeliveryDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
};

export default DashboardPage;
