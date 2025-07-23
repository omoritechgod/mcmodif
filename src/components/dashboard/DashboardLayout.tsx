import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Package,
  Users,
  Car,
  Wrench,
  Building,
  UtensilsCrossed,
  User,
  Wallet,
  BarChart3,
  MessageCircle
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: 'user' | 'vendor';
  vendor?: {
    id: number;
    category: string;
    business_name: string;
    vendor_type: string;
    verification_status: string;
  };
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser({
        ...userData.user,
        vendor: userData.vendor,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { icon: <Home size={20} />, label: 'Overview', path: getDashboardPath() },
      { icon: <BarChart3 size={20} />, label: 'Analytics', path: `${getDashboardPath()}/analytics` },
      { icon: <MessageCircle size={20} />, label: 'Messages', path: `${getDashboardPath()}/messages` },
      { icon: <Settings size={20} />, label: 'Settings', path: `${getDashboardPath()}/settings` },
    ];

    if (user.user_type === 'user') {
      return [
        ...baseItems.slice(0, 1),
        { icon: <Wallet size={20} />, label: 'Wallet', path: '/dashboard/user/wallet' },
        { icon: <Package size={20} />, label: 'Orders', path: '/dashboard/user/orders' },
        { icon: <Car size={20} />, label: 'Rides', path: '/dashboard/user/rides' },
        ...baseItems.slice(1),
      ];
    }

    // Vendor-specific navigation
    const vendorCategory = user.vendor?.category;
    const vendorItems = [];

    switch (vendorCategory) {
      case 'mechanic':
        vendorItems.push(
          { icon: <Wrench size={20} />, label: 'Service Requests', path: '/dashboard/mechanic/requests' },
          { icon: <Users size={20} />, label: 'Customers', path: '/dashboard/mechanic/customers' }
        );
        break;
      case 'rider':
        vendorItems.push(
          { icon: <Car size={20} />, label: 'Ride Requests', path: '/dashboard/rider/requests' },
          { icon: <BarChart3 size={20} />, label: 'Earnings', path: '/dashboard/rider/earnings' }
        );
        break;
      case 'product':
        vendorItems.push(
          { icon: <Package size={20} />, label: 'Products', path: '/dashboard/product-vendor/products' },
          { icon: <Users size={20} />, label: 'Orders', path: '/dashboard/product-vendor/orders' }
        );
        break;
      case 'service-apartment':
        vendorItems.push(
          { icon: <Building size={20} />, label: 'Properties', path: '/dashboard/apartment/properties' },
          { icon: <Users size={20} />, label: 'Bookings', path: '/dashboard/apartment/bookings' }
        );
        break;
      case 'service':
        vendorItems.push(
          { icon: <Wrench size={20} />, label: 'Services', path: '/dashboard/service-vendor/services' },
          { icon: <Users size={20} />, label: 'Bookings', path: '/dashboard/service-vendor/bookings' }
        );
        break;
      case 'food':
        vendorItems.push(
          { icon: <UtensilsCrossed size={20} />, label: 'Menu', path: '/dashboard/food-vendor/menu' },
          { icon: <Package size={20} />, label: 'Orders', path: '/dashboard/food-vendor/orders' }
        );
        break;
      default:
        vendorItems.push(
          { icon: <Package size={20} />, label: 'Listings', path: '/dashboard/vendor/listings' }
        );
    }

    return [
      ...baseItems.slice(0, 1),
      ...vendorItems,
      ...baseItems.slice(1),
    ];
  };

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    
    if (user.user_type === 'user') {
      return '/dashboard/user';
    }

    const vendorCategory = user.vendor?.category;
    switch (vendorCategory) {
      case 'mechanic':
        return '/dashboard/mechanic';
      case 'rider':
        return '/dashboard/rider';
      case 'product':
        return '/dashboard/product-vendor';
      case 'service-apartment':
        return '/dashboard/apartment';
      case 'service':
        return '/dashboard/service-vendor';
      case 'food':
        return '/dashboard/food-vendor';
      default:
        return '/dashboard/vendor';
    }
  };

  const getPageTitle = () => {
    if (!user) return 'Dashboard';
    
    if (user.user_type === 'user') {
      return 'User Dashboard';
    }

    const vendorCategory = user.vendor?.category;
    switch (vendorCategory) {
      case 'mechanic':
        return 'Mechanic Dashboard';
      case 'rider':
        return 'Rider Dashboard';
      case 'product':
        return 'Product Vendor Dashboard';
      case 'service-apartment':
        return 'Service Apartment Dashboard';
      case 'service':
        return 'Service Provider Dashboard';
      case 'food':
        return 'Food Vendor Dashboard';
      default:
        return 'Vendor Dashboard';
    }
  };

  const getVerificationStatus = () => {
    if (user?.user_type === 'vendor' && user.vendor) {
      const status = user.vendor.verification_status;
      const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'verified': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
          {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
        </span>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="text-2xl font-bold text-blue-600">McDee</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {(user && user.name) ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              {user.user_type === 'vendor' && user.vendor && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{user.vendor.business_name}</p>
                  {getVerificationStatus()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <Menu size={20} />
                </button>
                <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {(user && user.name) ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;